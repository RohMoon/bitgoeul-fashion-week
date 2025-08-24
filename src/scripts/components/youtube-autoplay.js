// YouTube Autoplay on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.photo-section .video-container');
    const iframe = videoContainer?.querySelector('iframe');
    
    if (!iframe) return;
    
    // YouTube Player API 로드
    let player;
    let isPlayerReady = false;
    
    // YouTube IFrame API 스크립트 추가
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // YouTube API Ready 콜백
    window.onYouTubeIframeAPIReady = function() {
        const videoId = iframe.src.match(/embed\/([^?]+)/)?.[1];
        if (!videoId) return;
        
        player = new YT.Player(iframe, {
            videoId: videoId,
            playerVars: {
                'autoplay': 0,
                'mute': 1, // 자동재생을 위해 음소거 필수
                'playsinline': 1,
                'rel': 0,
                'modestbranding': 1
            },
            events: {
                'onReady': function(event) {
                    isPlayerReady = true;
                    checkVideoVisibility();
                },
                'onStateChange': function(event) {
                    // 비디오가 끝나면 다시 재생
                    if (event.data === YT.PlayerState.ENDED) {
                        player.seekTo(0);
                        player.playVideo();
                    }
                }
            }
        });
    };
    
    // Intersection Observer로 비디오 가시성 체크
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% 이상 보일 때 재생
    };
    
    let hasPlayed = false;
    
    function checkVideoVisibility() {
        if (!isPlayerReady || !player) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 뷰포트에 들어왔을 때
                    if (!hasPlayed) {
                        player.playVideo();
                        hasPlayed = true;
                    } else {
                        // 다시 스크롤해서 들어온 경우
                        if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
                            player.playVideo();
                        }
                    }
                } else {
                    // 뷰포트를 벗어났을 때
                    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
                        player.pauseVideo();
                    }
                }
            });
        }, observerOptions);
        
        observer.observe(videoContainer);
    }
});