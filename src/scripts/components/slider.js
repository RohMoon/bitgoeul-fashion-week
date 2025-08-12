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

    let currentIndex = 0;
    const cardsPerView = 4; // 한 번에 보여줄 카드 수
    const totalCards = cards.length;
    const totalSlides = Math.ceil(totalCards / cardsPerView);

    function updateSlide() {
        // 첫 번째 카드의 실제 너비 가져오기
        const firstCard = cards[0];
        const cardWidth = firstCard.offsetWidth;
        const gap = 24; // 1.5rem = 24px
        
        // 정확히 4개씩 이동하기 위한 거리 계산
        const moveDistance = currentIndex * cardsPerView * (cardWidth + gap);
        
        track.style.transform = `translateX(-${moveDistance}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
    }

    function prevSlide() {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
        updateSlide();
    }

    // Event listeners
    rightBtn.addEventListener('click', nextSlide);
    leftBtn.addEventListener('click', prevSlide);

    // Auto-play
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