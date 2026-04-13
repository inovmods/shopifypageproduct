# Blueprint - Premium Shopify Theme

## Overview

Blueprint is a modern, animated Shopify theme designed specifically for premium streetwear and fashion brands. Inspired by brands like Supreme, Chrome Hearts, and Amiri, this theme targets affluent, style-conscious customers with a focus on premium user experience and conversion optimization.

## Key Features

### 🎨 **Modern Design**
- Clean, minimalist aesthetic with premium typography
- Streetwear-inspired styling and layout
- Responsive design optimized for all devices
- Professional color schemes and gradients

### 🎭 **Advanced Animations**
- GSAP-powered smooth animations
- ScrollTrigger effects for engaging user experience
- Fade-in, slide-in, and scale animations
- Scroll-based parallax effects

### 🎯 **3D Integration**
- Spline 3D model integration ready
- Scroll-based 3D model rotation
- Interactive 3D product showcase
- Optimized for performance

### 🛍️ **E-commerce Optimized**
- Conversion-focused product pages
- Advanced filtering and sorting
- Quick add to cart functionality
- Optimized checkout flow

### ⚙️ **Fully Customizable**
- Online Store 2.0 compatible
- Comprehensive theme settings
- Section-based architecture
- Easy customization through Shopify admin

## Theme Structure

```
Blueprint/
├── assets/                 # CSS, JS, and image files
│   ├── base.css           # Core styling framework
│   ├── constants.js       # Theme configuration
│   ├── global.js          # Core functionality
│   ├── pubsub.js          # Event management
│   └── blueprint-animations.js # GSAP animations
├── config/                # Theme configuration
│   ├── settings_schema.json   # Theme settings
│   └── settings_data.json     # Default values
├── layout/                # Theme layouts
│   └── theme.liquid       # Main layout file
├── locales/               # Language files
│   └── en.default.json    # English translations
├── sections/              # Reusable sections
│   ├── hero-3d.liquid     # 3D hero section
│   ├── header.liquid      # Site header
│   ├── footer.liquid      # Site footer
│   ├── featured-collection.liquid # Product grid
│   └── main-*.liquid      # Page-specific sections
├── snippets/              # Reusable code snippets
│   └── meta-tags.liquid   # SEO meta tags
└── templates/             # Page templates
    ├── index.json         # Homepage
    ├── product.json       # Product pages
    ├── collection.json    # Collection pages
    ├── cart.json          # Cart page
    └── customers/         # Customer account pages
```

## Installation Instructions

### 1. **Download & Upload**
1. Download `Blueprint-Theme-Complete.zip`
2. Go to Shopify Admin → Online Store → Themes
3. Click "Upload theme"
4. Select the ZIP file and upload

### 2. **Theme Customization**
1. Click "Customize" on the Blueprint theme
2. Configure colors, fonts, and layout in Theme Settings
3. Add your logo and favicon
4. Set up navigation menus

### 3. **3D Model Setup**
1. Create your 3D model in Spline (spline.design)
2. Export as web embed
3. Copy the embed URL
4. In theme customizer, go to Hero 3D section
5. Paste the Spline URL in "Spline 3D URL" field
6. Enable "Enable 3D model" option

### 4. **Content Setup**
1. Add products with high-quality images
2. Create collections for different product categories
3. Set up blog for content marketing
4. Configure shipping and payment settings

## Theme Settings

### **Colors & Typography**
- Primary and secondary colors
- Background colors and gradients
- Typography settings (heading and body fonts)
- Button and form styling

### **Layout & Spacing**
- Page width and margins
- Section padding and spacing
- Grid layouts and breakpoints
- Mobile-specific settings

### **Product Cards**
- Image aspect ratios and shapes
- Show/hide product information
- Hover effects and animations
- Quick add functionality

### **Header & Navigation**
- Logo positioning and sizing
- Menu styles and layouts
- Search functionality
- Cart icon and drawer

### **Footer**
- Newsletter signup
- Social media links
- Payment icons
- Multi-column layout

## Customization Guide

### **Adding Custom Sections**
1. Create new `.liquid` file in `/sections/`
2. Add schema for theme editor settings
3. Include in page templates via JSON
4. Style with CSS in `/assets/`

### **Modifying Animations**
1. Edit `blueprint-animations.js`
2. Use GSAP and ScrollTrigger APIs
3. Test on different devices
4. Optimize for performance

### **Custom Styling**
1. Add CSS to `base.css` or create new asset
2. Use CSS variables for consistency
3. Follow mobile-first approach
4. Test across browsers

### **3D Model Integration**
1. Create model in Spline
2. Optimize for web performance
3. Test loading times
4. Add fallback for unsupported devices

## Performance Optimization

### **Built-in Optimizations**
- Lazy loading for images and 3D models
- Optimized GSAP animations
- Efficient CSS and JavaScript
- Compressed assets

### **Recommended Practices**
- Optimize product images (WebP format)
- Use appropriate 3D model complexity
- Enable browser caching
- Monitor Core Web Vitals

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Requirements

### **Shopify Features**
- Online Store 2.0
- Shopify Scripts (for advanced cart features)
- Multi-currency support
- Shopify Payments integration

### **Third-party Integrations**
- Google Analytics 4
- Facebook Pixel
- Klaviyo email marketing
- Judge.me reviews
- Yotpo loyalty program

## Troubleshooting

### **Common Issues**

**Theme upload fails:**
- Ensure ZIP contains all required files
- Check file permissions
- Verify Shopify plan supports theme upload

**3D model not loading:**
- Verify Spline URL is correct
- Check model file size (keep under 10MB)
- Test on different devices

**Animations not working:**
- Check GSAP library loading
- Verify JavaScript console for errors
- Test on different browsers

**Mobile display issues:**
- Clear browser cache
- Test on actual devices
- Check responsive breakpoints

### **Support Resources**
- Shopify Theme Development Documentation
- GSAP Documentation
- Spline Documentation
- Browser Developer Tools

## Updates & Maintenance

### **Regular Updates**
- Monitor Shopify theme updates
- Update GSAP library versions
- Test new browser releases
- Optimize for Core Web Vitals

### **Backup Recommendations**
- Export theme before major changes
- Keep development environment
- Document customizations
- Test updates on staging store

## License & Credits

### **Third-party Libraries**
- GSAP (GreenSock Animation Platform)
- Shopify Liquid Template Language
- Modern CSS Reset

### **Fonts & Icons**
- System fonts with web font fallbacks
- SVG icons for scalability
- Icon libraries for social media

## Contact & Support

For technical support and customization requests:
- Theme documentation: This file
- Shopify Partner Dashboard
- Community forums
- Development resources

---

**Blueprint Theme v1.0**  
*Premium Shopify Theme for Streetwear Brands*

Last updated: December 2024 