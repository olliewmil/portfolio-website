# Oliver Miller — Architectural Portfolio

A professional, responsive portfolio site for Oliver Miller, targeting architecture and engineering firms.

## Quick start

1. **Add Oliver's photo**  
   Place your photo file in the intro section by saving it as:
   - `assets/images/oliver.jpg`  
   (PNG is fine too — then change `oliver.jpg` to `oliver.png` in `index.html`.)

2. **Add project media**  
   - **Videos:** Put video files in `assets/videos/` and reference them in `index.html` (see project sections).
   - **Images:** Put images in `assets/images/` and reference them in the gallery in `index.html`.

3. **Open the site**  
   Double-click `index.html` or open it in a browser. For local development with a simple server:  
   `npx serve .`  
   then visit the URL shown (e.g. http://localhost:3000).

## Folder structure

```
assets/
  images/     ← Oliver's photo + project images
  videos/     ← Project videos
index.html
styles.css
script.js
```

## Customizing projects

- **Project names and descriptions** are in `index.html` inside each `<article class="project">`. Edit the `<h3 class="project-title">` and `<p class="project-desc">` to match your work.
- **Reordering:** Move entire `<article class="project">...</article>` blocks to change project order. The first project is treated as the main highlight (first video is large).
- **Adding/removing media:** Copy or remove `<div class="media-item">` (with `<img>` or `<video>`) blocks inside each project’s `<div class="project-media">`. Use paths like `assets/images/yourfile.jpg` or `assets/videos/yourfile.mp4`.
- **Contact form:** The form is client-side only (shows “Message sent” then resets). To receive emails, use a form service (e.g. Formspree, Netlify Forms) and set the form `action` and `method` in `index.html`.

## Contact info (in the site)

- Phone: 330-780-3909  
- Email: olliewmil@gmail.com  

These are already in the Contact section; update them in `index.html` if they change.
