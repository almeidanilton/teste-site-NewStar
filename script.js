/* ============================================
   LABORATÓRIO NEW STAR - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const header = document.getElementById('header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // ============================================
  // HAMBURGER MENU
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');

  hamburger.addEventListener('click', function () {
    navbar.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navbar.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) {
      navbar.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // FADE IN ANIMATIONS ON SCROLL
  // ============================================
  const fadeElements = document.querySelectorAll(
    '.servico-card, .feature-item, .step, .contato-item, .sobre-content, .sobre-images, .fluxo-content, .fluxo-images'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // ============================================
  // STAGGERED ANIMATION FOR CARDS
  // ============================================
  const cards = document.querySelectorAll('.servico-card');
  cards.forEach(function (card, index) {
    card.style.transitionDelay = (index * 0.08) + 's';
  });

  // ============================================
  // CONTACT FORM HANDLER
  // ============================================
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      if (!nome || !telefone || !email || !mensagem) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
      }

      // Build WhatsApp message
      const whatsappMsg = encodeURIComponent(
        `Olá! Gostaria de solicitar um orçamento.\n\n` +
        `*Nome:* ${nome}\n` +
        `*Telefone:* ${telefone}\n` +
        `*E-mail:* ${email}\n\n` +
        `*Mensagem:* ${mensagem}`
      );

      const btn = form.querySelector('.btn-submit');
      btn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
      btn.style.background = '#25d366';

      setTimeout(function () {
        window.open('https://wa.me/5511992147028?text=' + whatsappMsg, '_blank');
        form.reset();
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
        btn.style.background = '';
      }, 1000);
    });
  }

  // ============================================
  // NOTIFICATION HELPER
  // ============================================
  function showNotification(msg, type) {
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed;
      top: 90px;
      right: 24px;
      z-index: 99999;
      background: ${type === 'error' ? '#ef4444' : '#25d366'};
      color: white;
      padding: 14px 24px;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      transform: translateX(120%);
      transition: transform 0.3s ease;
      font-family: 'Inter', sans-serif;
    `;
    notif.textContent = msg;
    document.body.appendChild(notif);

    setTimeout(function () { notif.style.transform = 'translateX(0)'; }, 10);
    setTimeout(function () {
      notif.style.transform = 'translateX(120%)';
      setTimeout(function () { notif.remove(); }, 300);
    }, 3500);
  }

  // ============================================
  // PHONE MASK
  // ============================================
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '');
      if (v.length <= 10) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else {
        v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }
      this.value = v;
    });
  }

  // ============================================
  // HAMBURGER ANIMATION
  // ============================================
  const style = document.createElement('style');
  style.textContent = `
    .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  `;
  document.head.appendChild(style);

});
