# Denver Hogan - Portfolio Website

A fresh, bold, and authentic portfolio website built with Hugo and deployed to GitHub Pages.

## Overview

This portfolio showcases my projects, experience, and journey as a software developer. The site features a minimal but impactful design with dark mode support, mobile responsiveness, and optimized performance.

**Live Site:** [hogandenver05.github.io](https://hogandenver05.github.io)

## Features

- **Custom Hugo Theme** - Built from scratch with a focus on typography and visual clarity
- **Dark Mode** - Toggle between light and dark themes with system preference detection
- **Responsive Design** - Mobile-first approach that works beautifully on all devices
- **Social Cards** - Open Graph and Twitter Card support for clean link previews
- **Performance Optimized** - Fast loading times and SEO-friendly structure
- **GitHub Pages Deployment** - Automated deployment via GitHub Actions

## Tech Stack

- **Hugo** - Static site generator
- **HTML/CSS/JavaScript** - Custom theme implementation
- **GitHub Actions** - CI/CD for automated deployment

## Local Development

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended version recommended)
- Git

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/hogandenver05/hogandenver05.github.io.git
   cd hogandenver05.github.io
   ```

2. Start the development server:
   ```bash
   hugo server -D
   ```

3. Open your browser to `http://localhost:1313`

The site will automatically reload when you make changes to content or theme files.

### Building for Production

To build the site for production:

```bash
hugo --minify
```

The generated site will be in the `public/` directory.

## Project Structure

```
.
├── config.toml          # Hugo configuration
├── content/             # Site content (Markdown files)
│   ├── _index.md       # Home page
│   ├── about.md        # About page
│   ├── projects.md     # Projects page
│   └── contact.md      # Contact page
├── themes/
│   └── portfolio-theme/  # Custom theme
│       ├── layouts/     # HTML templates
│       ├── static/      # CSS, JS, images
│       └── archetypes/  # Content templates
└── .github/
    └── workflows/      # GitHub Actions
```

## Content Editing

### Adding a New Page

1. Create a new Markdown file in the `content/` directory:
   ```bash
   hugo new new-page.md
   ```

2. Edit the file with your content using Markdown syntax

3. The page will be available at `/new-page/`

### Editing Existing Pages

Simply edit the Markdown files in the `content/` directory. The site will automatically update when you run `hugo server`.

### Project Cards

To add a new project to the Projects page, edit `content/projects.md` and add a new project card using the existing HTML structure.

## Deployment

### GitHub Pages (Automatic)

The site is automatically deployed to GitHub Pages when you push to the `main` branch. The GitHub Actions workflow handles:

1. Building the Hugo site
2. Deploying to the `gh-pages` branch
3. Making the site live at `hogandenver05.github.io`

### Manual Deployment

If you need to deploy manually:

1. Build the site:
   ```bash
   hugo --minify
   ```

2. Push the `public/` directory to the `gh-pages` branch:
   ```bash
   cd public
   git init
   git add .
   git commit -m "Deploy site"
   git branch -M gh-pages
   git remote add origin https://github.com/hogandenver05/hogandenver05.github.io.git
   git push -u origin gh-pages
   ```

## Customization

### Colors

Edit the CSS variables in `themes/portfolio-theme/static/css/main.css`:

```css
:root {
  --color-accent: #0066FF; /* Electric blue */
  /* ... other colors */
}
```

### Typography

The site uses Inter font from Google Fonts. To change fonts, update the font imports in `themes/portfolio-theme/layouts/partials/head.html` and the CSS variables in `main.css`.

### Navigation

Edit the menu in `config.toml`:

```toml
[menu]
  [[menu.main]]
    identifier = 'home'
    name = 'Home'
    url = '/'
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Email:** hogand6@nku.edu
- **GitHub:** [hogandenver05](https://github.com/hogandenver05)
- **LinkedIn:** [hogandenver05](https://linkedin.com/in/hogandenver05)

