const getProjects = () => {
    let index = 0;
  
    const mainContainer = document.querySelector('#projects-section');
    mainContainer.classList.add('no-scroll');

    const projectsRef = db.collection('projects');

    const createProjectCard = (project) => {
        const a = document.createElement('a');
        a.innerHTML = `
          <div class="snake">
            <div class="snake-line-top"></div>
            <div class="snake-circle">
              <div class="snake-outer-circle"></div>
              <div class="snake-inner-circle"></div>
              <div class="snake-square"></div>
            </div>
            <div class="snake-line-bottom"></div>
          </div>
          <h1 class="single-project-title">${project.title}</h1>
          <img src="${project.image}" alt="Project Image">
        `;

        a.classList.add('single-project');
        a.href = `project.html?id=${project.id}`
        return a;
      };

    const hideLoadingScreen = () => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.display = 'none';
        mainContainer.classList.remove('no-scroll');
        mainContainer.scrollTo(0, 0);
    };
      
    projectsRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const projectData = doc.data();
          const projectCard = createProjectCard({
            ...projectData,
            id: doc.id // Include the document id if you need to create a link to the project
          });
          mainContainer.appendChild(projectCard);
        });
    }).then(() => {
        hideLoadingScreen();
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
};

document.addEventListener('DOMContentLoaded', getProjects);

