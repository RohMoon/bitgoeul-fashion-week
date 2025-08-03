/**
 * Custom Scroll Snap Implementation
 * Handles section-by-section scrolling when CSS scroll-snap fails
 */

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.header-poster-section, .junior-info, .details-section');
    let currentSection = 0;
    let isScrolling = false;
    
    if (sections.length === 0) return;

    // 스크롤 방지 및 섹션 이동
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length || isScrolling) return;
        
        isScrolling = true;
        currentSection = index;
        
        sections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // 스크롤 완료 후 다시 이벤트 허용
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }

    // 휠 이벤트 처리
    document.addEventListener('wheel', (e) => {
        if (isScrolling) {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        
        if (e.deltaY > 0) {
            // 아래로 스크롤
            if (currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
            }
        } else {
            // 위로 스크롤
            if (currentSection > 0) {
                scrollToSection(currentSection - 1);
            }
        }
    }, { passive: false });

    // 키보드 이벤트 처리 (화살표 키)
    document.addEventListener('keydown', (e) => {
        if (isScrolling) return;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                if (currentSection < sections.length - 1) {
                    scrollToSection(currentSection + 1);
                }
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                if (currentSection > 0) {
                    scrollToSection(currentSection - 1);
                }
                break;
            case 'Home':
                e.preventDefault();
                scrollToSection(0);
                break;
            case 'End':
                e.preventDefault();
                scrollToSection(sections.length - 1);
                break;
        }
    });

    // 터치 이벤트 처리 (모바일)
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (isScrolling) return;
        
        touchEndY = e.changedTouches[0].screenY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > 50) { // 최소 50px 스와이프
            if (diff > 0) {
                // 위로 스와이프 (다음 섹션)
                if (currentSection < sections.length - 1) {
                    scrollToSection(currentSection + 1);
                }
            } else {
                // 아래로 스와이프 (이전 섹션)
                if (currentSection > 0) {
                    scrollToSection(currentSection - 1);
                }
            }
        }
    }, { passive: true });

    // 현재 섹션 감지 (스크롤바 사용시)
    function updateCurrentSection() {
        const scrollTop = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = scrollTop + rect.top;
            const sectionHeight = rect.height;
            
            if (scrollTop >= sectionTop - 100 && scrollTop < sectionTop + sectionHeight - 100) {
                currentSection = index;
            }
        });
    }

    // 초기 섹션 설정
    updateCurrentSection();
    
    console.log('Custom scroll snap initialized with', sections.length, 'sections');
});