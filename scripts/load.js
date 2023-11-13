const load = () => {
    const mainContainer = document.querySelector('main');
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingImage = loadingScreen.querySelector('img');
    const texts = loadingScreen.querySelectorAll('h1, h2');

    let currentTextIndex = 0;

    const showTextByIndex = (index) => {
        texts.forEach(text => {
            text.style.display = 'none';
        });
        texts[index].style.display = 'block';
    };

    setTimeout(() => {
        if (loadingImage) {
            loadingImage.classList.add('scale-up');
        }
    }, 750);

    setTimeout(() => {
        loadingScreen.style.backgroundColor = 'var(--text-color)';

        if (loadingImage) {
            loadingImage.style.display = 'none';
        }
    }, 1500);


    setTimeout(() => {
        setInterval(() => {
            showTextByIndex(currentTextIndex);
            currentTextIndex = (currentTextIndex + 1) % texts.length;
        }, 750);
    }, 1500);
};

const hideLoadingScreen = () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContainer = document.querySelector('main');
    loadingScreen.style.display = 'none';
    mainContainer.classList.remove('no-scroll');
    mainContainer.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', load);