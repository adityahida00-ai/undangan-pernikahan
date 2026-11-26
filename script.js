// 1. AMBIL NAMA TAMU DARI URL (?to=Nama+Tamu)
const params = new URLSearchParams(window.location.search);
const tamu = params.get('to');
if (tamu) {
  document.getElementById('guest-name').textContent = tamu;
  document.getElementById('nama').value = tamu;
}

// 2. BUKA UNDANGAN & PUTAR BACKSOUND
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let isPlaying = false;

function bukaUndangan() {
  document.getElementById('cover').classList.add('hidden');
  document.getElementById('main-content').classList.remove('hidden');

  audio.play().then(() => {
    isPlaying = true;
    musicBtn.innerHTML = '&#127925;';
    musicBtn.classList.add('spinning');
  }).catch(() => {
    isPlaying = false;
    musicBtn.innerHTML = '&#128263;';
    musicBtn.classList.remove('spinning');
  });
}

function toggleMusic() {
  if (isPlaying) {
    audio.pause();
    musicBtn.innerHTML = '&#128263;';
    musicBtn.classList.remove('spinning');
  } else {
    audio.play();
    musicBtn.innerHTML = '&#127925;';
    musicBtn.classList.add('spinning');
  }
  isPlaying = !isPlaying;
}

// 3. HITUNG MUNDUR (GANTI TANGGAL ACARA DI SINI)
const waktuAcara = new Date("Dec 20, 2026 08:00:00").getTime();

setInterval(() => {
  const sekarang = new Date().getTime();
  const selisih = waktuAcara - sekarang;

  if (selisih <= 0) return;

  document.getElementById('days').textContent = String(Math.floor(selisih / (1000 * 60 * 60 * 24))).padStart(2, '0');
  document.getElementById('hours').textContent = String(Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
  document.getElementById('minutes').textContent = String(Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  document.getElementById('seconds').textContent = String(Math.floor((selisih % (1000 * 60)) / 1000)).padStart(2, '0');
}, 1000);

// 4. SALIN NOMOR REKENING
function salinTeks(teks, tombol) {
  navigator.clipboard.writeText(teks).then(() => {
    tombol.textContent = 'Tersalin!';
    setTimeout(() => { tombol.textContent = 'Salin Rekening'; }, 2000);
  });
}

// 5. SIMPAN & TAMPILKAN UCAPAN (DENGAN LOCALSTORAGE)
const STORAGE_KEY = 'undangan_hp_ucapan';

function muatUcapan() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const list = document.getElementById('list-ucapan');
  list.innerHTML = '';
  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'ucapan-item';
    div.innerHTML = `<strong>${escapeHtml(item.nama)}</strong><small>${escapeHtml(item.kehadiran)}</small><p>${escapeHtml(item.pesan)}</p>`;
    list.appendChild(div);
  });
}

function tambahUcapan(e) {
  e.preventDefault();
  const nama = document.getElementById('nama').value.trim();
  const kehadiran = document.getElementById('kehadiran').value;
  const pesan = document.getElementById('pesan').value.trim();
  if (!nama || !kehadiran || !pesan) return;

  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  data.unshift({ nama, kehadiran, pesan });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  muatUcapan();
  document.getElementById('rsvp-form').reset();
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

muatUcapan();
