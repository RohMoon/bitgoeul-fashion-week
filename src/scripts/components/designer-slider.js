/**
 * Designer Page Slider Component
 * Simple slider with basic navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Designer slider script loaded');
    
    const slider = document.querySelector('.collection-slider .slider-images');
    const slides = Array.from(document.querySelectorAll('.collection-slider .slide-image'));
    const leftArrow = document.querySelector('.collection-slider .arrow.left');
    const rightArrow = document.querySelector('.collection-slider .arrow.right');

    if (!slider || !slides.length || !leftArrow || !rightArrow) {
        console.warn('Designer slider elements not found');
        return;
    }

    let currentIndex = 0;
    const slidesToShow = 2; // 2개씩 보여줌
    const maxIndex = Math.max(0, slides.length - slidesToShow);

    function getSlideWidth() {
        return (window.innerWidth - 300) / 2; // 18.75rem = 300px
    }

    function updateSlider() {
        const slideWidth = getSlideWidth();
        const gap = 0; // CSS gap: 0와 일치
        const marginRight = -16; // CSS margin-right: -1rem = -16px와 일치
        const offset = currentIndex * (slideWidth + gap + marginRight);
        
        slider.style.transform = `translateX(-${offset}px)`;
        slider.style.transition = 'transform 0.3s ease-in-out';
        
        console.log('Slider updated:', { currentIndex, offset, slideWidth });
    }

    function nextSlide() {
        console.log('Next slide clicked, current:', currentIndex, 'max:', maxIndex);
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // 끝에서 처음으로
        }
        updateSlider();
    }

    function prevSlide() {
        console.log('Prev slide clicked, current:', currentIndex);
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // 처음에서 끝으로
        }
        updateSlider();
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

    // Initialize
    updateSlider();

    // Handle resize
    window.addEventListener('resize', () => {
        updateSlider();
    });

    console.log('Slider initialized with', slides.length, 'slides');
});