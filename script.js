/* ============================================= */
/* SCRIPT.JS - JavaScript untuk landing page     */
/* Kode dibuat sederhana agar mudah dipelajari   */
/* ============================================= */

// =============================================
// 1. HAMBURGER MENU - Buka/tutup menu di mobile
// =============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Ketika hamburger diklik
hamburger.addEventListener('click', function () {
    // Toggle class 'active' pada hamburger (untuk animasi X)
    hamburger.classList.toggle('active');
    // Toggle class 'open' pada menu (untuk menampilkan/menyembunyikan)
    navMenu.classList.toggle('open');
});

// =============================================
// 2. TUTUP MENU SAAT LINK DIKLIK (Mobile)
// Agar menu otomatis tertutup setelah memilih
// =============================================
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        // Hapus class active dan open
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

// =============================================
// 3. ANIMASI SCROLL - Elemen muncul saat di-scroll
// Menggunakan Intersection Observer API
// =============================================
const animElements = document.querySelectorAll('.anim-fade');

// Membuat observer yang mengawasi setiap elemen
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        // Jika elemen terlihat di layar
        if (entry.isIntersecting) {
            // Tambahkan class 'visible' untuk memunculkan animasi
            entry.target.classList.add('visible');
            // Berhenti mengawasi elemen ini (animasi hanya sekali)
            observer.unobserve(entry.target);
        }
    });
}, {
    // Elemen dianggap terlihat jika sudah 15% masuk layar
    threshold: 0.15
});

// Daftarkan semua elemen animasi ke observer
animElements.forEach(function (el) {
    observer.observe(el);
});

// =============================================
// 4. FALLBACK GAMBAR - Jika gambar gagal dimuat
// Menampilkan pesan pengganti agar layout tidak rusak
// =============================================
const allImages = document.querySelectorAll('img');

allImages.forEach(function (img) {
    // Jika gambar gagal dimuat
    img.addEventListener('error', function () {
        // Buat elemen pengganti
        var fallback = document.createElement('div');
        fallback.className = 'img-fallback';
        fallback.textContent = 'Gambar belum ditambahkan';

        // Ganti gambar dengan elemen fallback
        img.parentNode.replaceChild(fallback, img);
    });
});

// =============================================
// 5. TOMBOL MATERI - Tampilkan embed Canva
// Menampilkan/menyembunyikan embed saat tombol diklik
// =============================================
var btnMateri = document.getElementById('btnMateri');
var embedWrapper = document.getElementById('embedWrapper');

if (btnMateri && embedWrapper) {
    btnMateri.addEventListener('click', function (e) {
        // Cegah aksi default link (karena pakai href=#)
        e.preventDefault();

        // Toggle tampilan embed
        if (embedWrapper.style.display === 'none') {
            embedWrapper.style.display = 'block';
            // Ubah teks tombol
            btnMateri.textContent = 'Tutup Materi';
            // Scroll ke embed
            embedWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            embedWrapper.style.display = 'none';
            btnMateri.textContent = 'Materi';
        }
    });
}

// =============================================
// 6. NAVBAR AKTIF - Menandai section yang sedang dilihat
// Opsional: memberi efek visual pada link navbar
// =============================================
var sections = document.querySelectorAll('section[id]');
var menuItems = document.querySelectorAll('.nav-menu a');

// Fungsi untuk mengecek section mana yang sedang terlihat
function updateActiveNav() {
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        // Jika posisi scroll berada di dalam section ini
        if (scrollPos >= top && scrollPos < top + height) {
            // Hapus class 'active' dari semua menu
            menuItems.forEach(function (item) {
                item.classList.remove('active');
            });
            // Tambahkan class 'active' ke menu yang sesuai
            var activeLink = document.querySelector('.nav-menu a[href="#' + id + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Jalankan saat halaman di-scroll
window.addEventListener('scroll', updateActiveNav);

// Jalankan sekali saat halaman pertama kali dimuat
updateActiveNav();