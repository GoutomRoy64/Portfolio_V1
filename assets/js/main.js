(function() {
  "use strict";

  // Header toggle
  const headerToggleBtn = document.querySelector('.header-toggle');
  function headerToggle() {
    const header = document.querySelector('#header');
    if (header) {
      header.classList.toggle('header-show');
    }
    if (headerToggleBtn) {
      headerToggleBtn.classList.toggle('bi-list');
      headerToggleBtn.classList.toggle('bi-x');
    }
  }
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  // Mobile nav
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  // Preloader
  window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add("hidden");
      }, 100);
    }
  });
  
  // Scroll top button
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  // Initialize libraries after page load
  window.addEventListener('load', function() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
      AOS.init({ 
        duration: 600, 
        easing: 'ease-in-out', 
        once: true, 
        mirror: false 
      });
    }

    // Initialize Typed.js if available
    const selectTyped = document.querySelector('.typed');
    if (selectTyped && typeof Typed !== 'undefined') {
      const typedStrings = selectTyped.getAttribute('data-typed-items');
      if (typedStrings) {
        new Typed('.typed', {
          strings: typedStrings.split(','),
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
      }
    }

    // Initialize GLightbox if available
    if (typeof GLightbox !== 'undefined') {
      GLightbox({ selector: '.glightbox' });
    }

    // Initialize PureCounter if available
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }

    // Initialize Waypoints for skills animation
    const skillsAnimation = document.querySelectorAll('.skills-animation');
    if (skillsAnimation.length && typeof Waypoint !== 'undefined') {
      skillsAnimation.forEach((item) => {
        new Waypoint({
          element: item,
          offset: '80%',
          handler: function() {
            const progressBars = item.querySelectorAll('.progress .progress-bar');
            progressBars.forEach(el => {
              if (el.hasAttribute('aria-valuenow')) {
                el.style.width = el.getAttribute('aria-valuenow') + '%';
              }
            });
          }
        });
      });
    }

    // Initialize Isotope if available
    if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
      document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
        const container = isotopeItem.querySelector('.isotope-container');
        if (!container) return;

        const layout = isotopeItem.getAttribute('data-layout') || 'masonry';
        const filter = isotopeItem.getAttribute('data-default-filter') || '*';
        const sort = isotopeItem.getAttribute('data-sort') || 'original-order';

        imagesLoaded(container, function() {
          const initIsotope = new Isotope(container, {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort
          });

          isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filterItem) {
            filterItem.addEventListener('click', function() {
              const activeFilter = isotopeItem.querySelector('.isotope-filters .filter-active');
              if (activeFilter) {
                activeFilter.classList.remove('filter-active');
              }
              this.classList.add('filter-active');
              initIsotope.arrange({
                filter: this.getAttribute('data-filter')
              });
            });
          });
        });
      });
    }

    // Initialize Swiper if available
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        const configElement = swiperElement.querySelector(".swiper-config");
        if (configElement) {
          try {
            const config = JSON.parse(configElement.textContent.trim());
            new Swiper(swiperElement, config);
          } catch (e) {
            console.error('Error parsing Swiper config:', e);
          }
        }
      });
    }

    // Load GitHub stats after page is interactive
    function loadGitHubStats() {
      document.querySelectorAll('.github-stats img, .github-trophies img').forEach(img => {
        if (!img.src && img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadGitHubStats);
    } else {
      setTimeout(loadGitHubStats, 2000);
    }

    // Handle hash links
    if (window.location.hash) {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        setTimeout(() => {
          const scrollMarginTop = parseInt(getComputedStyle(targetSection).scrollMarginTop) || 0;
          window.scrollTo({
            top: targetSection.offsetTop - scrollMarginTop,
            behavior: 'smooth'
          });
        }, 100);
      }
    }

    // Initialize scrollspy
    const navmenuLinks = document.querySelectorAll('.navmenu a');
    function navmenuScrollspy() {
      const scrollPosition = window.scrollY + 200;
      
      navmenuLinks.forEach(link => {
        if (!link.hash) return;
        
        const targetSection = document.querySelector(link.hash);
        if (!targetSection) return;
        
        const sectionTop = targetSection.offsetTop;
        const sectionBottom = sectionTop + targetSection.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          document.querySelectorAll('.navmenu a.active').forEach(activeLink => {
            activeLink.classList.remove('active');
          });
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    if (navmenuLinks.length) {
      navmenuScrollspy();
      document.addEventListener('scroll', navmenuScrollspy);
    }
  });
})();