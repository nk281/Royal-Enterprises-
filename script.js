const THEME_KEY = 'studioArcTheme';

const PROJECTS = [
  {
    id: 1,
    title: 'Lodhi Road Residence',
    category: 'residential',
    location: 'New Delhi, IN',
    area: '186 m²',
    year: '2025',
    style: 'Warm Minimalism',
    duration: '14 weeks',
    client: 'Private Residence',
    summary: 'A full renovation of a three-bedroom apartment, reworking the layout around natural light and a restrained material palette of oak, limewash and brass.',
    images: ['images/project1-1.jpg', 'images/project1-2.jpg', 'images/project1-3.jpg']
  },
  {
    id: 2,
    title: 'Cyber Hub Office Fit-Out',
    category: 'commercial',
    location: 'Gurugram, IN',
    area: '640 m²',
    year: '2024',
    style: 'Industrial Modern',
    duration: '20 weeks',
    client: 'Tech Startup (NDA)',
    summary: 'An open-plan workspace for a 90-person team, balancing acoustic comfort with an exposed-services, concrete-and-steel material language.',
    images: ['images/project2-1.jpg', 'images/project2-2.jpg', 'images/project2-3.jpg']
  },
  {
    id: 3,
    title: 'Vasant Vihar Kitchen',
    category: 'kitchen',
    location: 'New Delhi, IN',
    area: '28 m²',
    year: '2025',
    style: 'Contemporary Classic',
    duration: '8 weeks',
    client: 'Private Residence',
    summary: 'A galley kitchen reworked into an open cooking-and-dining zone with a book-matched stone island and integrated appliances.',
    images: ['images/project3-1.jpg', 'images/project3-2.jpg', 'images/project3-3.jpg']
  },
  {
    id: 4,
    title: 'Golf Course Road Primary Suite',
    category: 'bedroom',
    location: 'Gurugram, IN',
    area: '42 m²',
    year: '2024',
    style: 'Soft Modernism',
    duration: '6 weeks',
    client: 'Private Residence',
    summary: 'A primary bedroom and dressing room redesigned around a muted sage and stone palette, with custom joinery throughout.',
    images: ['images/project4-1.jpg', 'images/project4-2.jpg', 'images/project4-3.jpg']
  },
  {
    id: 5,
    title: 'Saket Boutique Showroom',
    category: 'commercial',
    location: 'New Delhi, IN',
    area: '210 m²',
    year: '2023',
    style: 'Gallery Minimal',
    duration: '10 weeks',
    client: 'Retail Client',
    summary: 'A retail interior designed as a rotating gallery space, with modular display walls and a neutral backdrop for changing collections.',
    images: ['images/project5-1.jpg', 'images/project5-2.jpg', 'images/project5-3.jpg']
  },
  {
    id: 6,
    title: 'Greater Kailash Living Room',
    category: 'residential',
    location: 'New Delhi, IN',
    area: '54 m²',
    year: '2025',
    style: 'Warm Minimalism',
    duration: '9 weeks',
    client: 'Private Residence',
    summary: 'A double-height living space reworked with a sunken conversation pit, linen upholstery, and a restored terrazzo floor.',
    images: ['images/project6-1.jpg', 'images/project6-2.jpg', 'images/project6-3.jpg']
  }
];

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Theme toggle ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('.icon') : null;

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('theme-dark', isDark);
    localStorage.setItem(THEME_KEY, theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      themeToggle.setAttribute('aria-pressed', String(isDark));
    }
    if (themeIcon) {
      themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
  };

  const savedTheme = localStorage.getItem(THEME_KEY);
  const preferredTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(preferredTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    // Close menu when a link is tapped (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  /* ---------- Scroll-reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ---------- Animated stat counters (About page) ---------- */
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  if (statNums.length) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const tick = () => {
          current += step;
          if (current >= target) {
            el.textContent = target + suffix;
          } else {
            el.textContent = current + suffix;
            requestAnimationFrame(tick);
          }
        };
        tick();
        statObserver.unobserve(el);
      });
    }, { threshold: 0.4 });
    statNums.forEach(el => statObserver.observe(el));
  }

  /* ---------- Testimonial slider ---------- */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsWrap = document.querySelector('.slider-dots');
  if (slides.length && dotsWrap) {
    let current = 0;
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showSlide(i));
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll('button');

    function showSlide(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    setInterval(() => {
      showSlide((current + 1) % slides.length);
    }, 5500);
  }

  /* ---------- Portfolio filter ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.filter;
        projectCards.forEach(card => {
          const match = category === 'all' || card.dataset.category === category;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Save clicked project to localStorage, for project-detail.html ---------- */
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      if (id) window.location.href = `project-detail.html?id=${id}`;
    });
  });

  /* ---------- Contact form validation ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const msgBox = document.getElementById('formMsg');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const projectType = document.getElementById('projectType');
      const message = document.getElementById('message').value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        showMsg('Please fill in all required fields.', true);
        return;
      }
      if (!emailPattern.test(email)) {
        showMsg('Please enter a valid email address.', true);
        return;
      }

      const whatsappNumber = contactForm.dataset.whatsappNumber;
      const projectTypeLabel = projectType.options[projectType.selectedIndex].text;
      const whatsappMessage = [
        'Hello Royal Enterprises, I would like to enquire about a project.',
        '',
        `Name: ${name}`,
        `Phone: ${phone || 'Not provided'}`,
        `Email: ${email}`,
        `Project Type: ${projectTypeLabel}`,
        '',
        'Project Details:',
        message
      ].join('\n');

      window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    });

    function showMsg(text, isError) {
      msgBox.textContent = text;
      msgBox.classList.remove('error');
      if (isError) msgBox.classList.add('error');
      msgBox.classList.add('show');
    }
  }

  /* ---------- Before / After image slider (project-detail.html) ---------- */
  const baSlider = document.querySelector('.ba-slider');
  if (baSlider) {
    const afterImg = baSlider.querySelector('.ba-after');
    const handle = baSlider.querySelector('.ba-handle');
    let dragging = false;

    const setPosition = (clientX) => {
      const rect = baSlider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      afterImg.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = `${pct}%`;
    };

    handle.addEventListener('mousedown', () => dragging = true);
    window.addEventListener('mouseup', () => dragging = false);
    window.addEventListener('mousemove', (e) => { if (dragging) setPosition(e.clientX); });

    handle.addEventListener('touchstart', () => dragging = true, { passive: true });
    window.addEventListener('touchend', () => dragging = false);
    window.addEventListener('touchmove', (e) => {
      if (dragging) setPosition(e.touches[0].clientX);
    }, { passive: true });
  }

  /* ---------- Gallery thumbnail swap (project-detail.html) ---------- */
  const galleryMain = document.querySelector('.gallery-main img');
  const galleryThumbs = document.querySelectorAll('.gallery-thumbs img');
  if (galleryMain && galleryThumbs.length) {
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        galleryMain.src = thumb.src;
        galleryThumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }

  /* ---------- Project detail page rendering ---------- */
  const detailRoot = document.getElementById('projectDetail');
  if (detailRoot) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'), 10);
    const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];

    document.title = `${project.title} | Studio Arc`;
    document.getElementById('detailTitle').textContent = project.title;
    document.getElementById('detailSummary').textContent = project.summary;
    document.getElementById('detailClient').textContent = project.client;
    document.getElementById('detailLocation').textContent = project.location;
    document.getElementById('detailArea').textContent = project.area;
    document.getElementById('detailStyle').textContent = project.style;
    document.getElementById('detailDuration').textContent = project.duration;
    document.getElementById('detailYear').textContent = project.year;

    const mainImg = document.querySelector('.gallery-main img');
    if (mainImg) mainImg.src = project.images[0];

    const thumbWrap = document.querySelector('.gallery-thumbs');
    if (thumbWrap) {
      thumbWrap.innerHTML = '';
      project.images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${project.title} view ${i + 1}`;
        if (i === 0) img.classList.add('active');
        thumbWrap.appendChild(img);
      });
      // Re-bind thumbnail clicks since we rebuilt them
      thumbWrap.querySelectorAll('img').forEach(thumb => {
        thumb.addEventListener('click', () => {
          mainImg.src = thumb.src;
          thumbWrap.querySelectorAll('img').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
      });
    }

    // Related projects: same category, excluding current
    const relatedWrap = document.getElementById('relatedProjects');
    if (relatedWrap) {
      const related = PROJECTS.filter(p => p.category === project.category && p.id !== project.id).slice(0, 3);
      relatedWrap.innerHTML = related.map(p => `
        <a class="project-card" href="project-detail.html?id=${p.id}">
          <div class="project-thumb"><img src="${p.images[0]}" alt="${p.title}"></div>
          <div class="project-meta"><span>${p.category}</span><span>${p.year}</span></div>
          <h3>${p.title}</h3>
        </a>
      `).join('');
    }
  }

  /* ---------- Newsletter form (footer) ---------- */
  const newsletterForm = document.querySelector('.newsletter-row');
  if (newsletterForm) {
    const btn = newsletterForm.querySelector('button');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input.value.trim()) {
        btn.textContent = 'Subscribed';
        input.value = '';
        setTimeout(() => btn.textContent = 'Subscribe', 2500);
      }
    });
  }

});
