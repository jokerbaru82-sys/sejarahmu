/* ============================================================
   script.js — Sejarah-Mu Landing Page
   Kelompok: PENTACODE | Kelas A / PAI | 2026
   ============================================================
   Berisi 4 fungsi utama:
   1. Hamburger menu (untuk mobile)
   2. Smooth scroll (saat klik menu navbar)
   3. Animasi fade-in saat scroll
   4. Fallback gambar yang gagal dimuat
   ============================================================ */


/* ===== 1. HAMBURGER MENU (MOBILE) ===== */

// Ambil elemen hamburger dan menu dari HTML
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

// Jalankan saat tombol hamburger diklik
hamburger.addEventListener('click', function () {
  // Toggle class 'active' dan 'open' untuk membuka/menutup menu
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Tutup menu saat salah satu link diklik
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});


/* ===== 2. SMOOTH SCROLL ===== */

// Saat link navbar diklik, gulir halaman dengan mulus ke section tujuan
navLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    // Ambil nilai href, contoh: "#fitur"
    const href = link.getAttribute('href');

    // Hanya proses jika href mengarah ke section di halaman ini (#...)
    if (href && href.startsWith('#')) {
      e.preventDefault(); // Hentikan aksi default browser (lompat langsung)

      const targetEl = document.querySelector(href); // Cari element tujuan
      if (targetEl) {
        // Hitung posisi dengan mempertimbangkan tinggi navbar (64px)
        const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  });
});


/* ===== 3. ANIMASI FADE-IN SAAT SCROLL ===== */

// Gunakan IntersectionObserver untuk mendeteksi elemen yang masuk layar
const fadeElements = document.querySelectorAll('.fade-in');

// Buat observer — fungsi ini dipanggil saat elemen terlihat di layar
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      // Tambahkan class 'visible' agar animasi CSS aktif
      entry.target.classList.add('visible');
      // Setelah elemen terlihat, tidak perlu diobservasi lagi
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12 // Animasi mulai saat 12% elemen terlihat
});

// Daftarkan semua elemen .fade-in ke observer
fadeElements.forEach(function (el) {
  observer.observe(el);
});


/* ===== 4. FALLBACK GAMBAR ===== */

// Jika gambar gagal dimuat, tampilkan teks pengganti
const allImages = document.querySelectorAll('img');
allImages.forEach(function (img) {
  img.addEventListener('error', function () {
    // Sembunyikan gambar yang gagal
    img.style.display = 'none';

    // Tampilkan elemen fallback jika ada di sebelahnya
    const fallback = img.nextElementSibling;
    if (fallback && fallback.classList.contains('img-fallback')) {
      fallback.style.display = 'flex';
    }

    // Beri warna abu-abu pada container gambar
    const parent = img.parentElement;
    if (parent) {
      parent.style.backgroundColor = '#e8e8e8';
      parent.style.minHeight = '150px';
      parent.style.display = 'flex';
      parent.style.alignItems = 'center';
      parent.style.justifyContent = 'center';
    }
  });
});


/* ===== 5. NAVBAR: UBAH TAMPILAN SAAT DISCROLL ===== */

// Navbar sedikit berubah saat halaman discroll ke bawah
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 60) {
    navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.18)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
