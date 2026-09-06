// Initialize AOS animations
AOS.init({
  duration: 900,
  easing: 'ease-out',
  once: true,
});

const words = [
  "UI/UX DESIGNER",
  "SOFTWARE DEVELOPER",
  "TECH CONTENT CREATOR",
  "SAAS APP DEVELOPER",
  "GRAPHIC DESIGNER",
  "VIDEO EDITOR",
  "CSE ENGINEER",
];
const dynamicText = document.getElementById("dynamic-text");

let index = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[index];
  if (isDeleting) {
    dynamicText.textContent = currentWord.substring(0, charIndex);
    charIndex--;
  } else {
    dynamicText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    // Pause before deleting
    isDeleting = true;
    setTimeout(typeEffect, 1000); // Back delay: 1000ms
    return;
  } else if (isDeleting && charIndex === 0) {
    // Move to the next word
    isDeleting = false;
    index = (index + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 80 : 100); // Back speed: 80ms, Type speed: 100ms
}

typeEffect();

const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
  if (cursorDot) {
    cursorDot.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate progress bars
        const progressBars = entry.target.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
          bar.classList.remove('animate');
          void bar.offsetWidth;
          bar.classList.add('animate');
        });

        // Animate numbers
        const numbers = entry.target.querySelectorAll('.skill-header span:last-child');
        numbers.forEach(number => {
          number.classList.remove('animate-number');
          void number.offsetWidth;
          number.classList.add('animate-number');
          
          // Animate the number counting up
          const targetValue = parseInt(number.textContent);
          let startValue = 0;
          const duration = 2000;
          const increment = targetValue / (duration / 16);
          
          const animateCount = () => {
            startValue += increment;
            if (startValue < targetValue) {
              number.textContent = Math.round(startValue) + '%';
              requestAnimationFrame(animateCount);
            } else {
              number.textContent = targetValue + '%';
            }
          };
          
          animateCount();
        });
      }
    });
  }, {
    threshold: 0.2
  });

  // Observe the skills container
  const skillsContainer = document.querySelector('.skills-container');
  if (skillsContainer) {
    observer.observe(skillsContainer);
  }
});


function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ===== CARD HOVER EFFECTS =====
document.addEventListener('DOMContentLoaded', function() {
  // Card hover effects
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// ===== EXPERIENCE TIMELINE =====
document.addEventListener('DOMContentLoaded', function() {
  const experienceSection = document.querySelector('.experience-section');
  const timeline = document.querySelector('.timeline');
  const timelineItems = timeline ? [...timeline.querySelectorAll('.timeline-item')] : [];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!experienceSection || !timeline || !timelineItems.length) {
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealObserver.observe(experienceSection);
  timelineItems.forEach(item => revealObserver.observe(item));

  let targetProgress = 0;
  let displayedProgress = 0;
  let animationFrame = null;

  function getTimelineProgress() {
    const timelineRect = timeline.getBoundingClientRect();
    const viewportAnchor = window.innerHeight * 0.55;
    const progress = (viewportAnchor - timelineRect.top) / timelineRect.height;
    return Math.min(Math.max(progress, 0), 1);
  }

  function updateCurrentItem() {
    const viewportAnchor = window.innerHeight * 0.55;
    timelineItems.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      item.classList.toggle(
        'is-current',
        itemRect.top <= viewportAnchor && itemRect.bottom >= viewportAnchor
      );
    });
  }

  function animateTimeline() {
    const easing = 0.16;
    displayedProgress += (targetProgress - displayedProgress) * easing;
    timeline.style.setProperty(
      '--timeline-progress',
      displayedProgress
    );
    updateCurrentItem();

    if (Math.abs(targetProgress - displayedProgress) > 0.001) {
      animationFrame = requestAnimationFrame(animateTimeline);
    } else {
      displayedProgress = targetProgress;
      timeline.style.setProperty('--timeline-progress', displayedProgress);
      animationFrame = null;
    }
  }

  function updateTimelineProgress() {
    targetProgress = getTimelineProgress();

    if (prefersReducedMotion.matches) {
      displayedProgress = targetProgress;
      timeline.style.setProperty('--timeline-progress', displayedProgress);
      updateCurrentItem();
      return;
    }

    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animateTimeline);
    }
  }

  updateTimelineProgress();
  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  window.addEventListener('resize', updateTimelineProgress);
});

// ===== SCROLL INDICATOR =====
function updateScrollIndicator() {
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    // Ensure the percentage doesn't exceed 100%
    const clampedPercent = Math.min(Math.max(scrollPercent, 0), 100);
    
    scrollIndicator.style.setProperty('--scroll-progress', clampedPercent / 100);
    
    // Add a class when scrolling to enable smooth transitions
    if (scrollTop > 0) {
      scrollIndicator.classList.add('scrolling');
    } else {
      scrollIndicator.classList.remove('scrolling');
    }
  }
}

// Keep scroll-driven UI updates in one animation frame to avoid layout work on
// every native scroll event.
let ticking = false;
function updateScrollUI() {
  updateScrollIndicator();

  const btn = document.querySelector('.back-to-top');
  if (btn) {
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
    btn.classList.toggle('show', isAtBottom);
  }

  ticking = false;
}

function requestScrollUIUpdate() {
  if (!ticking) {
    requestAnimationFrame(updateScrollUI);
    ticking = true;
  }
}

document.addEventListener('DOMContentLoaded', updateScrollUI);
window.addEventListener('scroll', requestScrollUIUpdate, { passive: true });

const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
  backToTopButton.addEventListener('click', scrollToTop);
}

// Update on window resize
window.addEventListener('resize', requestScrollUIUpdate);


// Smooth scroll for navigation
function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

document.getElementById('nav-home').addEventListener('click', function(e) {
  e.preventDefault();
  scrollToTop();
});
document.getElementById('nav-about').addEventListener('click', function(e) {
  e.preventDefault();
  scrollToSection('.Aboutme');
});
document.getElementById('nav-skills').addEventListener('click', function(e) {
  e.preventDefault();
  scrollToSection('.Skill');
});
document.getElementById('nav-projects').addEventListener('click', function(e) {
  e.preventDefault();
  scrollToSection('.featured');
});
document.getElementById('nav-contact').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  });
});
// Resume link is direct download, no scroll needed


function updateClock() {
    const now = new Date();
    
    const time = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const date = now.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = date;
}

// Initialize clock
updateClock();
setInterval(updateClock, 1000);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault(); // <-- Stops browser from opening a new 404 URL!

      const url = link.getAttribute('href');
      if (typeof loadContent === 'function') {
        await loadContent(url);
      } else {
        console.warn('loadContent is not defined for .project-link:', url);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const certificateGrid = document.querySelector('.certificates-grid');
  if (!certificateGrid) return;

  const certificates = Array.from(certificateGrid.children);
  certificates.forEach((certificate) => {
    const duplicate = certificate.cloneNode(true);
    duplicate.setAttribute('aria-hidden', 'true');
    certificateGrid.appendChild(duplicate);
  });
});


// animnin bg

const canvas = document.getElementById('galaxy-canvas');
const ctx    = canvas.getContext('2d');
let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;

let mouseX = W / 2, mouseY = H / 2;
let mTX    = W / 2, mTY    = H / 2;

window.addEventListener('mousemove', e => { mTX = e.clientX; mTY = e.clientY; });
window.addEventListener('resize', () => {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initStars();
});

/* ── Stars ── */
const STAR_COUNT = 300;
let stars = [];

class Star {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.z     = Math.random() * 1.5 + 0.2;
    this.r     = Math.random() * 1.6 + 0.4;
    this.base  = Math.random() * 0.7 + 0.2;
    this.a     = this.base;
    this.speed = Math.random() * 0.02 + 0.005;
    this.phase = Math.random() * Math.PI * 2;
    const c = ['255,255,255','200,220,255','180,200,255','230,210,255','160,240,255'];
    this.col = c[Math.floor(Math.random() * c.length)];
  }
  update() {
    this.phase += this.speed;
    this.a = Math.min(1, Math.max(0.1, this.base + Math.sin(this.phase) * 0.25));
    this.x = (this.x + (mouseX - W / 2) * 0.0003 * this.z + W) % W;
    this.y = (this.y + (mouseY - H / 2) * 0.0003 * this.z + H) % H;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * this.z, 0, Math.PI * 2);
    ctx.fillStyle   = `rgba(${this.col},${this.a})`;
    ctx.shadowBlur  = this.r > 1.2 ? 8 : 0;
    ctx.shadowColor = `rgba(${this.col},.8)`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

/* ── Shooting Stars ── */
class Meteor {
  constructor() { this.reset(); }
  reset() {
    this.x    = Math.random() * W * 1.2;
    this.y    = Math.random() * H * 0.4;
    this.len  = Math.random() * 80 + 50;
    this.spd  = Math.random() * 8 + 5;
    this.ang  = Math.PI / 4 + (Math.random() * 0.2 - 0.1);
    this.op   = 1;
    this.on   = false;
    this.wait = Math.random() * 300 + 120;
  }
  update() {
    if (!this.on) { if (--this.wait <= 0) this.on = true; return; }
    this.x  -= Math.cos(this.ang) * this.spd;
    this.y  += Math.sin(this.ang) * this.spd;
    this.op -= 0.015;
    if (this.op <= 0 || this.x < -100 || this.y > H + 100) this.reset();
  }
  draw() {
    if (!this.on || this.op <= 0) return;
    const tx = this.x + Math.cos(this.ang) * this.len;
    const ty = this.y - Math.sin(this.ang) * this.len;
    const g  = ctx.createLinearGradient(this.x, this.y, tx, ty);
    g.addColorStop(0,   `rgba(255,255,255,${this.op})`);
    g.addColorStop(0.3, `rgba(168,85,247,${this.op * 0.6})`);
    g.addColorStop(1,   'transparent');
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(tx, ty);
    ctx.strokeStyle = g;
    ctx.lineWidth   = 1.6;
    ctx.lineCap     = 'round';
    ctx.stroke();
  }
}

function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());
}
initStars();

const meteors = [new Meteor(), new Meteor()];

function loop() {
  mouseX += (mTX - mouseX) * 0.05;
  mouseY += (mTY - mouseY) * 0.05;
  ctx.clearRect(0, 0, W, H);
  stars.forEach(s  => { s.update(); s.draw(); });
  meteors.forEach(m => { m.update(); m.draw(); });
  requestAnimationFrame(loop);
}
loop();
