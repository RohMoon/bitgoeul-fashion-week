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
    // 모바일에서는 1개, 데스크톱에서는 4개씩 보여줌
    const isMobile = window.innerWidth <= 768;
    let cardsPerView = isMobile ? 1 : 4;
    const totalCards = cards.length;
    let totalSlides = Math.ceil(totalCards / cardsPerView);

    function updateSlide() {
        // 첫 번째 카드의 실제 너비 가져오기
        const firstCard = cards[0];
        const cardWidth = firstCard.offsetWidth;
        const isMobileNow = window.innerWidth <= 768;
        const gap = isMobileNow ? 32 : 24; // 모바일: 2rem, 데스크톱: 1.5rem
        
        // viewport의 실제 너비 가져오기
        const viewport = document.querySelector('.slider-viewport');
        const viewportWidth = viewport ? viewport.offsetWidth : cardWidth;
        
        // 모바일에서는 viewport 중앙에 카드가 오도록 계산
        let moveDistance;
        if (isMobileNow) {
            moveDistance = currentIndex * (viewportWidth + gap);
        } else {
            moveDistance = currentIndex * cardsPerView * (cardWidth + gap);
        }
        
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
            // 화면 크기 변경 시 카드 개수 재계산
            const newIsMobile = window.innerWidth <= 768;
            const newCardsPerView = newIsMobile ? 1 : 4;
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                totalSlides = Math.ceil(totalCards / cardsPerView);
                currentIndex = 0; // 인덱스 초기화
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