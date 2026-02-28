document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('bg-container');
    const splash = document.getElementById('splash-screen');
    const ctaText = document.getElementById('main-cta');
    const langCurrent = document.querySelector('.lang-current');
    const langOptions = document.querySelectorAll('.lang-option');
    const langSelector = document.querySelector('.language-selector');

    const translations = {
        'UKR': 'Натисни щоб продовжити',
        'ENG': 'Click to continue',
        'RUS': 'Нажми чтобы продолжить'
    };

    // 1. ГЕНЕРАЦІЯ ФОНУ ZXIL (Твоя ідеальна сітка)
    const initBackground = () => {
        container.innerHTML = '';
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.fillStyle = 'black';
        const fontSize = canvas.width * 0.55; 
        ctx.font = `bold ${fontSize}px Arial`; 
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const offsetX = canvas.width * 0.05; 
        ctx.fillText('ZXIL', canvas.width / 2 + offsetX, canvas.height / 2);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const stepX = 45; 
        const stepY = 20; 

        for (let y = 0; y < canvas.height; y += stepY) {
            for (let x = 0; x < canvas.width; x += stepX) {
                const logo = document.createElement('span');
                logo.classList.add('background-logo');
                logo.textContent = 'zxil.cloo';
                
                const pixelIndex = (Math.floor(y) * canvas.width + Math.floor(x)) * 4 + 3;
                
                if (imageData[pixelIndex] > 50) {
                    logo.style.color = 'rgba(255, 0, 0, 0.45)'; 
                    logo.style.zIndex = '2';
                } else {
                    logo.style.color = 'rgba(255, 0, 0, 0.05)'; 
                    logo.style.zIndex = '1';
                }

                logo.style.left = x + 'px';
                logo.style.top = y + 'px';
                logo.style.animationDelay = Math.random() + 's';
                container.appendChild(logo);
            }
        }
    };

    initBackground();

    // 2. ПЕРЕМИКАННЯ МОВ (БЕЗ ЗАКРИТТЯ ЕКРАНУ)
    langOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            // ЦЕ ГОЛОВНЕ: зупиняємо клік, щоб він не йшов на фон splash-screen
            event.preventDefault();
            event.stopPropagation();

            const selectedLang = option.innerText;
            const currentLang = langCurrent.innerText;

            // Міняємо текст на головній кнопці та в списку
            langCurrent.innerText = selectedLang;
            option.innerText = currentLang;

            // Змінюємо сам переклад тексту
            if (translations[selectedLang]) {
                ctaText.innerText = translations[selectedLang];
            }
            
            console.log("Мова змінена на:", selectedLang);
        });
    });

    // Додатковий захист: клік по самому контейнеру вибору мови не закриває сайт
    langSelector.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // 3. ЗАКРИТТЯ ЕКРАНУ ПРИ КЛІКУ НА ФОН
    splash.addEventListener('click', () => {
        splash.classList.add('fade-out');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('resize', initBackground);
});
// Захист соціальних кнопок від закриття екрану
const socialSidebar = document.querySelector('.social-sidebar');
socialSidebar.addEventListener('click', (e) => {
    e.stopPropagation(); // Тепер клік по іконках не прибирає сплеш-скрін
});
