// Initialize AOS animations
AOS.init({
  duration: 5000,
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
  cursorDot.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
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


// Show/hide back-to-top button only at the end of the page
window.addEventListener('scroll', function() {
  const btn = document.querySelector('.back-to-top');
  // Check if user is at the bottom (with a small threshold for mobile)
  if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10)) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
});

// Smooth scroll to top
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

// ===== SCROLL INDICATOR =====
function updateScrollIndicator() {
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Ensure the percentage doesn't exceed 100%
    const clampedPercent = Math.min(Math.max(scrollPercent, 0), 100);
    
    scrollIndicator.style.setProperty('--scroll-width', clampedPercent + '%');
    
    // Add a class when scrolling to enable smooth transitions
    if (scrollTop > 0) {
      scrollIndicator.classList.add('scrolling');
    } else {
      scrollIndicator.classList.remove('scrolling');
    }
  }
}

// Initialize scroll indicator on page load
document.addEventListener('DOMContentLoaded', function() {
  updateScrollIndicator();
});

// Update scroll indicator on scroll with throttling for better performance
let ticking = false;
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateScrollIndicator);
    ticking = true;
  }
}

window.addEventListener('scroll', function() {
  ticking = false;
  requestTick();
});

// Update on window resize
window.addEventListener('resize', updateScrollIndicator);


// Smooth scroll for navigation
function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

document.getElementById('nav-home').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});
// Resume link is direct download, no scroll needed

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZQCFX6GL92"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZQCFX6GL92');
</script>