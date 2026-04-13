// Blueprint Theme - GSAP Animations

window.BlueprintTheme = window.BlueprintTheme || {};

BlueprintTheme.Animations = {
  init: function() {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP is not loaded');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    
    this.initScrollTrigger();
    this.initHeroAnimations();
    this.init3DAnimations();
    this.initTextAnimations();
    this.initProductCardAnimations();
    this.initPageTransitions();
    
    console.log('Blueprint animations initialized');
  },

  initScrollTrigger: function() {
    // Refresh ScrollTrigger on window resize
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });

    // Custom scroll indicator
    gsap.to('.scroll-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  },

  initHeroAnimations: function() {
    const hero = document.querySelector('.hero-3d');
    if (!hero) return;

    const tl = gsap.timeline();

    // Hero entrance animation
    tl.from('.hero-3d__content h1', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.hero-3d__content p', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-3d__features .feature-item', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-3d__cta .button', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4');

    // Parallax effect for hero background
    gsap.to('.hero-3d__background', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-3d',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Text reveal on scroll
    gsap.from('.hero-3d__scroll-text', {
      opacity: 0,
      y: 20,
      scrollTrigger: {
        trigger: '.hero-3d',
        start: 'center center',
        end: 'bottom center',
        scrub: 1
      }
    });
  },

  init3DAnimations: function() {
    const splineContainer = document.querySelector('.spline-3d-container');
    if (!splineContainer) return;

    // 3D model rotation on scroll
    gsap.to('.spline-3d-container', {
      rotationY: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-3d',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    // 3D model scale effect
    gsap.fromTo('.spline-3d-container', 
      { scale: 0.8, opacity: 0.8 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-3d',
          start: 'top center',
          end: 'center center',
          scrub: 1
        }
      }
    );

    // Interactive hover effects for 3D container
    splineContainer.addEventListener('mouseenter', () => {
      gsap.to(splineContainer, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    splineContainer.addEventListener('mouseleave', () => {
      gsap.to(splineContainer, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  },

  initTextAnimations: function() {
    // Stagger text reveals
    gsap.utils.toArray('.stagger-text').forEach(element => {
      const chars = element.textContent.split('');
      element.innerHTML = chars.map(char => `<span class="char">${char}</span>`).join('');

      gsap.from(element.querySelectorAll('.char'), {
        opacity: 0,
        y: 50,
        rotationX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Split text animations
    gsap.utils.toArray('.split-text').forEach(element => {
      const text = new SplitText(element, { type: 'lines, words' });
      
      gsap.from(text.words, {
        opacity: 0,
        y: 100,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Typewriter effect
    gsap.utils.toArray('.typewriter').forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      
      gsap.to(element, {
        duration: text.length * 0.05,
        ease: 'none',
        onUpdate: function() {
          const progress = Math.round(this.progress() * text.length);
          element.textContent = text.substring(0, progress);
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  },

  initProductCardAnimations: function() {
    // Product cards entrance
    gsap.utils.toArray('.product-card').forEach((card, index) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });

      // Hover animations
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });

        gsap.to(card.querySelector('.product-card__image'), {
          scale: 1.1,
          duration: 0.5,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });

        gsap.to(card.querySelector('.product-card__image'), {
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });

    // Collection grid animations
    gsap.utils.toArray('.collection-grid .collection-card').forEach((card, index) => {
      gsap.from(card, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  },

  initPageTransitions: function() {
    // Page load animation
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
      gsap.to(pageLoader, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        onComplete: function() {
          pageLoader.style.display = 'none';
        }
      });
    }

    // Smooth scroll
    gsap.registerPlugin(ScrollToPlugin);

    // Smooth scroll for anchor links
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
          gsap.to(window, {
            duration: 1,
            scrollTo: target,
            ease: 'power2.inOut'
          });
        }
      }
    });
  },

  // Utility functions
  fadeIn: function(element, duration = 0.5) {
    gsap.from(element, {
      opacity: 0,
      duration: duration,
      ease: 'power2.out'
    });
  },

  slideUp: function(element, duration = 0.6) {
    gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: duration,
      ease: 'power3.out'
    });
  },

  staggerFadeIn: function(elements, stagger = 0.1) {
    gsap.from(elements, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: stagger,
      ease: 'power3.out'
    });
  },

  scaleIn: function(element, duration = 0.5) {
    gsap.from(element, {
      scale: 0.8,
      opacity: 0,
      duration: duration,
      ease: 'back.out(1.7)'
    });
  },

  // Section reveal animations
  initSectionAnimations: function() {
    gsap.utils.toArray('.section').forEach(section => {
      gsap.from(section.querySelectorAll('.section-title, .section-subtitle'), {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  },

  // Newsletter section animations
  initNewsletterAnimations: function() {
    const newsletter = document.querySelector('.newsletter');
    if (!newsletter) return;

    gsap.from('.newsletter__content > *', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: newsletter,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  },

  // Footer animations
  initFooterAnimations: function() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    gsap.from('.footer__content > *', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  },

  // Button hover animations
  initButtonAnimations: function() {
    gsap.utils.toArray('.button').forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
    });
  },

  // Refresh ScrollTrigger
  refresh: function() {
    ScrollTrigger.refresh();
  },

  // Kill all animations
  kill: function() {
    ScrollTrigger.killAll();
    gsap.killTweensOf('*');
  }
};

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wait for GSAP to load
  const checkGSAP = setInterval(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      clearInterval(checkGSAP);
      BlueprintTheme.Animations.init();
    }
  }, 100);
});

// Refresh on window resize
window.addEventListener('resize', BlueprintTheme.utils.debounce(() => {
  BlueprintTheme.Animations.refresh();
}, 250)); 