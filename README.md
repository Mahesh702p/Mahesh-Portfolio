# Linux-Inspired Portfolio Website

A modern, professional portfolio that blends Linux aesthetics with accessible web design. Features both traditional scrolling navigation and an optional terminal interface for power users.

## 🎯 Features

- **Dual UX Modes**: Traditional web navigation + terminal command interface
- **Linux-Inspired Design**: Window chrome, config files, package manager metaphors
- **Fully Responsive**: Works on all device sizes
- **Accessible**: WCAG compliant, keyboard navigable, screen reader friendly
- **Zero Dependencies**: Pure vanilla JavaScript (no frameworks)
- **15+ Terminal Commands**: Navigate, explore, and interact via command line

## 🚀 Quick Start

### Run Locally

Using Python:
```bash
python3 -m http.server 8000
```

Using Node.js:
```bash
npx -y serve .
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customization

### 1. Update Your Information

Edit `js/data.js` to customize:
- Profile information (name, title, bio)
- Skills and technologies
- Projects
- Contact details
- Social links

### 2. Replace Resume

Place your resume PDF in `assets/resume.pdf`

### 3. Update Colors (Optional)

Edit CSS custom properties in `styles/index.css`:
```css
:root {
  --accent-blue: hsl(210, 100%, 60%);
  --accent-green: hsl(140, 60%, 55%);
  --accent-orange: hsl(30, 100%, 60%);
  /* ... more colors */
}
```

## 📂 Project Structure

```
portfolio/
├── index.html              # Main HTML structure
├── styles/
│   ├── index.css          # Design system & base styles
│   ├── components.css     # Section-specific styles
│   └── terminal.css       # Terminal overlay styles
├── js/
│   ├── data.js            # Portfolio data (EDIT THIS)
│   ├── commands.js        # Terminal command registry
│   ├── terminal.js        # Terminal functionality
│   ├── ui.js              # UI rendering
│   └── main.js            # App initialization
└── assets/
    └── resume.pdf         # Your resume (REPLACE THIS)
```

## 🖥️ Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Display profile information |
| `ls` | List available sections |
| `cd <section>` | Navigate to a section |
| `skills` | List all skills as packages |
| `projects` | List all projects |
| `contact` | Show contact information |
| `pwd` | Show current section |
| `clear` | Clear terminal output |
| `neofetch` | Display system info (easter egg) |
| `download resume` | Download resume PDF |

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + K**: Toggle terminal minimize/maximize
- **Up/Down arrows**: Navigate command history (in terminal)

## 🎨 Design Features

- **Config File Style**: About section resembles `.config` files
- **Package Manager**: Skills displayed as installed packages
- **Workspace Manager**: Projects shown as tiling windows
- **Draggable Terminal**: Move the terminal anywhere on screen
- **Smooth Animations**: Respects `prefers-reduced-motion`

## 🔧 Technologies

- Pure HTML5, CSS3, JavaScript (ES6+)
- No build tools required
- No external dependencies (except Google Fonts)
- Modern browser features (CSS Grid, CSS Custom Properties, Intersection Observer)

## 📱 Browser Support

- Chrome/Edge (Chromium) ✅
- Firefox ✅
- Safari ✅
- Mobile browsers ✅

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select branch and `/` folder
4. Save and deploy

### Netlify
```bash
# Drag and drop the portfolio folder to Netlify
# Or connect your GitHub repo
```

### Vercel
```bash
vercel --prod
```

## 🎓 Credits

Built by Mahesh Patel - AI & Data Science Student

## 📄 License

Feel free to use this template for your own portfolio. No attribution required.

---

**Tip**: Type `help` in the terminal to see all available commands!
