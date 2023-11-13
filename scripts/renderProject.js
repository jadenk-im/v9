const renderProject = () => {
  let index = 0;

  const mainContainer = document.querySelector('.project-container');
  mainContainer.classList.add('no-scroll');

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const projectId = urlParams.get('id');

  const fetchFirebaseData = () => {
      return db.collection('projects').doc(projectId).get().then(doc => {
          if (doc.exists) {
              const projectItem = doc.data();
              
              const content = projectItem.content;
              content.forEach(item => {
                  if (item.startsWith('https://')) {
                      renderImage(projectItem, item, mainContainer, 'eager');
                      index++;
                  } else {
                      renderEmbed(mainContainer, item);
                  }
              });
          } else {
              console.log('No such document!');
          }
          return doc;
      });
  };

  const waitForAllVimeoLoads = () => {
    const vimeoIframes = document.querySelectorAll('.video-container iframe');
    const promises = [];

    console.log(vimeoIframes);
  
    vimeoIframes.forEach(iframe => {
      const promise = new Promise(resolve => {
        const player = new Vimeo.Player(iframe);
        player.on('loaded', resolve);
      });
      promises.push(promise);
    });
  
    if (!promises.length) {
      promises.push(Promise.resolve());
    }
  
    return Promise.all(promises);
  };  

  const renderImage = (projectItem, img, container) => {
      const image = document.createElement('img');
      image.className = 'project-image transition-text';

      image.setAttribute('alt', `${projectItem.title} Image ${index + 1}`);
      image.setAttribute('loading', 'eager');
      image.setAttribute('src', img);

      container.appendChild(image);
  };

  const renderEmbed = (container, videoId) => {
      const embedContainer = document.createElement('div');
      embedContainer.className = 'video-container';

      const embed = document.createElement('iframe');
      embed.setAttribute('src', `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&autopause=0&background=1&title=0&byline=0&portrait=0`);
      embed.setAttribute('width', '100%');
      embed.setAttribute('height', '100%');
      embed.setAttribute('frameborder', '0');
      embed.setAttribute('allow', 'autoplay; picture-in-picture');
      embed.setAttribute('allowfullscreen', '');
      embed.setAttribute('loading', 'eager');

      const overlay = document.createElement('div');
      overlay.className = 'video-overlay';

      embedContainer.appendChild(embed);
      embedContainer.appendChild(overlay);
      container.appendChild(embedContainer);
  };

  const hideLoadingScreen = () => {
      const loadingScreen = document.querySelector('.loading-screen');
      loadingScreen.style.display = 'none';
      mainContainer.classList.remove('no-scroll');
      mainContainer.scrollTo(0, 0);
  };

  fetchFirebaseData().then(() => {
    return waitForAllVimeoLoads();
  }).then(() => {
    hideLoadingScreen();
  }).catch(error => {
    console.log('Error:', error);
  });
};

renderProject();