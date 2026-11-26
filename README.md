# Undangan Pernikahan Digital (Mobile-First HP)

## Isi Folder `undangan-hp/`
- `index.html` — Struktur utama halaman undangan (tampilan layar penuh HP `100dvh`, profil mempelai, hitung mundur, lokasi, amplop digital, dan RSVP).
- `style.css` — Desain responsif khusus layar handphone (`max-width: 480px`) dengan animasi tombol musik berputar.
- `script.js` — Fitur nama tamu dinamis (`?to=`), *autoplay* backsound saat klik **Buka Undangan**, hitung mundur, salin nomor rekening, dan penyimpanan ucapan `localStorage`.
- `assets/musik.wav` — Audio backsound bawaan siap pakai. Untuk mengganti lagu dengan MP3 sendiri, cukup masukkan file bernama `musik.mp3` ke dalam folder `assets/`.

## Cara Menjalankan di VS Code & HP
1. Ekstrak file ZIP dan buka folder `undangan-hp` di **Visual Studio Code**.
2. Klik kanan `index.html` -> pilih **Open with Live Server**.
3. Untuk mengecek di HP via Wi-Fi yang sama: jalankan `ipconfig` di terminal VS Code untuk melihat IP PC (misal `192.168.1.10`), lalu buka `http://192.168.1.10:5500/index.html?to=Budi+Santoso` di browser HP.
4. Untuk membagikan ke tamu via WhatsApp: seret folder `undangan-hp` ke **Netlify Drop** (`https://app.netlify.com/drop`) agar mendapatkan link publik.
