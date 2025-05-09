// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
    initTheme();
    setupAnimations();
    setupFormSubmission();
  });
  
  // Theme Toggle Functionality
  function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    if (storedTheme === 'dark' || (storedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('theme') === 'system') {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }
  
  // Scroll Animations
  function setupAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .skills-grid, .projects-grid, .testimonials-grid, .contact-grid');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      element.classList.add('opacity-0');
      observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      .opacity-0 {
        opacity: 0;
        transform: translateY(20px);
      }
      
      .animate-fade-in {
        animation: fadeIn 0.6s ease forwards;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .project-card, .skill-card, .testimonial-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .project-card:hover, .skill-card:hover, .testimonial-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);
  }
  
  // Form Submission
  function setupFormSubmission() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Simple validation
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
          alert('Please fill in all fields');
          return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate API call
        setTimeout(() => {
          alert('Message sent successfully!');
          contactForm.reset();
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 1500);
      });
    }
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Mobile menu toggle (for smaller screens)
  function setupMobileMenu() {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.setAttribute('aria-label', 'Toggle mobile menu');
    mobileMenuButton.innerHTML = feather.icons.menu.toSvg();
    
    const headerActions = document.querySelector('.header-actions');
    headerActions.parentNode.insertBefore(mobileMenuButton, headerActions);
    
    const nav = document.querySelector('.nav');
    
    mobileMenuButton.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
      
      if (nav.classList.contains('nav-open')) {
        mobileMenuButton.innerHTML = feather.icons.x.toSvg();
      } else {
        mobileMenuButton.innerHTML = feather.icons.menu.toSvg();
      }
    });
    
    // Add CSS for mobile menu
    const style = document.createElement('style');
    style.textContent = `
      .mobile-menu-button {
        display: block;
        background: none;
        border: none;
        color: var(--foreground);
        cursor: pointer;
      }
      
      @media (min-width: 768px) {
        .mobile-menu-button {
          display: none;
        }
      }
      
      @media (max-width: 767px) {
        .nav {
          display: none;
          position: absolute;
          top: var(--header-height);
          left: 0;
          right: 0;
          flex-direction: column;
          background-color: var(--background);
          border-bottom: 1px solid var(--border);
          padding: 1rem;
        }
        
        .nav-open {
          display: flex;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Initialize mobile menu
  document.addEventListener('DOMContentLoaded', setupMobileMenu);

  document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
  
    // Placeholder for additional portfolio JavaScript
    // e.g., theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      // Add dark mode styles in styles.css if needed
    });
  });