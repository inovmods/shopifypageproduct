// Blueprint Theme Constants

window.BlueprintTheme = window.BlueprintTheme || {};

// Breakpoints
window.BlueprintTheme.breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  large: 1200
};

// Animation settings
window.BlueprintTheme.animations = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5
  },
  easing: {
    ease: 'ease',
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    easeIn: 'ease-in'
  }
};

// Shopify routes
window.BlueprintTheme.routes = {
  cartAdd: '/cart/add.js',
  cartChange: '/cart/change.js',
  cartUpdate: '/cart/update.js',
  cartGet: '/cart.js',
  productRecommendations: '/recommendations/products'
};

// Settings
window.BlueprintTheme.settings = {
  cartType: 'drawer',
  enableAnimations: true,
  enable3D: true,
  animationSpeed: 1.0
};

// Utility functions
window.BlueprintTheme.utils = {
  // Check if device is mobile
  isMobile: () => window.innerWidth <= window.BlueprintTheme.breakpoints.mobile,
  
  // Check if device is tablet
  isTablet: () => window.innerWidth <= window.BlueprintTheme.breakpoints.tablet && window.innerWidth > window.BlueprintTheme.breakpoints.mobile,
  
  // Check if device is desktop
  isDesktop: () => window.innerWidth > window.BlueprintTheme.breakpoints.tablet,
  
  // Debounce function
  debounce: (func, wait, immediate) => {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
  
  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Format money
  formatMoney: (cents) => {
    const money = cents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(money);
  },
  
  // Get cookie
  getCookie: (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  },
  
  // Set cookie
  setCookie: (name, value, days) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  }
}; 