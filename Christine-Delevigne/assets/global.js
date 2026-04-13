// Blueprint Theme Global JavaScript

window.BlueprintTheme = window.BlueprintTheme || {};

// Initialize theme
document.addEventListener('DOMContentLoaded', function() {
  BlueprintTheme.init();
});

BlueprintTheme.init = function() {
  this.initCart();
  this.initForms();
  this.initNavigation();
  this.initLazyLoading();
  this.initScrollEffects();
  this.initModals();
  this.initTooltips();
  
  console.log('Blueprint Theme initialized');
};

// Cart functionality
BlueprintTheme.Cart = {
  init: function() {
    this.bindEvents();
    this.updateCartCount();
  },

  bindEvents: function() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-add-to-cart]')) {
        e.preventDefault();
        this.addToCart(e.target);
      }
    });

    // Cart drawer toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-cart-toggle]')) {
        e.preventDefault();
        this.toggleCartDrawer();
      }
    });

    // Remove from cart
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-cart-remove]')) {
        e.preventDefault();
        this.removeFromCart(e.target.dataset.cartRemove);
      }
    });
  },

  addToCart: function(button) {
    const form = button.closest('form');
    if (!form) return;

    const formData = new FormData(form);
    const originalText = button.textContent;
    
    button.textContent = 'Adding...';
    button.disabled = true;

    fetch('/cart/add.js', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      this.updateCartCount();
      this.showCartDrawer();
      BlueprintTheme.PubSub.publish('cart:item-added', data);
      
      button.textContent = 'Added!';
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
      button.textContent = 'Error';
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    });
  },

  removeFromCart: function(variantId) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: variantId,
        quantity: 0
      })
    })
    .then(response => response.json())
    .then(data => {
      this.updateCartCount();
      this.refreshCartDrawer();
      BlueprintTheme.PubSub.publish('cart:item-removed', data);
    })
    .catch(error => {
      console.error('Error removing from cart:', error);
    });
  },

  updateCartCount: function() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const cartCountElements = document.querySelectorAll('[data-cart-count]');
        cartCountElements.forEach(element => {
          element.textContent = cart.item_count;
        });
        BlueprintTheme.PubSub.publish('cart:updated', cart);
      })
      .catch(error => {
        console.error('Error updating cart count:', error);
      });
  },

  toggleCartDrawer: function() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.toggle('active');
      document.body.classList.toggle('cart-drawer-open');
    }
  },

  showCartDrawer: function() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.add('active');
      document.body.classList.add('cart-drawer-open');
    }
  },

  hideCartDrawer: function() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.remove('active');
      document.body.classList.remove('cart-drawer-open');
    }
  },

  refreshCartDrawer: function() {
    // This would typically reload cart drawer content
    this.updateCartCount();
  }
};

// Form handling
BlueprintTheme.Forms = {
  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    // Newsletter forms
    document.addEventListener('submit', (e) => {
      if (e.target.matches('[data-newsletter-form]')) {
        e.preventDefault();
        this.handleNewsletterSubmit(e.target);
      }
    });

    // Contact forms
    document.addEventListener('submit', (e) => {
      if (e.target.matches('[data-contact-form]')) {
        this.handleContactSubmit(e.target);
      }
    });
  },

  handleNewsletterSubmit: function(form) {
    const email = form.querySelector('[name="contact[email]"]').value;
    const submitButton = form.querySelector('[type="submit"]');
    const originalText = submitButton.textContent;

    if (!this.validateEmail(email)) {
      this.showFormMessage(form, 'Please enter a valid email address', 'error');
      return;
    }

    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;

    const formData = new FormData(form);
    
    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        this.showFormMessage(form, 'Thanks for subscribing!', 'success');
        form.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      this.showFormMessage(form, 'Something went wrong. Please try again.', 'error');
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
  },

  handleContactSubmit: function(form) {
    const submitButton = form.querySelector('[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Reset after form submission
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  },

  validateEmail: function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  showFormMessage: function(form, message, type) {
    let messageElement = form.querySelector('.form-message');
    
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.className = 'form-message';
      form.appendChild(messageElement);
    }

    messageElement.textContent = message;
    messageElement.className = `form-message form-message--${type}`;
    
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }
};

// Navigation
BlueprintTheme.Navigation = {
  init: function() {
    this.bindEvents();
    this.initStickyHeader();
  },

  bindEvents: function() {
    // Mobile menu toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-mobile-menu-toggle]')) {
        e.preventDefault();
        this.toggleMobileMenu();
      }
    });

    // Dropdown menus
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-dropdown-toggle]')) {
        e.preventDefault();
        this.toggleDropdown(e.target);
      }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-dropdown]')) {
        this.closeAllDropdowns();
      }
    });
  },

  toggleMobileMenu: function() {
    const menu = document.querySelector('[data-mobile-menu]');
    const toggle = document.querySelector('[data-mobile-menu-toggle]');
    
    if (menu && toggle) {
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
      document.body.classList.toggle('mobile-menu-open');
    }
  },

  toggleDropdown: function(toggle) {
    const dropdown = toggle.closest('[data-dropdown]');
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  },

  closeAllDropdowns: function() {
    const dropdowns = document.querySelectorAll('[data-dropdown].active');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  },

  initStickyHeader: function() {
    const header = document.querySelector('[data-sticky-header]');
    if (!header) return;

    let lastScrollY = window.scrollY;
    
    const handleScroll = BlueprintTheme.utils.throttle(() => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.classList.add('sticky');
        
        if (currentScrollY > lastScrollY) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }
      } else {
        header.classList.remove('sticky', 'hidden');
      }
      
      lastScrollY = currentScrollY;
    }, 100);

    window.addEventListener('scroll', handleScroll);
  }
};

// Lazy loading
BlueprintTheme.LazyLoading = {
  init: function() {
    if ('IntersectionObserver' in window) {
      this.initIntersectionObserver();
    } else {
      this.loadAllImages();
    }
  },

  initIntersectionObserver: function() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          observer.unobserve(img);
        }
      });
    });

    const images = document.querySelectorAll('[data-lazy]');
    images.forEach(img => imageObserver.observe(img));
  },

  loadImage: function(img) {
    const src = img.dataset.lazy;
    if (src) {
      img.src = src;
      img.classList.add('loaded');
      img.removeAttribute('data-lazy');
    }
  },

  loadAllImages: function() {
    const images = document.querySelectorAll('[data-lazy]');
    images.forEach(img => this.loadImage(img));
  }
};

// Scroll effects
BlueprintTheme.ScrollEffects = {
  init: function() {
    this.initParallax();
    this.initRevealAnimations();
  },

  initParallax: function() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;

    const handleScroll = BlueprintTheme.utils.throttle(() => {
      const scrollTop = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }, 16);

    window.addEventListener('scroll', handleScroll);
  },

  initRevealAnimations: function() {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, { threshold: 0.1 });

      const revealElements = document.querySelectorAll('[data-reveal]');
      revealElements.forEach(element => revealObserver.observe(element));
    }
  }
};

// Modals
BlueprintTheme.Modals = {
  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-modal-open]')) {
        e.preventDefault();
        this.openModal(e.target.dataset.modalOpen);
      }
      
      if (e.target.matches('[data-modal-close]') || e.target.matches('.modal-overlay')) {
        e.preventDefault();
        this.closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  },

  openModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    }
  },

  closeModal: function() {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      activeModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }
};

// Tooltips
BlueprintTheme.Tooltips = {
  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('mouseenter', (e) => {
      if (e.target.matches('[data-tooltip]')) {
        this.showTooltip(e.target);
      }
    });

    document.addEventListener('mouseleave', (e) => {
      if (e.target.matches('[data-tooltip]')) {
        this.hideTooltip();
      }
    });
  },

  showTooltip: function(element) {
    const text = element.dataset.tooltip;
    if (!text) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    tooltip.classList.add('active');
  },

  hideTooltip: function() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }
};

// Initialize modules
BlueprintTheme.initCart = function() {
  this.Cart.init();
};

BlueprintTheme.initForms = function() {
  this.Forms.init();
};

BlueprintTheme.initNavigation = function() {
  this.Navigation.init();
};

BlueprintTheme.initLazyLoading = function() {
  this.LazyLoading.init();
};

BlueprintTheme.initScrollEffects = function() {
  this.ScrollEffects.init();
};

BlueprintTheme.initModals = function() {
  this.Modals.init();
};

BlueprintTheme.initTooltips = function() {
  this.Tooltips.init();
}; 