// Test soruları
const questions = [
    {
        question: "Beraber kesitlerini izlemeyi seviyoruz",
        optionA: {
            text: "Ben ağır regaipçiyim",
            image: "1a.jpg"
        },
        optionB: {
            text: "Game of Thrones",
            image: "1b.jpg"
        },
        correctAnswer: "A",
        isSpecial: false
    },
    {
        question: "kahvaltıda ne yeriz??",
        optionA: {
            text: "3 farklı tarladan çilek reçeli",
            image: "2a.jpg"
        },
        optionB: {
            text: "avakadolu tost",
            image: "2b.png"
        },
        correctAnswer: "A",
        isSpecial: false
    },
    {
        question: "kahvaltı hazırlayacağız ama önce ne bulmam lazım?",
        optionA: {
            text: "tencere",
            image: "3a.jpg"
        },
        optionB: {
            text: "tütsü",
            image: "3b.webp"
        },
        correctAnswer: "B",
        isSpecial: false
    },
    {
        question: "hadi ev bakmaya gidelim hangisi??",
        optionA: {
            text: "BU",
            image: "4a.jpg"
        },
        optionB: {
            text: "BUUUU!!!",
            image: "4b.jpg"
        },
        correctAnswer: "B",
        isSpecial: false
    },
    {
        question: "nil ve ardanın kahveleri karıştı doğru kahvelerine ulaşmalarına yardım et ki 55 yıl sonra dahi içebilsinler",
        correctAnswer: { nil: "americano", arda: "dandik" },
        isSpecial: true
    }
];

let currentQuestionIndex = 0;
let selectedOption = null;

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Arka plan müziğini başlat (kısık sesle)
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.volume = 0.2; // Kısık ses
    backgroundMusic.play().catch(e => {
        // Kullanıcı etkileşimi gerekebilir
        document.addEventListener('click', function startMusic() {
            backgroundMusic.play().catch(err => console.log('Müzik başlatılamadı'));
            document.removeEventListener('click', startMusic);
        }, { once: true });
    });
    
    showQuestion();
    
    // Normal sorular için seçenek kartlarına tıklama olayı
    document.getElementById('option-a').addEventListener('click', function() {
        if (!questions[currentQuestionIndex].isSpecial) {
            selectOption('A');
        }
    });
    
    document.getElementById('option-b').addEventListener('click', function() {
        if (!questions[currentQuestionIndex].isSpecial) {
            selectOption('B');
        }
    });
    
    // 5. soru için kontrol butonu
    document.getElementById('check-coffee-btn').addEventListener('click', function() {
        checkCoffeeAnswer();
    });
});

function showQuestion() {
    const question = questions[currentQuestionIndex];
    
    // Sorular arası geçiş efekti
    const normalBox = document.getElementById('normal-question-box');
    const specialBox = document.getElementById('special-question-box');
    
    if (question.isSpecial) {
        // 5. soru - özel yapı
        normalBox.classList.add('hidden');
        specialBox.classList.remove('hidden');
        specialBox.style.opacity = '0';
        specialBox.style.transform = 'translateY(20px)';
        setTimeout(() => {
            specialBox.style.transition = 'all 0.5s ease';
            specialBox.style.opacity = '1';
            specialBox.style.transform = 'translateY(0)';
        }, 50);
    } else {
        // Normal sorular
        specialBox.classList.add('hidden');
        normalBox.classList.remove('hidden');
        normalBox.style.opacity = '0';
        normalBox.style.transform = 'translateY(20px)';
        
        // Soru metnini güncelle
        document.getElementById('question-text').textContent = question.question;
        
        // Seçenekleri güncelle
        document.getElementById('text-a').textContent = question.optionA.text;
        document.getElementById('text-b').textContent = question.optionB.text;
        document.getElementById('image-a').src = question.optionA.image;
        document.getElementById('image-b').src = question.optionB.image;
        
        setTimeout(() => {
            normalBox.style.transition = 'all 0.5s ease';
            normalBox.style.opacity = '1';
            normalBox.style.transform = 'translateY(0)';
        }, 50);
    }
    
    // Progress bar'ı güncelle
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    
    // Seçimleri sıfırla
    selectedOption = null;
    const optionA = document.getElementById('option-a');
    const optionB = document.getElementById('option-b');
    if (optionA) {
        optionA.classList.remove('selected', 'wrong');
        optionB.classList.remove('selected', 'wrong');
    }
    
    // Kahve seçimlerini sıfırla
    const nilCoffee = document.getElementById('nil-coffee');
    const ardaCoffee = document.getElementById('arda-coffee');
    if (nilCoffee) {
        nilCoffee.value = '';
        ardaCoffee.value = '';
    }
}

function selectOption(option) {
    if (selectedOption !== null) return; // Zaten seçim yapıldıysa tekrar seçim yapma
    
    selectedOption = option;
    
    // Seçilen seçeneği işaretle
    const optionA = document.getElementById('option-a');
    const optionB = document.getElementById('option-b');
    
    optionA.classList.remove('selected', 'wrong');
    optionB.classList.remove('selected', 'wrong');
    
    if (option === 'A') {
        optionA.classList.add('selected');
    } else {
        optionB.classList.add('selected');
    }
    
    // Cevabı kontrol et
    setTimeout(() => {
        checkAnswer(option);
    }, 500);
}

function checkAnswer(selected) {
    const question = questions[currentQuestionIndex];
    const optionA = document.getElementById('option-a');
    const optionB = document.getElementById('option-b');
    const bidadeneSound = document.getElementById('bidadene-sound');
    
    if (selected === question.correctAnswer) {
        // Doğru cevap - doğru seçeneği yeşil yap
        if (selected === 'A') {
            optionA.classList.remove('selected');
            optionA.classList.add('selected');
        } else {
            optionB.classList.remove('selected');
            optionB.classList.add('selected');
        }
        
        // Konfeti patlat
        createConfetti();
        
        // Sonraki soruya geç (geçiş efekti ile)
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                // Tüm sorular bitti
                showFinalMessage();
            }
        }, 2500);
    } else {
        // Yanlış cevap
        if (selected === 'A') {
            optionA.classList.remove('selected');
            optionA.classList.add('wrong');
        } else {
            optionB.classList.remove('selected');
            optionB.classList.add('wrong');
        }
        
        // Bidadene sesi çal
        bidadeneSound.currentTime = 0;
        bidadeneSound.play().catch(e => console.log('Ses çalınamadı:', e));
        
        // Doğru cevabı göster
        if (question.correctAnswer === 'A') {
            optionA.classList.add('selected');
        } else {
            optionB.classList.add('selected');
        }
        
        // 2.5 saniye sonra seçimi kaldır ve tekrar deneme
        setTimeout(() => {
            optionA.classList.remove('wrong', 'selected');
            optionB.classList.remove('wrong', 'selected');
            selectedOption = null;
        }, 2500);
    }
}

function checkCoffeeAnswer() {
    const question = questions[currentQuestionIndex];
    const nilCoffee = document.getElementById('nil-coffee').value;
    const ardaCoffee = document.getElementById('arda-coffee').value;
    const bidadeneSound = document.getElementById('bidadene-sound');
    
    // Nil'in kahvesi "americano", Arda'nın kahvesi "dandik" olmalı
    if (nilCoffee === 'americano' && ardaCoffee === 'dandik') {
        // Doğru cevap
        createConfetti();
        
        // Sonraki soruya geç veya final mesajı
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showFinalMessage();
            }
        }, 2500);
    } else {
        // Yanlış cevap
        bidadeneSound.currentTime = 0;
        bidadeneSound.play().catch(e => console.log('Ses çalınamadı:', e));
        
        // Seçimleri sıfırla
        setTimeout(() => {
            document.getElementById('nil-coffee').value = '';
            document.getElementById('arda-coffee').value = '';
        }, 2500);
    }
}

function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff006e', '#ff4081', '#e91e63', '#8338ec', '#fb5607', '#ffbe0b', '#3a86ff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        confetti.style.width = (8 + Math.random() * 8) + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        
        container.appendChild(confetti);
        
        // Animasyon bitince kaldır
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 4000);
    }
}

function showFinalMessage() {
    // Final sayfasına yönlendir
    setTimeout(() => {
        window.location.href = 'final.html';
    }, 2000);
}
