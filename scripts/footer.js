document.addEventListener("DOMContentLoaded", () => {
  setupIntersectionObserver();
  handleAboutSectionScroll();
});

const setupIntersectionObserver = () => {
  const options = {
      root: null, // using the viewport as the root
      rootMargin: '0px',
      threshold: 0.5 // trigger when at least 50% of the element is visible
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  // Add the sections to be observed
  observer.observe(document.querySelector('#about-section'));
  observer.observe(document.querySelector('#projects-section'));
  observer.observe(document.querySelector('#contact-section'));
};

const handleIntersect = (entries, observer) => {
  entries.forEach(entry => {
    const linkId = `${entry.target.id}-link`;
    const link = document.getElementById(linkId);

    if (entry.isIntersecting) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
};

const handleAboutSectionScroll = () => {
  const aboutSection = document.querySelector('#about-section');
  const aboutLink = document.querySelector('#about-section-link');
  const mainContainer = document.querySelector('main');

  mainContainer.addEventListener('scroll', () => {
    const sectionTop = aboutSection.offsetTop;
    const sectionBottom = sectionTop + aboutSection.offsetHeight;
    const viewportMiddle = mainContainer.scrollTop + (window.innerHeight / 2);
    const isWithinSection = viewportMiddle >= sectionTop && viewportMiddle <= sectionBottom;

    console.log(sectionTop);
    console.log(sectionBottom);
    console.log(sectionTop);
    console.log(isWithinSection);

    if (isWithinSection) {
      aboutLink.classList.add('active-link');
    } else {
      aboutLink.classList.remove('active-link');
    }
  });
};