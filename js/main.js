/* ============================================================
   OTB PRO SAFARIS – JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---- Sticky header ---- */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) navLinks.classList.remove('open');
    });
  }

  /* ---- Hero background subtle zoom on load ---- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('load', () => heroBg.classList.add('loaded'));
  }

  /* ---- Active nav link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach((link) => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });

  /* ---- Tour filter buttons ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const tourCards  = document.querySelectorAll('.tour-detail-card[data-category]');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      tourCards.forEach((card) => {
        const match = cat === 'all' || card.dataset.category === cat;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* ---- Gallery lightbox ---- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox     = document.getElementById('lightbox');
  const lbImg        = lightbox ? lightbox.querySelector('.lightbox-inner') : null;
  const lbCaption    = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
  let currentIndex   = 0;

  function openLightbox(index) {
    if (!lightbox) return;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item       = galleryItems[currentIndex];
    const caption    = item ? item.dataset.caption : '';
    const placeholder = item ? item.querySelector('.img-placeholder') : null;
    if (lbImg && placeholder) {
      lbImg.innerHTML = placeholder.outerHTML;
    }
    if (lbCaption) lbCaption.textContent = caption || '';
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
    item.addEventListener('keydown', (e) => { if (e.key === 'Enter') openLightbox(i); });
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', item.dataset.caption || 'Gallery image');
  });

  if (lightbox) {
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-nav.prev')?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightbox();
    });
    lightbox.querySelector('.lightbox-nav.next')?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateLightbox();
    });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
      }
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightbox();
      }
    });
  }

  /* ---- Contact form submission ---- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn    = contactForm.querySelector('[type="submit"]');
      const notice = document.getElementById('form-success');
      btn.disabled    = true;
      btn.textContent = 'Sending…';
      setTimeout(() => {
        btn.disabled    = false;
        btn.textContent = 'Send Enquiry';
        contactForm.reset();
        if (notice) {
          notice.hidden = false;
          setTimeout(() => { notice.hidden = true; }, 6000);
        }
      }, 1500);
    });
  }

  /* ---- Scroll-reveal (simple IntersectionObserver) ---- */
  const revealEls = document.querySelectorAll(
    '.feature-card, .tour-card, .testimonial-card, .team-card, .gallery-item, .tour-detail-card'
  );
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity    = '1';
          entry.target.style.transform  = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      io.observe(el);
    });
  }

  /* ---- Number counter animation (stat items) ---- */
  const statNumbers = document.querySelectorAll('.stat-item .number');
  if ('IntersectionObserver' in window && statNumbers.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const dur    = 1400;
        const step   = Math.ceil(target / (dur / 16));
        let current  = 0;
        const tick   = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current.toLocaleString() + suffix;
          if (current >= target) clearInterval(tick);
        }, 16);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => cio.observe(el));
  }

})();
