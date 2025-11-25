// Dark Mode Toggle
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference or default to system preference
  const getThemePreference = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  
  // Apply theme
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      updateThemeIcon('☀️');
    } else {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      updateThemeIcon('🌙');
    }
  };
  
  // Update theme icon
  const updateThemeIcon = (icon) => {
    if (themeToggle) {
      const iconElement = themeToggle.querySelector('.theme-toggle-icon');
      if (iconElement) {
        iconElement.textContent = icon;
      }
    }
  };
  
  // Initialize theme
  const initTheme = () => {
    const theme = getThemePreference();
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  };
  
  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = body.classList.contains('theme-dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Event listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
  
  // Initialize on load
  initTheme();
})();

// Mobile Navigation Toggle
(function() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Terminal initialization
(function() {
  const terminalBody = document.getElementById('terminal-body');
  if (terminalBody) {
    // Placeholder terminal content
    const terminalContent = `
      <div class="terminal-line">
        <span class="terminal-prompt">$</span>
        <span class="terminal-command">whoami</span>
      </div>
      <div class="terminal-line">
        <span class="ascii-terminal-output">
   —— ——      ————         ———                          
  / // /_    /  _/__ _    / _ \\___ ___ _  _____ ____   <br>
 / _  / /   _/ / /  ' \\  / // / -_) _ \\ |/ / -_) __/  <br>
/_//_/_/ ) /___//_/_/_/ /____/\\__/_//_/___/\\__/_/     <br>
       |/                                             
        </span>
      </div>
      <div class="terminal-line">
        <span class="terminal-prompt">$</span>
        <span class="terminal-command">cat about.txt</span>
      </div>
      <div class="terminal-line">
        <span class="terminal-output">Software Developer | FOX Sports Co-op</span>
      </div>
      <div class="terminal-line">
        <span class="terminal-output">Building scalable apps and solving real problems</span>
      </div>
      <div class="terminal-line">
        <span class="terminal-prompt">$</span>
        <span class="terminal-command">ls projects/</span>
      </div>
      <div class="terminal-line">
        <span class="terminal-output">norse-interview/  park-pulse/</span>
      </div>
      <div class="terminal-line">
        <span class="terminal-prompt">$</span>
        <span class="terminal-command"></span>
        <span class="terminal-cursor"></span>
      </div>
    `;
    terminalBody.innerHTML = terminalContent;
  }
})();

// Navigation scroll effect (home page only)
(function() {
  // Only run on home page
  if (!document.body.classList.contains('home')) return;
  
  const nav = document.querySelector('.nav');
  if (!nav) return;
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  };
  
  // Check initial scroll position
  handleScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);
})();

// Hide project demo placeholders if images don't load
(function() {
  const demoImages = document.querySelectorAll('.project-demo-gif');
  
  demoImages.forEach(img => {
    const demoContainer = img.closest('.project-demo');
    if (!demoContainer) return;
    
    // Hide if image has no src or empty src
    if (!img.src || img.src === window.location.href) {
      demoContainer.style.display = 'none';
      return;
    }
    
    // Hide if image fails to load
    img.addEventListener('error', () => {
      demoContainer.style.display = 'none';
    });
    
    // Also check if image loads successfully
    if (img.complete && img.naturalHeight === 0) {
      demoContainer.style.display = 'none';
    }
  });
})();
