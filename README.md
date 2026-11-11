# Urban Threads – WEDE5020 Web Development Project

**Student:** WEDE5020 Student  
**Module:** WEDE5020 – Web Development  
**Institution:** [Your Institution Name]  
**Project:** Streetwear E-Commerce Website  
**Live URL:** [Deploy link to be added after deployment]

---

## Project Overview

Urban Threads is a fictional South African streetwear brand. This project is a multi-page website built as part of the WEDE5020 module, demonstrating skills in HTML5, CSS3, JavaScript (ES6+), SEO best practices, form validation, and interactive DOM manipulation.

---

## Project Structure

```
WEDE5020/
│
├── index.html          – Home page (hero, featured products, gallery, tabs, accordion, FAQ)
├── about.html          – About page (brand story, mission/vision tabs, values accordion)
├── products.html       – Products page (dynamic grid, search/filter/sort, gallery, size guide)
├── enquiry.html        – Enquiry page (form with JS validation + dynamic price/availability response)
├── contact.html        – Contact page (form with mailto, Leaflet map, store info)
├── robots.txt          – SEO: instructs search engine crawlers
├── sitemap.xml         – SEO: lists all pages for search engine indexing
│
├── css/
│   └── style.css       – Main stylesheet (CSS variables, responsive design, all components)
│
├── js/
│   └── main.js         – Main JavaScript file (all interactivity and validation)
│
└── images/
    ├── product1.jpg    – Graphic T-Shirt
    ├── product2.jpg    – Oversized Hoodie
    ├── product3.jpg    – Snapback Cap
    ├── product4.jpg    – Logo T-Shirt
    ├── product5.jpg    – Zip Hoodie
    └── product6.jpg    – Crossbody Bag
```

---

## Features Implemented

### Part 1 – HTML Foundation
- Semantic HTML5 structure on all pages (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Five HTML pages: `index.html`, `about.html`, `products.html`, `enquiry.html`, `contact.html`
- Navigation linking all pages consistently
- Product images with descriptive `alt` attributes
- Internal linking between pages

### Part 2 – CSS Styling
- External stylesheet (`css/style.css`)
- CSS custom properties (variables) for consistent colour scheme and tokens
- Google Fonts: Montserrat (headings) and Open Sans (body)
- Responsive design with CSS Grid, Flexbox, and media queries (desktop, tablet, mobile)
- Hover effects and CSS transitions on cards, buttons, and navigation
- Sticky header with gold border accent
- Product card grid layout
- Form styling for enquiry and contact pages

### Part 3 – Functionality, Interactivity & SEO

#### 2.1 Interactive Elements
- **Accordion** – FAQ and values sections on `index.html`, `about.html`, and `enquiry.html`. Fully accessible with ARIA attributes, keyboard-navigable, smooth open/close animation.
- **Tabs** – Used on `index.html` (Why Urban Threads), `about.html` (Who We Are), and `products.html` (Delivery & Returns). Keyboard-navigable with arrow keys.
- **Modal** – Modal component built and ready for use across the site (data-modal-target attribute-driven).
- **Lightbox Gallery** – Gallery grids on `index.html` and `products.html`. Click any product image to open a full-screen lightbox with previous/next navigation and keyboard support (arrow keys + Escape).
- **CSS & JS Animations** – Scroll-reveal animations using `IntersectionObserver` on sections. CSS hover transitions on product cards, buttons, and navigation links.
- **Interactive Map** – Leaflet.js map on `contact.html` showing the fictional store location in Johannesburg with a custom popup marker.

#### 2.2 Dynamic Content
- **Dynamic Product Loading** – All 6 products are loaded from a JavaScript data array and rendered into `#product-grid` as HTML cards with badges, descriptions, and prices.
- **Search Functionality** – Live search input on `index.html` and `products.html` filters products in real time (debounced to 300ms for performance).
- **Filter & Sort** – Dropdown filters by category (T-Shirts, Hoodies, Accessories) and sort by price (low/high) or name (A–Z). Product count updates dynamically.
- **Add to Cart** – Cart functionality with localStorage persistence. Cart item count shown in the navigation bar.
- **Toast Notifications** – Non-blocking toast messages confirm user actions (e.g., adding to cart, form submission).

#### 3. Search Engine Optimisation (SEO)

**On-Page SEO:**
- Unique, keyword-rich `<title>` tags on every page
- Descriptive `<meta name="description">` on every page
- `<meta name="keywords">` tags
- Canonical URL tags (`<link rel="canonical">`)
- Semantic heading hierarchy (H1 → H2 → H3)
- Descriptive `alt` attributes on all images
- `loading="lazy"` on below-the-fold images for performance
- Mobile-friendly responsive design

**Social / Off-Page SEO:**
- Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) on all pages
- Twitter Card meta tags on all pages
- Social media links in the footer

**Additional SEO Requirements:**
- `robots.txt` – Instructs crawlers to index all public pages and exclude private directories
- `sitemap.xml` – Comprehensive sitemap with `<lastmod>`, `<changefreq>`, and `<priority>` for all five pages
- Internal linking throughout the site
- Performance: external fonts loaded with `preconnect`, images use `loading="lazy"`

#### 4. Form Functionality and Validation

**enquiry.html:**
- Fields: Full Name, Email, Phone, Product/Service (dropdown), Message
- HTML5 `required`, `minlength`, `maxlength`, `pattern` attributes
- JavaScript client-side validation on submission and live feedback on `blur`
- Validation rules: name pattern, email regex, SA phone number format (`0821234567` / `+27821234567`), message length
- Error messages displayed inline, next to the relevant field, with ARIA `role="alert"`
- Dynamic response: on valid submission, displays a table showing product price, availability, and delivery time without a page reload

**contact.html:**
- Fields: Full Name, Email, Phone (optional), Message Type (select), Message
- Same JavaScript validation approach
- Character counter on the message textarea (live update)
- On valid submission: compiles all fields into a pre-formatted `mailto:` URI and opens the user's default email client, addressed to `info@urbanthreads.co.za`
- Form submission does not require a server – works entirely client-side

#### 5. Accessibility
- All interactive elements are keyboard-navigable
- ARIA roles and attributes on tabs, accordion, modals, lightbox, and form fields
- Skip-to-content link (`.sr-only` utility)
- `aria-current="page"` on the active navigation link
- `aria-live` regions for dynamic content (product count, enquiry response, toast notifications)
- Focus management in modals and lightbox
- Semantic HTML throughout

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, layout, animations, responsive design |
| JavaScript (ES6+) | Interactivity, DOM manipulation, validation |
| Leaflet.js (v1.9.4) | Interactive map on contact page |
| Google Fonts | Montserrat + Open Sans typography |
| OpenStreetMap | Map tile layer (via Leaflet) |

---

## Browser Compatibility

Tested in:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Mobile Safari (iOS)
- Chrome for Android

---

## How to Run Locally

1. Clone or download the repository.
2. Open `index.html` in any modern web browser.
3. No server or build tools are required – the site is fully static.

> Note: The Leaflet map on `contact.html` requires an internet connection to load map tiles from OpenStreetMap.

---

## Changelog

### Part 3 – 2026-11-11
**New Files Added:**
- `about.html` – Full about page (was previously missing; README.md contained about content incorrectly)
- `js/main.js` – Comprehensive JavaScript file for all interactivity
- `robots.txt` – SEO: search engine crawler instructions
- `sitemap.xml` – SEO: full website sitemap

**Files Modified:**
- `index.html` – Added SEO meta tags (title, description, keywords, canonical, Open Graph, Twitter Card); added hero section with CTA buttons; added stats strip; replaced static product grid with dynamic JS-rendered grid; added search/filter/sort toolbar; added tabs component (Why Urban Threads); added FAQ accordion; added lightbox gallery; added back-to-top button; added footer with multi-column layout; added hamburger menu for mobile; integrated `js/main.js`
- `about.html` – Created from scratch (was missing); added SEO meta tags; added brand story, mission/vision/team tabs; added values accordion; added stats strip; integrated `js/main.js`
- `products.html` – Added SEO meta tags; replaced static product sections with dynamic JS product grid; added search/filter/sort toolbar; added product count; added gallery with lightbox; added delivery/returns/size guide tabs; integrated `js/main.js`
- `enquiry.html` – Completely rebuilt form with proper form groups, HTML5 and JS validation, SA phone validation, product/service dropdown, dynamic response box showing price and availability; added "What Happens Next" accordion; added SEO meta tags; integrated `js/main.js`
- `contact.html` – Completely rebuilt with JS-validated contact form, mailto compilation on submit, character counter; added Leaflet interactive map; added store information with icons; added Open Graph meta tags; integrated Leaflet JS and `js/main.js`
- `css/style.css` – Full redesign and expansion: added CSS custom properties, sticky header, hamburger nav, product card styles with hover effects, gallery and lightbox styles, accordion and tabs styles, modal styles, toast notification, back-to-top button, improved form styles with validation states, multi-column footer, responsive breakpoints for tablet and mobile

**Feedback Corrections from Part 2:**
- Added missing `about.html` page (content was erroneously placed in `README.md`)
- Added consistent SEO meta tags across all pages (were missing in Part 2)
- Added hamburger navigation toggle for mobile (navigation was not usable on small screens)
- Added proper `aria-*` accessibility attributes to all interactive elements
- Improved form structure with `<label>` elements properly associated via `for`/`id` pairs
- Added `rel="canonical"` link tags on all pages to prevent duplicate content issues
- Added `loading="lazy"` to all below-the-fold images
- Replaced placeholder `[Google Map Embed Placeholder]` text with a real Leaflet.js interactive map
- Added actual contact form functionality (was a placeholder in Part 2)

### Part 2 – [Previous Date]
- Added CSS styling: Google Fonts, colour scheme, responsive grid layout, card hover effects, media queries for tablet and mobile
- Added `contact.html` with store information section and Google Fonts
- Updated `enquiry.html` with basic form structure
- Added product images to `images/` directory
- Updated `README.md` with project description

### Part 1 – [Previous Date]
- Initial project setup
- Created `index.html`, `products.html`, `enquiry.html`, `contact.html`
- Created `css/style.css` with base styles
- Added navigation linking all pages

---

## References

- Mozilla Developer Network (MDN) Web Docs – https://developer.mozilla.org
- W3Schools HTML & CSS Reference – https://www.w3schools.com
- Leaflet.js Documentation – https://leafletjs.com/reference.html
- OpenStreetMap – https://www.openstreetmap.org
- Google Fonts – https://fonts.google.com
- WebAIM ARIA Authoring Practices – https://www.w3.org/WAI/ARIA/apg/
- Google Search Central – SEO Starter Guide – https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Sitemaps Protocol – https://www.sitemaps.org/protocol.html
- Open Graph Protocol – https://ogp.me
- Twitter Card Docs – https://developer.twitter.com/en/docs/twitter-for-websites/cards
- CSS-Tricks – A Complete Guide to Flexbox – https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- CSS-Tricks – A Complete Guide to CSS Grid – https://css-tricks.com/snippets/css/complete-guide-grid/

---

*WEDE5020 – Web Development Module*
