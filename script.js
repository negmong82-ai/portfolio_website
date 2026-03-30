/* =====================================================
   넥몽 Portfolio — script.js
   Interactions & Animations
   ===================================================== */

'use strict';

// ─────────────────────────────────────────────────────
// 2. NAVIGATION — Scroll & Mobile Menu
// ─────────────────────────────────────────────────────
(function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Scroll: add "scrolled" class after 50px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile burger toggle
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.classList.toggle('active', isOpen);
      burger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
})();


// ─────────────────────────────────────────────────────
// 3. SCROLL REVEAL — Intersection Observer
// ─────────────────────────────────────────────────────
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-delay');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
})();


// ─────────────────────────────────────────────────────
// 4. HERO — Staggered children reveal on load
// ─────────────────────────────────────────────────────
(function initHeroReveal() {
  const heroContent = document.querySelector('.hero__content');
  if (!heroContent) return;

  const children = heroContent.children;
  Array.from(children).forEach((child, i) => {
    child.style.opacity = '0';
    child.style.transform = 'translateY(30px)';
    child.style.transition = `opacity 0.7s ease ${0.1 + i * 0.12}s, transform 0.7s ease ${0.1 + i * 0.12}s`;

    // Trigger after a short delay
    requestAnimationFrame(() => {
      setTimeout(() => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      }, 80);
    });
  });
})();


// ─────────────────────────────────────────────────────
// 5. SMOOTH SCROLL for anchor links
// ─────────────────────────────────────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('nav')?.offsetHeight || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();


// Card Tilt removed to fix distortion issues per user request



// ─────────────────────────────────────────────────────
// 7. SKILL ITEMS — Staggered entrance
// ─────────────────────────────────────────────────────
(function initSkillsAnimation() {
  const skillsSection = document.querySelector('.skills');
  if (!skillsSection) return;

  const items = skillsSection.querySelectorAll('.skill-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          items.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            setTimeout(() => {
              item.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background 0.3s ease, border-color 0.3s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 60 + i * 60);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(skillsSection);
})();


// ─────────────────────────────────────────────────────
// 8. FOOTER BRAND — Subtle entrance on scroll
// ─────────────────────────────────────────────────────
(function initFooterBrand() {
  const brand = document.querySelector('.footer__brand');
  if (!brand) return;

  brand.style.transform = 'translateY(40px)';
  brand.style.transition = 'transform 1s ease, color 0.5s ease';

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          brand.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(brand);
})();


// ─────────────────────────────────────────────────────
// 9. MARQUEE — Pause on hover
// ─────────────────────────────────────────────────────
(function initMarquee() {
  const track = document.querySelector('.marquee__track');
  if (!track) return;

  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });

  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
})();


// ─────────────────────────────────────────────────────
// 10. ACTIVE NAV LINK — Highlight on scroll section
// ─────────────────────────────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.style.opacity = link.getAttribute('href') === `#${id}` ? '1' : '0.5';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
})();


// ─────────────────────────────────────────────────────
// 11. DYNAMIC YEAR in footer (future-proof)
// ─────────────────────────────────────────────────────
(function initYear() {
  const copy = document.querySelector('.footer__copy');
  if (copy) {
    copy.innerHTML = copy.innerHTML.replace('2026', new Date().getFullYear());
  }
})();


// ─────────────────────────────────────────────────────
// 12. PLACEHOLDER IMAGE — Graceful fallback
//     (Fills grid/project cells with CSS gradients if
//      assets/ folder images are missing)
// ─────────────────────────────────────────────────────
(function initImageFallbacks() {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    img.addEventListener('error', function () {
      // Hide broken image, parent shows gradient bg via CSS
      this.style.opacity = '0';
    });
  });
})();


console.log(
  '%c넥몽 Portfolio%c — Built with HTML · CSS · JS ✨',
  'color: #1A1A1A; font-weight: 900; font-size: 1.1rem; background: #FAF594; padding: 4px 10px;',
  'color: #888; font-size: 0.85rem; padding: 4px 0;'
);
