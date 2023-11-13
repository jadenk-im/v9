const scrollAbout = () => {
    const mainContainer = document.querySelector('main');
    const aboutSection = document.querySelector('#about-section');
    const scrollAmount = aboutSection.offsetHeight / 14;

    mainContainer.addEventListener('scroll', () => {
        const index = Math.floor(mainContainer.scrollTop / scrollAmount) + 1;
        const slides = document.querySelectorAll('.slide');

        slides.forEach((slide, i) => {
            slide.style.display = (i + 1 === index) ? 'flex' : 'none';
        });
    });
};

document.addEventListener("DOMContentLoaded", scrollAbout);
