/**
 * Designer Page Slider Component
 * Handles the collection images slider with infinite scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider-images');
    const frame = document.querySelector('.slider-frame');
    const slides = Array.from(document.querySelectorAll('.slide-image'));
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');

    if (!slider || !slides.length || !leftArrow || !rightArrow) {
        console.warn('Designer slider elements not found');
        return;
    }

    const visibleSlides = getVisibleSlides();
    const gap = 60;
    const slideWidth = 610;
    let currentIndex = visibleSlides;
    let isTransitioning = false;

    function getVisibleSlides() {
        return window.innerWidth <= 768 ? 1 : 2;
    }

    // Create clones for infinite scroll
    function createClones() {
        const clonesBefore = slides.slice(-visibleSlides).map(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('clone');
            return clone;
        });

        const clonesAfter = slides.slice(0, visibleSlides).map(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('clone');
            return clone;
        });

        clonesBefore.forEach(clone => slider.prepend(clone));
        clonesAfter.forEach(clone => slider.appendChild(clone));
    }

    function setPosition(noTransition = false) {
        if (isTransitioning) return;
        
        const offset = (slideWidth + gap) * currentIndex;
        
        if (noTransition) {
            slider.style.transition = 'none';
        } else {
            slider.style.transition = 'transform 0.5s ease-in-out';
        }
        
        slider.style.transform = `translateX(-${offset}px)`;
    }

    function nextSlide() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        currentIndex++;
        setPosition();

        const totalSlides = document.querySelectorAll('.slide-image').length;
        
        if (currentIndex === totalSlides - visibleSlides) {
            setTimeout(() => {
                currentIndex = visibleSlides;
                setPosition(true);
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    function prevSlide() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        currentIndex--;
        setPosition();

        const totalSlides = document.querySelectorAll('.slide-image').length;
        
        if (currentIndex === 0) {
            setTimeout(() => {
                currentIndex = totalSlides - visibleSlides * 2;
                setPosition(true);
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    // Initialize
    createClones();
    setPosition(true);

    // Event listeners
    rightArrow.addEventListener('click', nextSlide);
    leftArrow.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setPosition(true);
        }, 250);
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
});