import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi Chatetin",
  description:
    "Kebijakan privasi aplikasi Chatetin — aplikasi pencatat pengeluaran pribadi yang beroperasi sepenuhnya secara offline, dikembangkan oleh Kanwork.",
  robots: { index: true, follow: true },
};

export default function ChatetinPrivacyPage() {
  return (
    <article className="max-w-[70ch] mx-auto px-[clamp(18px,4vw,40px)] py-[clamp(40px,6vw,72px)]">
      <header className="mb-10">
        <h1 className="text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-0.02em] leading-tight m-0 mb-3">
          Kebijakan Privasi Chatetin
        </h1>
        <p className="font-mono text-[12.5px] text-subtle m-0">
          Terakhir diperbarui: 3 Agustus 2026
        </p>
      </header>

      <div className="flex flex-col gap-8 text-[15px] leading-[1.75] text-fg">
        <p>
          Chatetin (&quot;Aplikasi&quot;) adalah aplikasi pencatat pengeluaran pribadi dengan
          antarmuka bergaya chat, dikembangkan oleh <strong>Kanwork</strong>. Kebijakan privasi
          ini menjelaskan bagaimana Aplikasi menangani data Anda.
        </p>

        <Section title="Data yang Dikumpulkan">
          <p>
            Chatetin beroperasi sepenuhnya secara offline. Aplikasi ini{" "}
            <strong>tidak mengumpulkan, mengirim, menyimpan di server, atau membagikan</strong>{" "}
            data pengguna kepada pihak manapun, termasuk pengembang Aplikasi.
          </p>
          <p>
            Seluruh data yang Anda masukkan ke Chatetin — termasuk catatan pengeluaran, kategori,
            dan riwayat transaksi — disimpan <strong>secara lokal di perangkat Anda saja</strong>.
            Aplikasi ini tidak meminta izin akses internet, sehingga secara teknis tidak dapat
            mengirimkan data ke mana pun.
          </p>
        </Section>

        <Section title="Izin Perangkat">
          <p>
            Chatetin tidak meminta izin khusus apa pun dari perangkat Anda (tidak ada akses
            kamera, lokasi, kontak, penyimpanan, maupun internet).
          </p>
        </Section>

        <Section title="Layanan Pihak Ketiga">
          <p>
            Chatetin tidak menggunakan layanan analitik, iklan, pelacakan, atau SDK pihak ketiga
            manapun yang mengumpulkan data pengguna.
          </p>
        </Section>

        <Section title="Keamanan Data">
          <p>
            Karena seluruh data disimpan secara lokal di perangkat Anda, keamanan data bergantung
            pada keamanan perangkat itu sendiri. Kami menyarankan Anda mengaktifkan kunci layar
            pada perangkat Anda. Aplikasi ini juga menonaktifkan fitur cadangan otomatis
            (auto-backup) Android, sehingga tidak ada salinan data yang tersimpan di luar
            perangkat Anda, termasuk di akun Google Anda.
          </p>
        </Section>

        <Section title="Penghapusan Data">
          <p>
            Menghapus (uninstall) Aplikasi dari perangkat Anda akan menghapus seluruh data yang
            tersimpan di dalamnya secara permanen. Chatetin tidak menyimpan salinan data Anda di
            tempat lain.
          </p>
        </Section>

        <Section title="Perubahan pada Anak-Anak">
          <p>
            Chatetin tidak ditujukan untuk anak-anak di bawah usia 13 tahun dan tidak dirancang
            untuk mengumpulkan data dari anak-anak.
          </p>
        </Section>

        <Section title="Perubahan Kebijakan Privasi">
          <p>
            Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Perubahan akan tercermin
            pada tanggal &quot;Terakhir diperbarui&quot; di bagian atas halaman ini.
          </p>
        </Section>

        <Section title="Kontak">
          <p>
            Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi:
          </p>
          <p className="font-mono text-[14px]">
            Email:{" "}
            <a href="mailto:wikanpriambudi@gmail.com" className="text-accent hover:underline">
              wikanpriambudi@gmail.com
            </a>
          </p>
        </Section>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[19px] font-bold tracking-[-0.01em] m-0">{title}</h2>
      {children}
    </section>
  );
}
