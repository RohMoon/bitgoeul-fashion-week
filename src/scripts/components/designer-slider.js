/**
 * Designer Page Slider Component
 * Display-based slider showing 2 images at a time
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Designer slider script loaded');
    
    const slides = Array.from(document.querySelectorAll('.collection-slider .slide-image'));
    const leftArrow = document.querySelector('.collection-slider .arrow.left');
    const rightArrow = document.querySelector('.collection-slider .arrow.right');

    if (!slides.length || !leftArrow || !rightArrow) {
        console.warn('Designer slider elements not found');
        return;
    }

    let currentIndex = 0;
    const slidesToShow = 2; // 2개씩 보여줌
    const totalGroups = Math.ceil(slides.length / slidesToShow); // 총 그룹 개수

    function showSlides() {
        // 모든 슬라이드 숨김
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // 현재 그룹의 2개 슬라이드만 표시
        const startIndex = currentIndex * slidesToShow;
        const endIndex = Math.min(startIndex + slidesToShow, slides.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            if (slides[i]) {
                slides[i].classList.add('active');
            }
        }
        
        console.log(`Showing slides ${startIndex + 1}-${endIndex} (group ${currentIndex + 1}/${totalGroups})`);
    }

    function nextSlide() {
        console.log('Next slide clicked, current group:', currentIndex + 1, 'total groups:', totalGroups);
        currentIndex = (currentIndex + 1) % totalGroups; // 다음 그룹, 마지막에서 첫 번째로
        showSlides();
    }

    function prevSlide() {
        console.log('Prev slide clicked, current group:', currentIndex + 1);
        currentIndex = (currentIndex - 1 + totalGroups) % totalGroups; // 이전 그룹, 첫 번째에서 마지막으로
        showSlides();
    }

    // Event listeners
    rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Right arrow clicked');
        nextSlide();
    });

    leftArrow.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Left arrow clicked');
        prevSlide();
    });

    // Initialize - 첫 번째 그룹 표시
    showSlides();

    // Auto-play functionality - 3초마다 자동 이동
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 2000); // 2초마다 이동
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause on hover
    const sliderContainer = document.querySelector('.collection-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Also stop auto-play when arrows are clicked, then restart after a delay
    rightArrow.addEventListener('click', () => {
        stopAutoPlay();
        setTimeout(startAutoPlay, 5000); // 5초 후 다시 시작
    });
    
    leftArrow.addEventListener('click', () => {
        stopAutoPlay();
        setTimeout(startAutoPlay, 5000); // 5초 후 다시 시작
    });

    console.log(`Slider initialized with ${slides.length} slides, ${totalGroups} groups, auto-play enabled`);
});