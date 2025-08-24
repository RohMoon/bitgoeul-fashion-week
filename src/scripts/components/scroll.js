// Scroll Indicator Component
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        // Update scroll percentage
        function updateScrollIndicator() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            if (scrolled > 0) {
                scrollIndicator.textContent = Math.round(scrolled) + '%';
            } else {
                scrollIndicator.textContent = 'Scroll';
            }
        }
        
        // Throttle scroll event for better performance
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollIndicator);
                ticking = true;
                setTimeout(() => {
                    ticking = false;
                }, 100);
            }
        }
        
        // Listen for scroll events
        window.addEventListener('scroll', requestTick);
        
        // Initial call
        updateScrollIndicator();
    }
});