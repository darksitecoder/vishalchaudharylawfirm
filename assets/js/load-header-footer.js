/**
 * Dynamic Header and Footer Loader
 * Loads header and footer HTML files and sets active navigation classes
 */

(function() {
  'use strict';

  // Get current page name from URL
  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.replace('.html', '').toLowerCase();
  }

  // Map page names to navigation identifiers
  function getPageIdentifier() {
    // Allow pages to override the detected page id by setting `window.PAGE_ID` or
    // by adding `data-page="..."` on the `<body>` element.
    if (typeof window !== 'undefined' && window.PAGE_ID) {
      return String(window.PAGE_ID).toLowerCase();
    }
    if (document && document.body && document.body.getAttribute('data-page')) {
      return document.body.getAttribute('data-page').toLowerCase();
    }

    const currentPage = getCurrentPage();
    
    // Service pages mapping
    const servicePages = {
      'corporatelaw': 'services',
      'civil-litigation': 'services',
      'family-law': 'services',
      'criminal-defence': 'services',
      'real-estate-property': 'services',
      'tax-law-planning': 'services',
      'employment-law': 'services',
      'wills-and-inheritance': 'services',
      'wills-inheritance': 'services',
      'civil-law': 'services',
      'services': 'services',
      'servicesex': 'services',
      'business-law': 'services',
      'criminal-law': 'services',
      'cyber-law': 'services',
      'education-law': 'services',
      'hospital-law': 'services',
      'service-law': 'services'
    };

    // Check if it's a service page
    if (servicePages[currentPage]) {
      return 'services';
    }

    // Blog pages (including blog-post) should mark 'blog' active
    if (currentPage.indexOf('blog') === 0) {
      return 'blog';
    }

    // Direct page mapping
    const pageMap = {
      'index': 'index',
      'about': 'about',
      'contact': 'contact',
      'blog': 'blog'
    };

    return pageMap[currentPage] || 'index';
  }

  // Set active navigation class
  function setActiveNav() {
    const pageId = getPageIdentifier();
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    // Remove active class from all nav items
    navItems.forEach(item => {
      item.classList.remove('active');
      const link = item.querySelector('.nav-link');
      if (link) {
        link.classList.remove('active');
      }
    });

    // Add active class to current page nav item
    const activeItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
      const activeLink = activeItem.querySelector('.nav-link');
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }

    // Special handling for service pages - also activate dropdown
    if (pageId === 'services') {
      const servicesDropdown = document.querySelector('.nav-item[data-page="services"]');
      if (servicesDropdown) {
        servicesDropdown.classList.add('active');
        const dropdownLink = servicesDropdown.querySelector('.nav-link');
        if (dropdownLink) {
          dropdownLink.classList.add('active');
        }
      }
    }
  }

  // Load header
  function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    fetch('header.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load header');
        }
        return response.text();
      })
      .then(html => {
        headerPlaceholder.innerHTML = html;
        setActiveNav();
      })
      .catch(error => {
        console.error('Error loading header:', error);
      });
  }

  // Load footer
  function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    fetch('footer.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load footer');
        }
        return response.text();
      })
      .then(html => {
        footerPlaceholder.innerHTML = html;
        
        // Set copyright year
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
          yearSpan.textContent = new Date().getFullYear();
        }
      })
      .catch(error => {
        console.error('Error loading footer:', error);
      });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadHeader();
      loadFooter();
    });
  } else {
    loadHeader();
    loadFooter();
  }

  // Re-set active nav after header loads (in case of async loading)
  setTimeout(setActiveNav, 100);
  setTimeout(setActiveNav, 500);

})();
