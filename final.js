// Fotoğraf listesi
const photos = [
    'beraber resimlerimiz/47f6e782-83b9-4afd-b8d9-8f2c4bd9700b.JPG',
    'beraber resimlerimiz/88920DDD-FEF1-4EA5-A827-98463A454F19.JPG',
    'beraber resimlerimiz/bc0da8ec-65f3-4522-8bab-f47b8d7c302a.JPG',
    'beraber resimlerimiz/f56a14cc-d474-41d7-bf07-7fbf31057af5.JPG',
    'beraber resimlerimiz/IMG_3500.jpg'
];

document.addEventListener('DOMContentLoaded', function() {
    // Arka plan müziğini başlat
    const finalMusic = document.getElementById('final-music');
    finalMusic.volume = 0.5;
    
    // Müziği başlat
    const startMusic = () => {
        finalMusic.play().catch(err => console.log('Müzik başlatılamadı:', err));
    };
    
    // İlk tıklama veya sayfa yüklendiğinde müziği başlat
    startMusic();
    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('touchstart', startMusic, { once: true });
    
    // Fotoğrafları ekle
    const photoScroll = document.getElementById('photo-scroll');
    
    // Fotoğrafları iki kez ekle (sonsuz döngü için)
    for (let i = 0; i < 2; i++) {
        photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo;
            img.alt = 'Beraber resimlerimiz';
            img.loading = 'lazy';
            img.onerror = function() {
                // Eğer JPG yoksa HEIC'i dene
                if (photo.includes('IMG_3500.jpg')) {
                    this.src = 'beraber resimlerimiz/IMG_3500.HEIC';
                }
            };
            photoScroll.appendChild(img);
        });
    }
    
    // Fotoğrafların yüklenmesini bekle
    const images = photoScroll.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;
    
    if (totalImages === 0) return;
    
    const checkAllLoaded = () => {
        if (loadedCount === totalImages) {
            // Tüm fotoğraflar yüklendi, animasyon zaten CSS'te tanımlı
            console.log('Tüm fotoğraflar yüklendi');
        }
    };
    
    images.forEach(img => {
        if (img.complete) {
            loadedCount++;
            checkAllLoaded();
        } else {
            img.addEventListener('load', () => {
                loadedCount++;
                checkAllLoaded();
            });
            img.addEventListener('error', () => {
                loadedCount++;
                checkAllLoaded();
            });
        }
    });
    
    // Otomatik scroll için
    const textContainer = document.querySelector('.text-scroll-container');
    
    if (textContainer) {
        let isUserScrolling = false;
        let scrollTimeout = null;
        let lastScrollTop = 0;
        let animationFrameId = null;
        
        // Otomatik scroll fonksiyonu (requestAnimationFrame ile)
        const autoScroll = () => {
            if (!isUserScrolling && textContainer) {
                const maxScroll = textContainer.scrollHeight - textContainer.clientHeight;
                const currentScroll = textContainer.scrollTop;
                
                if (currentScroll < maxScroll - 1) {
                    textContainer.scrollTop += 0.3; // Yavaş kaydırma
                    animationFrameId = requestAnimationFrame(autoScroll);
                } else {
                    // En alta ulaştıysa biraz bekle ve başa dön
                    setTimeout(() => {
                        textContainer.scrollTop = 0;
                        animationFrameId = requestAnimationFrame(autoScroll);
                    }, 2000);
                }
            } else {
                animationFrameId = requestAnimationFrame(autoScroll);
            }
        };
        
        // Kullanıcı scroll tespiti
        const handleUserScroll = () => {
            const currentScrollTop = textContainer.scrollTop;
            
            // Eğer kullanıcı scroll yaptıysa (otomatik scroll'dan farklıysa)
            if (Math.abs(currentScrollTop - lastScrollTop) > 1) {
                isUserScrolling = true;
                clearTimeout(scrollTimeout);
                
                // 3 saniye scroll yapılmazsa otomatik scroll'u tekrar başlat
                scrollTimeout = setTimeout(() => {
                    isUserScrolling = false;
                    lastScrollTop = textContainer.scrollTop;
                    if (!animationFrameId) {
                        animationFrameId = requestAnimationFrame(autoScroll);
                    }
                }, 3000);
            }
            
            lastScrollTop = currentScrollTop;
        };
        
        // Event listener'lar
        textContainer.addEventListener('scroll', handleUserScroll, { passive: true });
        
        textContainer.addEventListener('wheel', () => {
            isUserScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isUserScrolling = false;
                lastScrollTop = textContainer.scrollTop;
                if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(autoScroll);
                }
            }, 3000);
        }, { passive: true });
        
        // Touch event'leri için
        let touchStartY = 0;
        textContainer.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            isUserScrolling = true;
            clearTimeout(scrollTimeout);
        }, { passive: true });
        
        textContainer.addEventListener('touchmove', () => {
            isUserScrolling = true;
            clearTimeout(scrollTimeout);
        }, { passive: true });
        
        textContainer.addEventListener('touchend', () => {
            scrollTimeout = setTimeout(() => {
                isUserScrolling = false;
                lastScrollTop = textContainer.scrollTop;
                if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(autoScroll);
                }
            }, 3000);
        });
        
        // Otomatik scroll'u başlat
        setTimeout(() => {
            animationFrameId = requestAnimationFrame(autoScroll);
        }, 1500);
    }
});
