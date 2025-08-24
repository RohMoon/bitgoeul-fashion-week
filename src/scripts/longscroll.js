document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation
    const nav = document.querySelector('.fixed-nav');
    let lastScroll = 0;
    
    // Keep navigation fixed and update scroll percentage
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Navigation always visible
        nav.style.transform = 'translateY(0)';
        
        // Change background opacity based on scroll
        if (currentScroll <= 0) {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        }
        
        lastScroll = currentScroll;
        
        // Update scroll indicator
        updateScrollIndicator();
    });
    
    // Update scroll indicator
    function updateScrollIndicator() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const indicator = document.querySelector('.scroll-indicator');
        if (indicator) {
            indicator.textContent = Math.round(scrollPercent) + '%';
        }
    }
    
    // Parallax effect for sections - reduced to prevent overlapping
    const sections = document.querySelectorAll('.scroll-section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const speed = 0.2; // Reduced speed to prevent overlapping
            
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = -(scrolled - section.offsetTop) * speed;
                
                // Apply parallax to images with containment
                const img = section.querySelector('.split-image img');
                if (img) {
                    // Limit transform to prevent overflow
                    const limitedYPos = Math.max(-50, Math.min(50, yPos * 0.3));
                    img.style.transform = `translateY(${limitedYPos}px) scale(1.05)`;
                }
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate children with delay
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.split-content h2, .split-content p, .gallery-item');
    animateElements.forEach(el => {
        el.classList.add('animate-child');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Gallery hover effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            galleryItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.5';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            galleryItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });
    
    // Video autoplay on scroll
    const videoSection = document.querySelector('.video-showcase-section');
    const videoIframe = videoSection?.querySelector('iframe');
    
    if (videoIframe) {
        const videoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video is in view - could trigger play if using YouTube API
                    console.log('Video in view');
                }
            });
        }, { threshold: 0.5 });
        
        videoObserver.observe(videoSection);
    }
    
    // Form validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input, textarea');
            let valid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = '#ff0000';
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            if (!valid) {
                e.preventDefault();
                alert('Please fill in all fields');
            }
        });
    }
    
    // Add scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        background: #ffffff;
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});