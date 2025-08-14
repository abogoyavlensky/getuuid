# GetUUID - Project Summary

## Overview
GetUUID is a minimalist web application for generating various types of unique identifiers. It's a single-page application built with modern web technologies, featuring a neo-brutalist design aesthetic and client-side functionality for generating UUIDs, ULIDs, and Nano IDs with history tracking.

**Live Site:** https://getuuid.top/  
**Repository:** https://github.com/abogoyavlensky/getuuid

## Key Features
- Generate multiple ID formats: UUID v1, v4, v7, ULID, and Nano ID
- One-click copying to clipboard with visual feedback
- Local history tracking (stores last 50 generated IDs in localStorage)
- Responsive design with neo-brutalist styling
- Offline functionality once loaded
- Event tracking with Umami analytics

## Architecture

### Technology Stack
- **Frontend Framework:** Alpine.js 3.14.9 (lightweight reactivity)
- **CSS Framework:** Tailwind CSS 4.1.4 (utility-first styling)
- **Build Tools:** 
  - esbuild 0.25.2 (JavaScript bundling)
  - Tailwind CLI (CSS compilation)
- **Task Runner:** Taskfile (Go Task) for development workflow
- **ID Generation Libraries:**
  - uuid 11.1.0 (UUID v1, v4, v7)
  - ulid 3.0.0 (ULID generation)
  - nanoid 5.1.5 (Nano ID generation)

### File Structure
```
/
├── index.html              # Main HTML file with Alpine.js app
├── public/
│   ├── input.js            # Source JavaScript (Alpine.js component)
│   ├── output.js           # Bundled JavaScript (generated)
│   ├── input.css           # Source CSS (Tailwind)
│   ├── output.css          # Compiled CSS (generated)
│   ├── favicon.svg         # Site favicon
│   ├── icon.png            # App icon
│   └── og-image.png        # Social media preview image
├── package.json            # Node.js dependencies and scripts
├── Taskfile.yaml          # Task definitions for development
└── README.md              # Project documentation
```

## Core Components

### Main Application (`public/input.js`)
The application is built as a single Alpine.js component (`uuidGenerator`) with the following key methods:

- `init()` - Loads history from localStorage and generates initial UUID
- `generateUuid()` - Generates IDs based on selected type with error handling
- `selectType(type)` - Changes ID type and regenerates
- `copyToClipboard(text, buttonId)` - Copies to clipboard with visual feedback
- `addToHistory(uuid, type)` - Adds generated ID to history (max 50 items)
- `clearHistory()` - Clears localStorage and history array

### Supported ID Types
1. **UUID v1:** Time-based with MAC address
2. **UUID v4:** Random UUID (most common)
3. **UUID v7:** Time-ordered with improved sortability
4. **ULID:** Universally Unique Lexicographically Sortable Identifier
5. **Nano ID:** Tiny, URL-friendly unique string

### UI Components
- Main generator with copy functionality
- Type selector buttons with active state
- History panel with individual copy buttons
- About modal with project information
- Responsive neo-brutalist design elements

## Development Workflow

### Prerequisites
- mise-en-place (for environment management)
- Node.js (managed by mise)

### Available Commands
```bash
# Development (watches files and starts server)
task dev

# Production build
task build

# Individual tasks
npm run build-js      # Bundle JavaScript
npm run watch-js      # Watch JavaScript
npm run build-css     # Compile CSS
npm run watch-css     # Watch CSS
```

### Development Server
- Local server runs on `http://localhost:8000`
- Uses Python's built-in HTTP server
- Supports hot reloading via watch tasks

## Build Process
1. **JavaScript:** esbuild bundles `public/input.js` → `public/output.js` (minified)
2. **CSS:** Tailwind CLI compiles `public/input.css` → `public/output.css` (minified)
3. **Deployment:** Commit to master branch for GitHub Pages deployment

## Styling Conventions

### Neo-Brutalist Design System
```css
.neo-brutal {
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.8);
}

.neo-brutal-sm {
  border: 2px solid black;
  border-radius: 6px;
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.8);
  transition: all 0.2s ease;
}
```

### Color Palette
- Primary: #ff6b6b (coral red)
- Secondary: #4ecdc4 (teal)
- Dark: #292f36
- Light: #f7fff7

## Data Management
- **Storage:** Browser localStorage only
- **History Limit:** 50 most recent generated IDs
- **Data Structure:** `[{uuid: string, type: string}]`
- **Persistence:** Automatic save/load on app initialization

## Analytics & Monitoring
- Umami analytics integration (only on production domain)
- Event tracking for user interactions:
  - `generate` - UUID generation
  - `copy-btn` - Copy button clicks
  - `copy-click` - Direct text clicks
  - `clear-history` - History clearing
  - `about` - About modal opening

## Extension Points

### Adding New ID Types
1. Add library to `package.json`
2. Import in `public/input.js`
3. Add type to `uuidTypes` array
4. Implement generation case in `generateUuid()`
5. Add description in `getTypeDescription()`

### UI Enhancements
- Modify Alpine.js component in `public/input.js`
- Update HTML structure in `index.html`
- Add styles to `public/input.css` using Tailwind classes

### Build Customizations
- Extend `package.json` scripts
- Modify `Taskfile.yaml` for new tasks
- Configure esbuild or Tailwind options

## Deployment
- **Platform:** GitHub Pages
- **Branch:** master
- **Domain:** Custom domain via CNAME file
- **Build:** Manual build process before commit
- **Cache Busting:** Manual version parameters (TODO: automate)

## Security Considerations
- No server-side processing
- No external API calls
- Client-side only ID generation
- No sensitive data storage
- HTTPS enforced in production

## Performance Characteristics
- **Bundle Size:** Minimal (Alpine.js + ID generation libraries)
- **Load Time:** Fast initial load
- **Offline Support:** Full functionality once cached
- **Memory Usage:** Limited by 50-item history cap
- **Client-Side Only:** No server dependencies