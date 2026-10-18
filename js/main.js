(function () {
    'use strict';

    /* =====================================================================
       SOCIAL LINKS - sirf yahin badalna hai, poori website me apne aap lag jayega.
       Facebook ka link neeche quotes ke andar paste kar do.
       Khali ('') chhodoge to Facebook wala button/row hide rahega.
       ===================================================================== */
    var LINKS = {
        instagram: 'https://www.instagram.com/bhairaviproductions/',
        youtube:   'https://www.youtube.com/@bhairaviproductions',
        linkedin:  'https://www.linkedin.com/company/bhairaviproductions/',
        facebook:  ''
    };

    document.querySelectorAll('[data-social]').forEach(function (el) {
        var url = LINKS[el.getAttribute('data-social')];
        if (url) {
            el.setAttribute('href', url);
        } else {
            var wrap = el.closest('[data-social-wrap]') || el;
            wrap.style.display = 'none';
        }
    });

    /* Computer par file double-click karke kholne par (file://) folder links
       "index.html" ke bina nahi khulte. Isliye sirf us case me index.html jod do.
       Internet par (Vercel / koi bhi hosting) links saaf rehte hain: /about/ , /work/ ... */
    if (location.protocol === 'file:') {
        document.querySelectorAll('a[href]').forEach(function (a) {
            var h = a.getAttribute('href');
            if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(h)) return;
            if (h.charAt(h.length - 1) === '/') a.setAttribute('href', h + 'index.html');
        });
    }

    // ---------- Mobile menu ----------
    var menu = document.getElementById('mobileMenu');
    var backdrop = document.getElementById('menuBackdrop');
    var toggle = document.getElementById('menuToggle');
    var closeBtn = document.getElementById('menuClose');

    function openMenu() {
        menu.classList.add('open');
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        menu.classList.remove('open');
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
    }
    if (toggle && menu) {
        toggle.addEventListener('click', openMenu);
        closeBtn.addEventListener('click', closeMenu);
        backdrop.addEventListener('click', closeMenu);
        menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    }

    // ---------- Reel popup (Instagram embed) ----------
    var modal = document.getElementById('videoModal');
    if (modal) {
        var body = document.getElementById('videoModalBody');
        var title = document.getElementById('videoModalTitle');

        var openVideo = function (card) {
            body.innerHTML = '';
            body.classList.add('portrait');
            var f = document.createElement('iframe');
            f.src = card.getAttribute('data-src');
            f.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
            f.allowFullscreen = true;
            body.appendChild(f);
            title.textContent = card.getAttribute('data-title') || '';
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        };
        var closeVideo = function () {
            modal.classList.remove('open');
            body.innerHTML = '';
            document.body.style.overflow = '';
        };

        document.querySelectorAll('[data-play]').forEach(function (card) {
            card.addEventListener('click', function () { openVideo(card); });
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideo(card); }
            });
        });
        document.getElementById('videoModalClose').addEventListener('click', closeVideo);
        modal.addEventListener('click', function (e) { if (e.target === modal) closeVideo(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeVideo(); });
    }
})();
