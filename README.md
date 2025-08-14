# GetUUID

<p align="center">
  <img src="public/favicon.svg" alt="GetUUID Logo" width="100" height="100">
</p>

A minimalist web tool for generating various unique identifiers with history tracking and modern, user-friendly design.

![Landing](/preview/landing.png)

## Features

- **Multiple ID Types**: Generate various unique identifiers:
  - UUID v1 (Time-based UUID that includes the MAC address)
  - UUID v4 (Random UUID with strong uniqueness guarantees)
  - UUID v7 (Time-ordered UUID with improved sortability)
  - ULID (Universally Unique Lexicographically Sortable Identifier)
  - Nano ID (URL-friendly unique string ID generator)

- **Local History**: Automatically saves your generated IDs in browser's localStorage
  - Keeps track of your last 50 generated IDs
  - Easily clear history with a single click

- **User-Friendly Features**:
  - One-click copying to clipboard
  - Visual feedback when IDs are copied
  - Responsive design works on desktop and mobile

## Development

### Prerequisites

- [mise-en-place](https://mise.jdx.dev/)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/abogoyavlensky/getuuid.git
   cd getuuid
   ```

2. Install dependencies:
   ```
   mise trust
   mise install
   npm install
   ```

3. Build project in watch mode and run server:
   ```
   task dev
   ```

Application is started at `http://localhost:8000`.

#### Deploy

```
task build
```

And commit to `master` branch.
Application will be served by GitHub Pages from the root directory of the repository in `master` branch.

##### TODO

- [] Implement cache busting in production build

## Technology Stack

- [Alpine.js](https://alpinejs.dev/) - Lightweight JavaScript framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [UUID](https://github.com/uuidjs/uuid) - RFC-compliant UUID generation
- [ULID](https://github.com/ulid/javascript) - Implementation of the ULID spec
- [Nano ID](https://github.com/ai/nanoid) - Tiny, URL-friendly unique string ID generator

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Works offline once loaded

## Acknowledgments

- Inspired by the need for a simple, fast UUID generator for developers
- Neo-brutalist design inspiration from modern web design trends
