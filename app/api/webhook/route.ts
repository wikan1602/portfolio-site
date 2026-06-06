import { NextRequest, NextResponse } from 'next/server';

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

        // Jalankan logika chatbot (minta jawaban Grok & kirim ke WA)
        // Catatan: Di serverless environment seperti Vercel, kita panggil secara sequential
        await handleChatbotLogic(userMessage, from, phone_number_id);
      }
    }

    // Selalu kembalikan 200 OK secepatnya ke Meta
    return NextResponse.json({ status: 'SUCCESS' }, { status: 200 });
  } catch (error) {
    console.error('Error saat menerima webhook:', error);
    // Tetap kembalikan 200 agar Meta tidak terus-menerus mengirim ulang payload yang error
    return NextResponse.json({ status: 'ERROR' }, { status: 200 });
  }
}

// 🤖 FUNGSI LOGIKA BOT (Grok AI -> WhatsApp)
async function handleChatbotLogic(userMessage: string, recipientPhone: string, phone_number_id: string) {
  try {
    // A. Tanya ke Groq (Menggunakan endpoint resmi GROQ yang kompatibel dengan OpenAI format)
    // Contoh jika menggunakan GROQ (groq.com)
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}` // Sesuaikan nama ENV
    },
    body: JSON.stringify({
        model: 'llama3-8b-8192', // Model populer di Groq yang super cepat
        messages: [
        { role: 'system', content: 'Kamu adalah asisten WhatsApp AI yang ramah.' },
        { role: 'user', content: userMessage }
        ]
    })
    });

    const groqData = await groqResponse.json();
    const aiReply = groqData.choices?.[0]?.message?.content || "Maaf, aku sedang tidak bisa berpikir jernih.";

    // B. Kirim balik jawaban ke WhatsApp Cloud API
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