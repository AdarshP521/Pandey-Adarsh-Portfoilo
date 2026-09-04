// Initialize AOS animations
AOS.init({
  duration: 900,
  easing: 'ease-out',
  once: true,
});

const words = [
  "GRAPHIC DESIGNER",
  "UI/UX DESIGNER",
  "FRONT-END DEVELOPER",
  "TECH VIDEO CREATOR",
  "PRODUCT DESIGNER",
  "VIDEO EDITOR",
  "WEB DESIGNER",
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


const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function getScrollBehavior() {
  return prefersReducedMotion.matches ? 'auto' : 'smooth';
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: getScrollBehavior() });
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

// Update on window resize
window.addEventListener('resize', requestScrollUIUpdate);


// Smooth scroll for navigation
function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
  }
}

document.getElementById('nav-home').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: getScrollBehavior() });
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
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: getScrollBehavior() });
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
