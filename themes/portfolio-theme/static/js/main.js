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
  const nav = document.querySelector('.nav');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      // Add class to nav when menu is open (for home page background)
      if (nav) {
        if (navMenu.classList.contains('active')) {
          nav.classList.add('nav-menu-open');
        } else {
          nav.classList.remove('nav-menu-open');
        }
      }
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        if (nav) nav.classList.remove('nav-menu-open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        if (nav) nav.classList.remove('nav-menu-open');
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

// ============================================================================
// INTERACTIVE TERMINAL RESUME
// ============================================================================

/**
 * Base Command Interface (Interface Segregation Principle)
 * All commands must implement execute() and help() methods
 */
class Command {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  execute(args, terminal) {
    throw new Error('execute() must be implemented by subclass');
  }

  help() {
    return this.description;
  }
}

/**
 * Command Registry (Single Responsibility Principle)
 * Manages all available commands in a centralized location
 */
class CommandRegistry {
  constructor() {
    this.commands = new Map();
  }

  register(command) {
    if (!(command instanceof Command)) {
      throw new Error('Command must be an instance of Command class');
    }
    this.commands.set(command.name.toLowerCase(), command);
  }

  get(name) {
    return this.commands.get(name.toLowerCase());
  }

  getAll() {
    return Array.from(this.commands.values());
  }

  has(name) {
    return this.commands.has(name.toLowerCase());
  }

  getMatches(prefix) {
    const lowerPrefix = prefix.toLowerCase();
    return this.getAll().filter(cmd => 
      cmd.name.toLowerCase().startsWith(lowerPrefix)
    );
  }
}

/**
 * Command Implementations (Open/Closed Principle)
 * Each command is a separate class that can be extended without modifying existing code
 */

class HelpCommand extends Command {
  constructor(registry) {
    super('help', 'Display available commands');
    this.registry = registry;
  }

  execute(args, terminal) {
    const commands = this.registry.getAll();
    const output = ['Available commands:', ''];
    commands.forEach(cmd => {
      output.push(`  ${cmd.name.padEnd(12)} - ${cmd.help()}`);
    });
    return output;
  }
}

class WhoamiCommand extends Command {
  constructor() {
    super('whoami', 'Display information about me');
  }

  execute(args, terminal) {
    return [
      '<ascii-art>',
      '   —— ——      ————         ———                          ',
      '  / // /_    /  _/__ _    / _ \\___ ___ _  _____ ____   <br>',
      ' / _  / /   _/ / /  \' \\  / // / -_) _ \\ |/ / -_) __/  <br>',
      '/_//_/_/ ) /___//_/_/_/ /____/\\__/_//_/___/\\__/_/     <br>',
      '       |/                                             ',
      '</ascii-art>',
      'Building scalable apps and solving real problems',
      'Type "help" to see available commands'
    ];
  }
}

class AboutCommand extends Command {
  constructor() {
    super('about', 'Learn about my background and journey');
  }

  execute(args, terminal) {
    return [
      'I\'m Denver Hogan, a software developer with a passion for building',
      'applications that make a difference. Currently, I\'m working as a',
      'Software Developer Co-op at FOX Sports, where I\'m enhancing products',
      'that serve over 10 million sports fans while learning the full lifecycle',
      'of software development.',
      '',
      'My journey in software development started with a curiosity about how',
      'things work, from cars to relationships, and how software can solve real',
      'problems. This curiosity led me to pursue a B.S. in Applied Software',
      'Engineering with a minor in Information Security at Northern Kentucky',
      'University, where I\'ve maintained a 3.7 GPA while balancing coursework,',
      'co-op experience, leadership roles, and life.',
      '',
      'Type "skills" to see my technical skills,',
      'or "experience" to learn about my work experience.'
    ];
  }
}

class SkillsCommand extends Command {
  constructor() {
    super('skills', 'Display my technical skills');
  }

  execute(args, terminal) {
    return [
      'Languages:',
      '  Kotlin, Java, Python, JavaScript, HTML/CSS, XML, PHP, Swift, C, SQL, TypeScript',
      '',
      'Core Concepts:',
      '  Agile/Scrum, Test-Driven Development, Design Patterns,',
      '  Software Engineering Architecture, REST APIs, MVVM, OOP',
      '',
      'Tools & Technologies:',
      '  Android Studio, VSCode, Xcode, Git, Jira, Linux CLI,',
      '  Node.js, Docker, MongoDB, Charles Proxy'
    ];
  }
}

class ExperienceCommand extends Command {
  constructor() {
    super('experience', 'Display my work experience');
  }

  execute(args, terminal) {
    return [
      'Software Developer Co-op | FOX Sports',
      '  • Enhancing products that serve over 10 million sports fans',
      '  • Learning the full lifecycle of software development',
      '  • Working with large codebases and production systems',
      '',
      'Resident Assistant | Northern Kentucky University (Aug 2024 - Aug 2025)',
      '  • Planned and hosted 15+ educational and social programs',
      '  • Responded to safety incidents and student crises',
      '  • Managed comprehensive documentation systems',
      '  • Maintained 3.7 GPA while fulfilling 24/7 on-call responsibilities',
      '',
      'Leadership Roles | Sigma Phi Epsilon Fraternity (Sep 2023 - Present)',
      '  • Head of Recruitment - Led comprehensive recruitment strategy',
      '  • Sound Body Chairman - Designed wellness programming',
      '  • IFC Standards Chairman - Enforced conduct standards'
    ];
  }
}

class ProjectsCommand extends Command {
  constructor() {
    super('projects', 'List my projects');
  }

  execute(args, terminal) {
    return [
      'fox-sports-app/',
      'time-budget/',
      'park-pulse/',
      'eato/',
      'tetris-boom/',
      'norse-interview/',
      'sustainiac/',
      'darcy-shack/',
      '',
      'Visit /projects/ to see detailed information about each project.'
    ];
  }
}

class ContactCommand extends Command {
  constructor() {
    super('contact', 'Display contact information');
  }

  execute(args, terminal) {
    return [
      'Email: hogand6@nku.edu',
      'Phone: (859) 444-8279',
      'GitHub: github.com/hogandenver05',
      'LinkedIn: linkedin.com/in/hogandenver05',
      '',
      'Visit /contact/ for more ways to reach me.'
    ];
  }
}

class ClearCommand extends Command {
  constructor() {
    super('clear', 'Clear the terminal screen');
  }

  execute(args, terminal) {
    terminal.clear();
    return [];
  }
}

/**
 * Terminal Controller (Single Responsibility Principle)
 * Manages terminal UI, input handling, and command execution
 */
class TerminalController {
  constructor(terminalBody, registry) {
    this.terminalBody = terminalBody;
    this.registry = registry;
    this.history = [];
    this.historyIndex = -1;
    this.currentInput = '';
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    
    // Display welcome message
    this.addWelcomeMessage();
    
    // Create input line
    this.createInputLine();
    
    // Focus terminal on click
    this.terminalBody.addEventListener('click', () => this.focusInput());
    
    // Handle keyboard events
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    
    this.isInitialized = true;
    this.focusInput();
  }

  addWelcomeMessage() {
    // Show whoami command output
    this.addCommandLine('whoami');
    
    // Add ASCII art output
    this.addOutputLine('<ascii-art>');
    this.addOutputLine('   —— ——      ————         ———                          ');
    this.addOutputLine('  / // /_    /  _/__ _    / _ \\___ ___ _  _____ ____   <br>');
    this.addOutputLine(' / _  / /   _/ / /  \' \\  / // / -_) _ \\ |/ / -_) __/  <br>');
    this.addOutputLine('/_//_/_/ ) /___//_/_/_/ /____/\\__/_//_/___/\\__/_/     <br>');
    this.addOutputLine('       |/                                             ');
    this.addOutputLine('</ascii-art>');
    
    // Add text output
    this.addOutputLine('Building scalable apps and solving real problems');
    this.addOutputLine('Type "help" to see available commands');
  }

  createInputLine() {
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-line terminal-input-line';
    inputLine.innerHTML = `
      <span class="terminal-prompt">$</span>
      <span class="terminal-command-input" contenteditable="true" spellcheck="false"></span>
      <span class="terminal-cursor"></span>
    `;
    this.terminalBody.appendChild(inputLine);
    this.inputElement = inputLine.querySelector('.terminal-command-input');
    this.cursorElement = inputLine.querySelector('.terminal-cursor');
    
    // Detect typing to pause cursor blink
    this.typingTimeout = null;
    this.inputElement.addEventListener('input', () => this.handleTyping());
    this.inputElement.addEventListener('keydown', () => this.handleTyping());
  }

  handleTyping() {
    // Add class to stop blinking while typing
    if (this.cursorElement) {
      this.cursorElement.classList.add('typing');
    }
    
    // Clear existing timeout
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    
    // Remove class after user stops typing (500ms delay)
    this.typingTimeout = setTimeout(() => {
      if (this.cursorElement) {
        this.cursorElement.classList.remove('typing');
      }
    }, 500);
  }

  focusInput() {
    if (this.inputElement) {
      this.inputElement.focus();
      // Move cursor to end
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(this.inputElement);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  handleKeyDown(e) {
    // Only handle if input element is focused
    if (!this.inputElement || document.activeElement !== this.inputElement) {
      return;
    }

    const inputText = this.inputElement.textContent.trim();

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        this.executeCommand(inputText);
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        this.navigateHistory(-1);
        break;
      
      case 'ArrowDown':
        e.preventDefault();
        this.navigateHistory(1);
        break;
      
      case 'Tab':
        e.preventDefault();
        this.handleAutocomplete(inputText);
        break;
      
      case 'Escape':
        e.preventDefault();
        this.clearInput();
        break;
      
      default:
        // Update current input for autocomplete
        this.currentInput = inputText;
        break;
    }
  }

  navigateHistory(direction) {
    if (this.history.length === 0) return;

    if (direction === -1) {
      // Up arrow - go back in history
      if (this.historyIndex === -1) {
        this.historyIndex = this.history.length - 1;
      } else if (this.historyIndex > 0) {
        this.historyIndex--;
      }
    } else {
      // Down arrow - go forward in history
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
      } else {
        this.historyIndex = -1;
        this.clearInput();
        return;
      }
    }

    if (this.historyIndex >= 0) {
      this.inputElement.textContent = this.history[this.historyIndex];
      this.focusInput();
    }
  }

  handleAutocomplete(inputText) {
    if (!inputText) {
      // Show all commands if input is empty
      const commands = this.registry.getAll().map(cmd => cmd.name).join(' ');
      this.addOutputLine(`Available commands: ${commands}`);
      this.scrollToBottom();
      return;
    }

    const matches = this.registry.getMatches(inputText);
    
    if (matches.length === 0) {
      return;
    } else if (matches.length === 1) {
      // Single match - autocomplete
      this.inputElement.textContent = matches[0].name;
      this.focusInput();
    } else {
      // Multiple matches - show options
      const commandNames = matches.map(cmd => cmd.name).join(' ');
      this.addOutputLine(`Possible completions: ${commandNames}`);
      this.scrollToBottom();
    }
  }

  executeCommand(inputText) {
    if (!inputText) {
      this.addCommandLine('');
      this.scrollToBottom();
      return;
    }

    // Add to history
    if (this.history.length === 0 || this.history[this.historyIndex] !== inputText) {
      this.history.push(inputText);
      if (this.history.length > 50) {
        this.history.shift();
      }
    }
    this.historyIndex = -1;

    // Display command
    this.addCommandLine(inputText);

    // Parse command and arguments
    const parts = inputText.trim().split(/\s+/);
    const commandName = parts[0];
    const args = parts.slice(1);

    // Execute command
    const command = this.registry.get(commandName);
    if (command) {
      const output = command.execute(args, this);
      if (Array.isArray(output) && output.length > 0) {
        output.forEach(line => this.addOutputLine(line));
      }
    } else {
      this.addOutputLine(`Command not found: ${commandName}. Type "help" for available commands`);
    }

    // Clear input and scroll
    this.clearInput();
    this.scrollToBottom();
  }

  addCommandLine(command) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `
      <span class="terminal-prompt">$</span>
      <span class="terminal-command">${this.escapeHtml(command)}</span>
    `;
    this.terminalBody.insertBefore(line, this.terminalBody.querySelector('.terminal-input-line'));
  }

  addOutputLine(text) {
    // Handle special ASCII art markers
    if (text === '<ascii-art>') {
      this.asciiArtBuffer = [];
      return;
    }
    
    if (text === '</ascii-art>') {
      // Create ASCII art output
      const line = document.createElement('div');
      line.className = 'terminal-line';
      // Join lines with newline - CSS white-space: pre will preserve formatting
      // and <br> tags within lines will be rendered as HTML
      const asciiContent = this.asciiArtBuffer.join('\n');
      line.innerHTML = `<span class="ascii-terminal-output">${asciiContent}</span>`;
      this.terminalBody.insertBefore(line, this.terminalBody.querySelector('.terminal-input-line'));
      this.asciiArtBuffer = null;
      return;
    }
    
    if (this.asciiArtBuffer) {
      // Collecting ASCII art lines
      this.asciiArtBuffer.push(text);
      return;
    }
    
    // Regular output line
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    if (text.includes('<br>') || text.match(/^[\s\S]*──/)) {
      // ASCII art or formatted text (legacy support)
      line.innerHTML = `<span class="ascii-terminal-output">${text}</span>`;
    } else {
      // Handle empty lines - use non-breaking space to ensure they render
      const displayText = text === '' ? '\u00A0' : this.escapeHtml(text);
      line.innerHTML = `<span class="terminal-output">${displayText}</span>`;
    }
    
    this.terminalBody.insertBefore(line, this.terminalBody.querySelector('.terminal-input-line'));
  }

  clear() {
    const inputLine = this.terminalBody.querySelector('.terminal-input-line');
    if (!inputLine) return;
    
    const lines = this.terminalBody.querySelectorAll('.terminal-line:not(.terminal-input-line)');
    lines.forEach(line => line.remove());
    this.scrollToBottom();
  }

  clearInput() {
    if (this.inputElement) {
      this.inputElement.textContent = '';
      this.currentInput = '';
    }
  }

  scrollToBottom() {
    this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Terminal initialization
(function() {
  function initTerminal() {
    const terminalBody = document.getElementById('terminal-body');
    if (!terminalBody) return;

    // Create command registry
    const registry = new CommandRegistry();

    // Register all commands
    registry.register(new HelpCommand(registry));
    registry.register(new WhoamiCommand());
    registry.register(new AboutCommand());
    registry.register(new SkillsCommand());
    registry.register(new ExperienceCommand());
    registry.register(new ProjectsCommand());
    registry.register(new ContactCommand());
    registry.register(new ClearCommand());

    // Create and initialize terminal controller
    const terminal = new TerminalController(terminalBody, registry);
    terminal.init();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminal);
  } else {
    initTerminal();
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
