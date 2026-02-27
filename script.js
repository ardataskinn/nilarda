// Uçan kalpler ve balonlar oluştur
function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    
    // Kalp oluşturma fonksiyonu
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (10 + Math.random() * 10) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (1.5 + Math.random() * 1) + 'rem';
        
        // Rastgele animasyon yönü
        if (Math.random() > 0.5) {
            heart.style.animationName = 'floatUpLeft';
        }
        
        container.appendChild(heart);
        
        // Animasyon bitince kaldır
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 25000);
    }
    
    // Balon oluşturma fonksiyonu
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        
        // Rastgele renk seç
        const colors = ['balloon-red', 'balloon-pink', 'balloon-purple', 'balloon-orange'];
        balloon.classList.add(colors[Math.floor(Math.random() * colors.length)]);
        
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.animationDuration = (15 + Math.random() * 10) + 's';
        balloon.style.animationDelay = Math.random() * 2 + 's';
        balloon.style.width = (30 + Math.random() * 20) + 'px';
        balloon.style.height = (40 + Math.random() * 20) + 'px';
        
        // Rastgele animasyon yönü
        if (Math.random() > 0.5) {
            balloon.style.animationName = 'floatUpLeft';
        }
        
        container.appendChild(balloon);
        
        // Animasyon bitince kaldır
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.parentNode.removeChild(balloon);
            }
        }, 30000);
    }
    
    // İlk elementleri oluştur
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createHeart(), i * 500);
        setTimeout(() => createBalloon(), i * 600);
    }
    
    // Düzenli olarak yeni elementler oluştur
    setInterval(() => {
        if (Math.random() > 0.5) {
            createHeart();
        } else {
            createBalloon();
        }
    }, 2000);
}

// Arka plan müziğini başlat
document.addEventListener('DOMContentLoaded', function() {
    // Uçan elementleri başlat
    createFloatingElements();
    
    const audio = document.getElementById('background-music');
    
    // Kullanıcı etkileşimi sonrası müziği başlat
    let musicStarted = false;
    
    function startMusic() {
        if (!musicStarted) {
            audio.volume = 0.5; // Ses seviyesini %50 yap
            audio.play().catch(function(error) {
                console.log('Müzik otomatik başlatılamadı:', error);
            });
            musicStarted = true;
        }
    }
    
    // İlk tıklama veya dokunma ile müziği başlat
    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('touchstart', startMusic, { once: true });
    
    // Enter tuşu ile de gönderebilme
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const errorMessage = document.getElementById('error-message');
    
    answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
    
    // Giriş butonu işlevi
    submitBtn.addEventListener('click', function() {
        startMusic(); // Müzik başlatılmadıysa başlat
        
        const answer = answerInput.value.trim().toLowerCase();
        const correctAnswer = 'kedi';
        
        if (answer === correctAnswer) {
            // Doğru cevap - test sayfasına geçiş
            window.location.href = 'test.html';
        } else {
            // Yanlış cevap - hata mesajı göster
            errorMessage.textContent = 'nerede benim nilimmm';
            errorMessage.classList.remove('hidden');
            
            // Input'u temizle ve odakla
            answerInput.value = '';
            answerInput.focus();
            
            // 3 saniye sonra hata mesajını gizle
            setTimeout(function() {
                errorMessage.classList.add('hidden');
            }, 3000);
        }
    });
    
    // Sayfa yüklendiğinde input'a odaklan
    answerInput.focus();
});

