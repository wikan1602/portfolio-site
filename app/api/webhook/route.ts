import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg'; // 1. Import pg pool untuk koneksi database

// 2. Inisialisasi pool koneksi database (menggunakan variabel DATABASE_URL dari Vercel)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // <-- WAJIB TAMBAHKAN INI untuk memaksa matikan SSL dari sisi client
});

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN || "One0969";
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const WA_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

// 1. HANDSHAKE VERIFICATION (Fungsi GET)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === MY_VERIFY_TOKEN) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
  return new NextResponse('Verification failed', { status: 403 });
}

// 2. RECEIVE & REPLY MESSAGES (Fungsi POST)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Pastikan payload berisi pesan (bukan status 'delivered' atau 'read')
    const messageData = body.entry?.[0]?.changes?.[0]?.value;
    
    if (messageData && messageData.messages && messageData.messages[0]) {
      const message = messageData.messages[0];
      const phone_number_id = messageData.metadata.phone_number_id;
      const from = message.from; // Nomor HP user

      // Hanya proses jika tipenya teks
      if (message.type === 'text') {
        const userMessage = message.text.body;

        // Jalankan logika chatbot yang sekarang sudah dibekali memori database
        await handleChatbotLogic(userMessage, from, phone_number_id);
      }
    }

    // Selalu kembalikan 200 OK secepatnya ke Meta
    return NextResponse.json({ status: 'SUCCESS' }, { status: 200 });
  } catch (error) {
    console.error('Error saat menerima webhook:', error);
    return NextResponse.json({ status: 'ERROR' }, { status: 200 });
  }
}

// 🤖 FUNGSI LOGIKA BOT (PostgreSQL + Groq -> WhatsApp)
async function handleChatbotLogic(userMessage: string, recipientPhone: string, phone_number_id: string) {
  try {
    // A. SIMPAN PESAN USER BARU KE DATABASE
    await pool.query(
      'INSERT INTO wa_chat_history (phone_number, role, content) VALUES ($1, $2, $3)',
      [recipientPhone, 'user', userMessage]
    );

    // B. AMBIL 10 PESAN TERAKHIR (SLIDING WINDOW)
    // Mengambil riwayat percakapan terbaru sebanyak maksimal 10 baris
    const dbResult = await pool.query(
      'SELECT role, content FROM wa_chat_history WHERE phone_number = $1 ORDER BY created_at DESC LIMIT 10',
      [recipientPhone]
    );
    
    // Karena query DESC mengambil data terbaru dulu, kita balik (.reverse()) 
    // agar urutan percakapannya runtut dari lama ke baru saat dibaca oleh Groq
    const savedHistory = dbResult.rows.reverse();

    // C. STRUKTURKAN ARRAY MESSAGES DENGAN HISTORY
    const messagesToGroq = [
      { 
        role: 'system', 
        content: 'Kamu adalah asisten WhatsApp AI yang ramah. Kamu mengingat konteks obrolan sebelumnya dengan user.' 
      },
      ...savedHistory // Menyisipkan 10 percakapan terakhir secara dinamis
    ];

    // D. TANYA KE GROQ
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'groq/compound-mini', // Model andalanmu yang super cepat
        messages: messagesToGroq
      })
    });

    const groqData = await groqResponse.json();
    const aiReply = groqData.choices?.[0]?.message?.content || "Maaf, aku sedang tidak bisa berpikir jernih.";

    // E. SIMPAN JAWABAN BOT KE DATABASE
    await pool.query(
      'INSERT INTO wa_chat_history (phone_number, role, content) VALUES ($1, $2, $3)',
      [recipientPhone, 'assistant', aiReply]
    );

    // F. KIRIM BALIK JAWABAN KE WHATSAPP CLOUD API
    const whatsappResponse = await fetch(`https://graph.facebook.com/v20.0/${phone_number_id}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipientPhone,
        type: "text",
        text: {
          preview_url: false,
          body: aiReply
        }
      })
    });

    if (!whatsappResponse.ok) {
      const waError = await whatsappResponse.json();
      console.error('Gagal mengirim pesan ke WhatsApp:', waError);
    }

  } catch (err) {
    console.error('Gagal memproses handleChatbotLogic:', err);
  }
}