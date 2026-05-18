/* ====================================================
   SCRIPT.JS - JavaScript untuk Landing Page Sejarah-MU
   Ditulis dengan JavaScript murni tanpa library.
   ==================================================== */


/* ----------------------------------------------------
   1. HAMBURGER MENU (Mobile)
   Menampilkan dan menyembunyikan menu navigasi
   saat tombol hamburger diklik.
   ---------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Jika hamburger ada di halaman (index.html)
if (hamburger && navMenu) {
  hamburger.addEventListener('click', function () {
    // Toggle class "active" untuk animasi dan tampilan
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Tutup menu saat salah satu link diklik (di mobile)
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}


/* ----------------------------------------------------
   2. SMOOTH SCROLL
   Mengatur scroll halus saat link navbar diklik.
   ---------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Hitung posisi target, dikurangi tinggi navbar (64px)
      const offsetTop = targetElement.offsetTop - 64;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});


/* ----------------------------------------------------
   3. ANIMASI SCROLL (Intersection Observer)
   Menambahkan class "tampil" saat elemen masuk viewport.
   Elemen yang memiliki class "animasi-muncul" akan
   muncul dengan efek fade-in saat discroll.
   ---------------------------------------------------- */
const elemenAnimasi = document.querySelectorAll('.animasi-muncul');

// Buat observer untuk mendeteksi elemen yang masuk viewport
const observerOptions = {
  threshold: 0.15 // Muncul saat 15% elemen terlihat
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      // Tambahkan class "tampil" untuk memicu animasi CSS
      entry.target.classList.add('tampil');
      // Berhenti mengamati setelah animasi dimainkan
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Terapkan observer ke setiap elemen animasi
elemenAnimasi.forEach(function (elemen) {
  observer.observe(elemen);
});


/* ----------------------------------------------------
   4. FALLBACK GAMBAR
   Jika gambar gagal dimuat, tampilkan teks fallback
   sebagai pengganti gambar yang rusak/kosong.
   ---------------------------------------------------- */
const semuaGambar = document.querySelectorAll('.img-fallback');

semuaGambar.forEach(function (img) {
  img.addEventListener('error', function () {
    // Ganti tampilan gambar dengan teks fallback
    this.style.display = 'flex';
    this.classList.add('img-fallback-error');
    this.alt = 'Gambar belum ditambahkan';
    // Buat elemen teks pengganti
    const fallbackText = document.createElement('span');
    fallbackText.textContent = '📷 Gambar belum ditambahkan';
    // Kosongkan isi img dan masukkan teks fallback
    this.innerHTML = '';
    this.appendChild(fallbackText);
    // Hapus src agar tidak terus mencoba memuat
    this.removeAttribute('src');
  });
});


/* ----------------------------------------------------
   5. NAVIGASI SIDEBAR (untuk belajar.html)
   Menangani klik pada sidebar daftar bab untuk
   menampilkan konten bab yang dipilih.
   ---------------------------------------------------- */
const sidebarItems = document.querySelectorAll('.sidebar-item[data-bab]');
const babContents = document.querySelectorAll('.bab-content');

if (sidebarItems.length > 0 && babContents.length > 0) {
  sidebarItems.forEach(function (item) {
    item.addEventListener('click', function () {
      // Ambil id bab yang diklik
      const babId = this.getAttribute('data-bab');

      // Hapus class "active" dari semua sidebar item
      sidebarItems.forEach(function (si) {
        si.classList.remove('active');
      });

      // Hapus class "active" dari semua konten bab
      babContents.forEach(function (bc) {
        bc.classList.remove('active');
      });

      // Tambahkan class "active" ke item yang diklik
      this.classList.add('active');

      // Tampilkan konten bab yang sesuai
      const targetBab = document.getElementById(babId);
      if (targetBab) {
        targetBab.classList.add('active');
      }

      // Di mobile, tutup sidebar setelah memilih bab
      const sidebar = document.querySelector('.belajar-sidebar');
      if (sidebar && window.innerWidth <= 768) {
        sidebar.classList.remove('open');
      }
    });
  });
}

// Toggle sidebar di mobile (untuk belajar.html)
const sidebarToggle = document.querySelector('.sidebar-toggle');
const belajarSidebar = document.querySelector('.belajar-sidebar');

if (sidebarToggle && belajarSidebar) {
  sidebarToggle.addEventListener('click', function () {
    belajarSidebar.classList.toggle('open');
  });
}


/* ----------------------------------------------------
   6. NAVBAR EFEK SCROLL (opsional)
   Menambahkan shadow lebih tebal pada navbar
   saat halaman discroll ke bawah.
   ---------------------------------------------------- */
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
  }
}); 
