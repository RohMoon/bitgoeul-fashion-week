/**
 * Utility Helper Functions
 */

// Debounce function for performance optimization
export function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll/resize events
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
export function scrollToElement(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Get CSS custom property value
export function getCSSVariable(property) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(property).trim();
}

// Set CSS custom property
export function setCSSVariable(property, value) {
    document.documentElement.style.setProperty(property, value);
}

// Check if device is mobile
export function isMobile() {
    return window.innerWidth <= 768;
}

// Check if device is tablet
export function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

// Check if device is desktop
export function isDesktop() {
    return window.innerWidth > 1024;
}

// Format number with commas
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Clamp number between min and max
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

// Generate unique ID
export function generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}