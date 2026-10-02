/**
 * BODA GRAPHIC DESIGN - OFFICIAL JAVASCRIPT
 * Interactive Features, Gallery Filtering, Lightbox Modal & Direct WhatsApp Form
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Elements ---
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxOrderBtn = document.getElementById('lightbox-order-btn');
  const floatTop = document.getElementById('float-top');
  const faqItems = document.querySelectorAll('.faq-item');
  const orderForm = document.getElementById('order-form');

  // --- 1. Sticky Header & Back to Top on Scroll ---
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header Background Blur & Border
    if (scrollPos > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll-to-top Button Visibility
    if (scrollPos > 400) {
      floatTop.classList.add('visible');
    } else {
      floatTop.classList.remove('visible');
    }

    // Active Navigation Highlight
    highlightActiveNavLink();
  });

  // --- 2. Mobile Navigation Toggle ---
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i') || navToggle;
      if (navMenu.classList.contains('active')) {
        navToggle.innerHTML = '✕';
      } else {
        navToggle.innerHTML = '☰';
      }
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.innerHTML = '☰';
      });
    });
  }

  // --- 3. Scrollspy / Active Nav Link ---
  function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // --- 4. Portfolio Category Filtering ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- 5. Lightbox Modal Preview ---
  window.openLightbox = function(imgSrc, title, designType) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = title;

    // Prepare custom order message for this specific design
    if (lightboxOrderBtn) {
      const encodedMsg = encodeURIComponent(
        `السلام عليكم أ / بودا، شفت تصميم "${title}" في موقعك وحابب اطلب تصميم بنفس الفكرة والجودة الإبداعية دي.`
      );
      lightboxOrderBtn.href = `https://wa.me/201154591411?text=${encodedMsg}`;
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // --- 6. Direct WhatsApp Order Generator Form ---
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name').value.trim();
      const phone = document.getElementById('client-phone').value.trim();
      const service = document.getElementById('design-type').value;
      const details = document.getElementById('project-details').value.trim();

      if (!name) {
        alert('من فضلك اكتب اسمك أو اسم النشاط');
        return;
      }

      // Build structured WhatsApp message
      const message = 
`👑 *طلب تصميم جديد من موقع Boda Graphic Design* 👑
------------------------------------------------
👤 *الاسم / النشاط:* ${name}
📱 *رقم التواصل:* ${phone || 'غير محدد'}
🎨 *نوع التصميم المطلوب:* ${service}
📝 *تفاصيل ومتطلبات الفكرة:*
${details || 'لا توجد ملاحظات إضافية'}
------------------------------------------------
أرجو التواصل معي للبدء في التنفيذ في أقرب وقت. شكراً لك!`;

      const whatsappUrl = `https://wa.me/201154591411?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // --- 7. FAQ Accordion Toggle ---
  faqItems.forEach(item => {
    const headerBtn = item.querySelector('.faq-header');
    if (headerBtn) {
      headerBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close others
        faqItems.forEach(other => other.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // --- 8. Smooth Scroll to Top ---
  if (floatTop) {
    floatTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
