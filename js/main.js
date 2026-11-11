/**
 * Urban Threads - Main JavaScript File
 * Module: WEDE5020 - Part 3
 * Description: Provides interactive elements, dynamic content,
 *              DOM manipulation, form validation, and animations
 *              for the Urban Threads streetwear website.
 */

/* =========================================================
   1. UTILITY FUNCTIONS
   ========================================================= */

/**
 * Debounce function to limit rapid function calls (e.g. search input)
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 */
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Sanitises a string for safe insertion into the DOM
 * @param {string} str - Raw string
 * @returns {string} - Escaped string
 */
function sanitise(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* =========================================================
   2. MOBILE NAVIGATION TOGGLE
   ========================================================= */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('main-nav');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.textContent = isOpen ? '✕' : '☰';
  });

  // Close nav when a link is clicked (mobile)
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.textContent = '☰';
    });
  });

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navMenu.querySelectorAll('a').forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();

/* =========================================================
   3. ACCORDION COMPONENT (FAQ / About page)
   ========================================================= */
(function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(function (item) {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    if (!trigger || !panel) return;

    // Set initial ARIA attributes
    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('hidden', '');

    trigger.addEventListener('click', function () {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other panels
      accordionItems.forEach(function (otherItem) {
        const otherTrigger = otherItem.querySelector('.accordion-trigger');
        const otherPanel = otherItem.querySelector('.accordion-panel');
        if (otherTrigger && otherPanel && otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherPanel.setAttribute('hidden', '');
          otherItem.classList.remove('open');
        }
      });

      // Toggle current
      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.setAttribute('hidden', '');
        item.classList.remove('open');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
        item.classList.add('open');
      }
    });
  });
})();

/* =========================================================
   4. TABS COMPONENT (Products / About page)
   ========================================================= */
(function initTabs() {
  const tabLists = document.querySelectorAll('[role="tablist"]');
  if (!tabLists.length) return;

  tabLists.forEach(function (tabList) {
    const tabs = tabList.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    function activateTab(tab) {
      tabs.forEach(function (t) {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      tabPanels.forEach(function (panel) {
        panel.hidden = true;
        panel.classList.remove('active');
      });

      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      const target = document.getElementById(tab.getAttribute('aria-controls'));
      if (target) {
        target.hidden = false;
        target.classList.add('active');
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab);
      });

      // Keyboard navigation (arrow keys)
      tab.addEventListener('keydown', function (e) {
        const tabArray = Array.from(tabs);
        const idx = tabArray.indexOf(e.currentTarget);
        if (e.key === 'ArrowRight') {
          const next = tabArray[(idx + 1) % tabArray.length];
          next.focus();
          activateTab(next);
        } else if (e.key === 'ArrowLeft') {
          const prev = tabArray[(idx - 1 + tabArray.length) % tabArray.length];
          prev.focus();
          activateTab(prev);
        }
      });
    });

    // Activate first tab on load
    if (tabs.length) activateTab(tabs[0]);
  });
})();

/* =========================================================
   5. MODAL COMPONENT
   ========================================================= */
(function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modals = document.querySelectorAll('.modal');
  if (!modalTriggers.length) return;

  function openModal(modal) {
    if (!modal) return;
    modal.removeAttribute('hidden');
    modal.setAttribute('aria-modal', 'true');
    document.body.classList.add('modal-open');
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');
  }

  modalTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const target = document.getElementById(trigger.dataset.modalTarget);
      openModal(target);
    });
  });

  modals.forEach(function (modal) {
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeModal(modal);
      });
    }
    // Close on backdrop click
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal(modal);
    });
    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal(modal);
    });
  });
})();

/* =========================================================
   6. LIGHTBOX GALLERY
   ========================================================= */
(function initLightbox() {
  const galleryImages = document.querySelectorAll('.gallery-item img, .lightbox-trigger');
  if (!galleryImages.length) return;

  // Build lightbox overlay
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image lightbox');
  overlay.setAttribute('hidden', '');
  overlay.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
      <div class="lightbox-content">
        <img id="lightbox-img" src="" alt="">
        <p id="lightbox-caption"></p>
      </div>
      <button class="lightbox-next" aria-label="Next image">&#10095;</button>
    </div>`;
  document.body.appendChild(overlay);

  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');
  const closeBtn = overlay.querySelector('.lightbox-close');
  let currentIdx = 0;
  const items = Array.from(galleryImages);

  function showImage(idx) {
    currentIdx = (idx + items.length) % items.length;
    const img = items[currentIdx];
    lbImg.src = img.src || img.dataset.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = img.dataset.caption || img.alt || '';
  }

  function openLightbox(idx) {
    overlay.removeAttribute('hidden');
    document.body.classList.add('modal-open');
    showImage(idx);
    closeBtn.focus();
  }

  function closeLightbox() {
    overlay.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');
  }

  items.forEach(function (img, idx) {
    img.style.cursor = 'pointer';
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'View larger: ' + (img.alt || 'image'));
    img.addEventListener('click', function () { openLightbox(idx); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); }
    });
  });

  prevBtn.addEventListener('click', function () { showImage(currentIdx - 1); });
  nextBtn.addEventListener('click', function () { showImage(currentIdx + 1); });
  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (overlay.hasAttribute('hidden')) return;
    if (e.key === 'ArrowLeft') showImage(currentIdx - 1);
    if (e.key === 'ArrowRight') showImage(currentIdx + 1);
    if (e.key === 'Escape') closeLightbox();
  });
})();

/* =========================================================
   7. DYNAMIC PRODUCT LOADING & SEARCH / FILTER
   ========================================================= */
(function initProductSearch() {
  const searchInput = document.getElementById('product-search');
  const categoryFilter = document.getElementById('category-filter');
  const sortFilter = document.getElementById('sort-filter');
  const productGrid = document.getElementById('product-grid');
  const productCount = document.getElementById('product-count');
  if (!productGrid) return;

  // Product data
  const products = [
    { id: 1, name: 'Graphic T-Shirt', category: 'tshirts', price: 250, img: 'images/product1.jpg', desc: 'Premium cotton graphic tee with urban print.' },
    { id: 2, name: 'Oversized Hoodie', category: 'hoodies', price: 450, img: 'images/product2.jpg', desc: 'Cozy oversized hoodie with bold embroidery.' },
    { id: 3, name: 'Snapback Cap', category: 'accessories', price: 180, img: 'images/product3.jpg', desc: 'Classic snapback with embroidered logo.' },
    { id: 4, name: 'Logo T-Shirt', category: 'tshirts', price: 220, img: 'images/product4.jpg', desc: 'Classic Urban Threads logo tee.' },
    { id: 5, name: 'Zip Hoodie', category: 'hoodies', price: 480, img: 'images/product5.jpg', desc: 'Full-zip hoodie with urban graphics.' },
    { id: 6, name: 'Crossbody Bag', category: 'accessories', price: 320, img: 'images/product6.jpg', desc: 'Stylish streetwear crossbody bag.' },
  ];

  function renderProducts(list) {
    if (!list.length) {
      productGrid.innerHTML = '<p class="no-results">No products found. Try a different search or filter.</p>';
      if (productCount) productCount.textContent = '0 products';
      return;
    }

    if (productCount) productCount.textContent = list.length + ' product' + (list.length !== 1 ? 's' : '') + ' found';

    productGrid.innerHTML = list.map(function (p) {
      return `
        <article class="product-card" data-category="${sanitise(p.category)}" data-id="${p.id}">
          <div class="product-img-wrap">
            <img src="${sanitise(p.img)}" alt="${sanitise(p.name)}" loading="lazy" class="lightbox-trigger" data-caption="${sanitise(p.name)} - R${p.price}">
            <span class="product-badge">${sanitise(p.category.charAt(0).toUpperCase() + p.category.slice(1))}</span>
          </div>
          <div class="product-info">
            <h3>${sanitise(p.name)}</h3>
            <p class="product-desc">${sanitise(p.desc)}</p>
            <p class="product-price">R${p.price}</p>
            <button class="btn btn-primary add-to-cart" data-id="${p.id}" data-name="${sanitise(p.name)}" data-price="${p.price}">Add to Cart</button>
          </div>
        </article>`;
    }).join('');

    // Re-attach lightbox to newly rendered images
    attachLightboxToNewImages();
  }

  function filterAndRender() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const category = categoryFilter ? categoryFilter.value : 'all';
    const sort = sortFilter ? sortFilter.value : 'default';

    let filtered = products.filter(function (p) {
      const matchQuery = !query || p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
      const matchCat = category === 'all' || p.category === category;
      return matchQuery && matchCat;
    });

    if (sort === 'price-asc') filtered.sort(function (a, b) { return a.price - b.price; });
    else if (sort === 'price-desc') filtered.sort(function (a, b) { return b.price - a.price; });
    else if (sort === 'name-asc') filtered.sort(function (a, b) { return a.name.localeCompare(b.name); });

    renderProducts(filtered);
  }

  function attachLightboxToNewImages() {
    // Trigger re-init for newly added images by firing a custom event
    document.dispatchEvent(new CustomEvent('lightbox:reinit'));
  }

  if (searchInput) searchInput.addEventListener('input', debounce(filterAndRender, 300));
  if (categoryFilter) categoryFilter.addEventListener('change', filterAndRender);
  if (sortFilter) sortFilter.addEventListener('change', filterAndRender);

  // Initial render
  filterAndRender();
})();

/* =========================================================
   8. ADD TO CART (mini cart functionality)
   ========================================================= */
(function initCart() {
  let cart = JSON.parse(localStorage.getItem('ut_cart') || '[]');
  const cartCount = document.getElementById('cart-count');

  function updateCartCount() {
    const total = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    if (cartCount) {
      cartCount.textContent = total;
      cartCount.style.display = total > 0 ? 'inline-flex' : 'none';
    }
  }

  function saveCart() {
    try { localStorage.setItem('ut_cart', JSON.stringify(cart)); } catch (e) { /* storage unavailable */ }
  }

  document.addEventListener('click', function (e) {
    if (!e.target.classList.contains('add-to-cart')) return;
    const id = Number(e.target.dataset.id);
    const name = e.target.dataset.name;
    const price = Number(e.target.dataset.price);
    const existing = cart.find(function (item) { return item.id === id; });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: id, name: name, price: price, qty: 1 });
    }
    saveCart();
    updateCartCount();
    showToast(name + ' added to cart!');
  });

  updateCartCount();
})();

/* =========================================================
   9. TOAST NOTIFICATION
   ========================================================= */
function showToast(message, duration) {
  duration = duration || 3000;
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  // Animate in
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { toast.classList.add('show'); });
  });
  setTimeout(function () {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', function () { toast.remove(); });
  }, duration);
}

/* =========================================================
   10. SCROLL ANIMATIONS (Intersection Observer)
   ========================================================= */
(function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const animatables = document.querySelectorAll('.animate-on-scroll');
  if (!animatables.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatables.forEach(function (el) { observer.observe(el); });
})();

/* =========================================================
   11. BACK TO TOP BUTTON
   ========================================================= */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* =========================================================
   12. ENQUIRY FORM VALIDATION & DYNAMIC RESPONSE
   ========================================================= */
(function initEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  const fields = {
    enquiry_name: { label: 'Full Name', minLength: 2, pattern: /^[A-Za-z\s'-]{2,60}$/, msg: 'Name must be 2–60 letters.' },
    enquiry_email: { label: 'Email Address', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Please enter a valid email address.' },
    enquiry_phone: { label: 'Phone Number', pattern: /^(\+27|0)[6-8][0-9]{8}$/, msg: 'Enter a valid South African phone number (e.g. 0821234567).' },
    enquiry_product: { label: 'Product / Service', required: true, msg: 'Please select a product or service.' },
    enquiry_message: { label: 'Message', minLength: 10, maxLength: 500, msg: 'Message must be between 10 and 500 characters.' },
  };

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add('invalid');
    field.classList.remove('valid');
    field.setAttribute('aria-invalid', 'true');
    let errEl = document.getElementById(fieldId + '-error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.id = fieldId + '-error';
      errEl.className = 'field-error';
      errEl.setAttribute('role', 'alert');
      field.parentNode.insertBefore(errEl, field.nextSibling);
    }
    errEl.textContent = message;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.remove('invalid');
    field.classList.add('valid');
    field.removeAttribute('aria-invalid');
    const errEl = document.getElementById(fieldId + '-error');
    if (errEl) errEl.textContent = '';
  }

  function validateField(fieldId) {
    const rule = fields[fieldId];
    if (!rule) return true;
    const field = document.getElementById(fieldId);
    if (!field) return true;
    const value = field.value.trim();

    if (rule.required && !value) { showError(fieldId, rule.label + ' is required.'); return false; }
    if (!value && !rule.required) { clearError(fieldId); return true; }
    if (rule.minLength && value.length < rule.minLength) { showError(fieldId, rule.msg); return false; }
    if (rule.maxLength && value.length > rule.maxLength) { showError(fieldId, rule.msg); return false; }
    if (rule.pattern && !rule.pattern.test(value)) { showError(fieldId, rule.msg); return false; }
    clearError(fieldId);
    return true;
  }

  // Live validation on blur
  Object.keys(fields).forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', function () { validateField(id); });
    if (el) el.addEventListener('input', function () { if (el.classList.contains('invalid')) validateField(id); });
  });

  // Pricing lookup
  const pricingData = {
    'graphic-tshirt':  { price: 'R250', availability: 'In Stock', delivery: '3–5 business days' },
    'oversized-hoodie': { price: 'R450', availability: 'In Stock', delivery: '3–5 business days' },
    'snapback-cap':    { price: 'R180', availability: 'In Stock', delivery: '3–5 business days' },
    'logo-tshirt':     { price: 'R220', availability: 'In Stock', delivery: '3–5 business days' },
    'zip-hoodie':      { price: 'R480', availability: 'Limited Stock', delivery: '5–7 business days' },
    'crossbody-bag':   { price: 'R320', availability: 'In Stock', delivery: '3–5 business days' },
    'custom-order':    { price: 'From R500', availability: 'By Order', delivery: '10–14 business days' },
    'wholesale':       { price: 'Contact for quote', availability: 'By Arrangement', delivery: 'Negotiated' },
  };

  function displayEnquiryResponse(product, name) {
    const info = pricingData[product];
    const responseBox = document.getElementById('enquiry-response');
    if (!responseBox || !info) return;
    responseBox.innerHTML = `
      <h3>Hi ${sanitise(name)}, here is the information you requested:</h3>
      <table class="response-table">
        <tr><th>Product / Service</th><td>${sanitise(product.replace(/-/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); }))}</td></tr>
        <tr><th>Price</th><td>${sanitise(info.price)}</td></tr>
        <tr><th>Availability</th><td>${sanitise(info.availability)}</td></tr>
        <tr><th>Estimated Delivery</th><td>${sanitise(info.delivery)}</td></tr>
      </table>
      <p>We will follow up on your enquiry within 24 hours. Thank you for reaching out to Urban Threads!</p>`;
    responseBox.removeAttribute('hidden');
    responseBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;
    Object.keys(fields).forEach(function (id) {
      if (!validateField(id)) isValid = false;
    });
    if (!isValid) {
      showToast('Please fix the errors in the form before submitting.', 4000);
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    const name = document.getElementById('enquiry_name').value.trim();
    const product = document.getElementById('enquiry_product').value;
    displayEnquiryResponse(product, name);
    showToast('Enquiry submitted! Check the response below.');
  });
})();

/* =========================================================
   13. CONTACT FORM VALIDATION & MAILTO
   ========================================================= */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    contact_name: { label: 'Full Name', pattern: /^[A-Za-z\s'-]{2,60}$/, msg: 'Name must be 2–60 letters.' },
    contact_email: { label: 'Email Address', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Please enter a valid email address.' },
    contact_phone: { label: 'Phone Number', pattern: /^(\+27|0)[6-8][0-9]{8}$/, msg: 'Enter a valid South African phone number.', required: false },
    contact_type: { label: 'Message Type', required: true, msg: 'Please select a message type.' },
    contact_message: { label: 'Message', minLength: 10, maxLength: 1000, msg: 'Message must be between 10 and 1000 characters.' },
  };

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add('invalid');
    field.classList.remove('valid');
    field.setAttribute('aria-invalid', 'true');
    let errEl = document.getElementById(fieldId + '-error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.id = fieldId + '-error';
      errEl.className = 'field-error';
      errEl.setAttribute('role', 'alert');
      field.parentNode.insertBefore(errEl, field.nextSibling);
    }
    errEl.textContent = message;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.remove('invalid');
    field.classList.add('valid');
    field.removeAttribute('aria-invalid');
    const errEl = document.getElementById(fieldId + '-error');
    if (errEl) errEl.textContent = '';
  }

  function validateField(fieldId) {
    const rule = fields[fieldId];
    if (!rule) return true;
    const field = document.getElementById(fieldId);
    if (!field) return true;
    const value = field.value.trim();

    if (rule.required !== false && !value) { showError(fieldId, rule.label + ' is required.'); return false; }
    if (!value) { clearError(fieldId); return true; }
    if (rule.minLength && value.length < rule.minLength) { showError(fieldId, rule.msg); return false; }
    if (rule.maxLength && value.length > rule.maxLength) { showError(fieldId, rule.msg); return false; }
    if (rule.pattern && !rule.pattern.test(value)) { showError(fieldId, rule.msg); return false; }
    clearError(fieldId);
    return true;
  }

  Object.keys(fields).forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', function () { validateField(id); });
    if (el) el.addEventListener('input', function () { if (el.classList.contains('invalid')) validateField(id); });
  });

  // Character counter for message
  const msgField = document.getElementById('contact_message');
  const charCounter = document.getElementById('char-counter');
  if (msgField && charCounter) {
    msgField.addEventListener('input', function () {
      const len = msgField.value.length;
      charCounter.textContent = len + '/1000 characters';
      charCounter.style.color = len > 950 ? '#e74c3c' : '#888';
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;
    Object.keys(fields).forEach(function (id) {
      if (!validateField(id)) isValid = false;
    });
    if (!isValid) {
      showToast('Please fix the errors before sending.', 4000);
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const name = document.getElementById('contact_name').value.trim();
    const email = document.getElementById('contact_email').value.trim();
    const phone = document.getElementById('contact_phone').value.trim();
    const type = document.getElementById('contact_type').value;
    const message = document.getElementById('contact_message').value.trim();

    const recipient = 'info@urbanthreads.co.za';
    const subject = encodeURIComponent('[Urban Threads Website] ' + type + ' from ' + name);
    const body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      (phone ? 'Phone: ' + phone + '\n' : '') +
      'Message Type: ' + type + '\n\n' +
      'Message:\n' + message + '\n\n' +
      '---\nSent via Urban Threads website contact form.'
    );

    window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + body;
    showToast('Opening your email client to send the message...');
  });
})();

/* =========================================================
   14. LEAFLET MAP INITIALISATION
   ========================================================= */
(function initMap() {
  const mapEl = document.getElementById('store-map');
  if (!mapEl) return;

  // If Leaflet hasn't loaded, show a styled fallback with a Google Maps link
  if (typeof L === 'undefined') {
    mapEl.innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;' +
      'height:100%;background:#1a1a1a;border-radius:8px;padding:2rem;text-align:center;">' +
      '<p style="color:#d4af37;font-size:1.1rem;margin-bottom:1rem;">📍 Urban Threads</p>' +
      '<p style="color:#ccc;margin-bottom:1rem;">123 Bree Street, Johannesburg CBD, 2001</p>' +
      '<a href="https://www.google.com/maps/search/123+Bree+Street+Johannesburg" ' +
      'target="_blank" rel="noopener noreferrer" ' +
      'style="background:#d4af37;color:#111;padding:0.6rem 1.4rem;border-radius:4px;' +
      'font-weight:700;text-decoration:none;">View on Google Maps ↗</a>' +
      '</div>';
    return;
  }

  try {
    var lat = -26.2041;
    var lng = 28.0473;

    var map = L.map('store-map', {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false   // nicer UX on pages with scroll
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(
      '<strong style="color:#111;">Urban Threads</strong><br>' +
      '123 Bree Street,<br>Johannesburg CBD, 2001<br>' +
      '<a href="https://www.google.com/maps/search/123+Bree+Street+Johannesburg" ' +
      'target="_blank" rel="noopener">Get Directions ↗</a>'
    ).openPopup();

    // Fix tile rendering if map is inside a hidden/animated element
    setTimeout(function () { map.invalidateSize(); }, 400);

  } catch (err) {
    mapEl.innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;' +
      'height:100%;background:#1a1a1a;border-radius:8px;padding:2rem;text-align:center;">' +
      '<p style="color:#d4af37;font-size:1.1rem;margin-bottom:0.75rem;">📍 Urban Threads</p>' +
      '<p style="color:#ccc;margin-bottom:1rem;">123 Bree Street, Johannesburg CBD, 2001</p>' +
      '<a href="https://www.google.com/maps/search/123+Bree+Street+Johannesburg" ' +
      'target="_blank" rel="noopener noreferrer" ' +
      'style="background:#d4af37;color:#111;padding:0.6rem 1.4rem;border-radius:4px;' +
      'font-weight:700;text-decoration:none;">View on Google Maps ↗</a>' +
      '</div>';
  }
})();

/* =========================================================
   15. CURRENT YEAR IN FOOTER
   ========================================================= */
(function setFooterYear() {
  const yearSpans = document.querySelectorAll('.current-year');
  const year = new Date().getFullYear();
  yearSpans.forEach(function (span) { span.textContent = year; });
})();
