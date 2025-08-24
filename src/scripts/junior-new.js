document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navigation background on scroll
    const nav = document.querySelector('.junior-nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.98)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const posterImage = document.querySelector('.poster-image-wrapper');
    
    if (heroSection && posterImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            posterImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Fade in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Add fade animation to elements
    const animatedElements = document.querySelectorAll('.detail-card, .gallery-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Create fade-in class
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Gallery image lightbox
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            `;

            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);

            // Fade in
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);

            lightbox.addEventListener('click', function() {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            });
        });
    });

    // Hover effect for detail cards
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate hero title on load
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const spans = heroTitle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px)';
            span.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100);
        });
    }
});