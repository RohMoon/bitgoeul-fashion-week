/**
 * Main Page Slider Component
 * Handles the designer cards slider on index page
 */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const cards = document.querySelectorAll('.card');
    const leftBtn = document.querySelector('.arrow.left');
    const rightBtn = document.querySelector('.arrow.right');

    if (!track || !cards.length || !leftBtn || !rightBtn) {
        console.warn('Slider elements not found');
        return;
    }

    const visibleCount = getVisibleCount();
    let currentIndex = 0;

    function getVisibleCount() {
        return window.innerWidth <= 768 ? 1 : 3;
    }

    function updateSlide() {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 40;
        const offset = (cardWidth + gap) * currentIndex;
        track.style.transform = `translateX(-${offset}px)`;
    }

    function nextSlide() {
        const maxIndex = cards.length - getVisibleCount();
        currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
        updateSlide();
    }

    function prevSlide() {
        const maxIndex = cards.length - getVisibleCount();
        currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
        updateSlide();
    }

    // Event listeners
    rightBtn.addEventListener('click', nextSlide);
    leftBtn.addEventListener('click', prevSlide);

    // Auto-play (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Start auto-play
    startAutoPlay();

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const maxIndex = cards.length - getVisibleCount();
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            updateSlide();
        }, 250);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
        }
    });

    // Initialize
    updateSlide();
});