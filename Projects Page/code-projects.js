        // FILTERING THE PROJECTS

let filterBtns = document.querySelectorAll('.filter-projects');
let btnsArray = Array.from(filterBtns);
let projects = document.querySelectorAll('.col-projects');

let filteredArr = []
let clickedBtns = []

btnsArray.map(f => {
    f.addEventListener('click', () => {

      let dataSearch = f.dataset.search;
      let projectArray = Array.from(projects);

      clickedBtns.push(f)

      toggleButton(f,clickedBtns)

      let resetBtn = dataSearch === "clear";

      getFiltered(dataSearch,projectArray,resetBtn)
      resetFilter(projectArray,filteredArr,resetBtn)

    })
  })
function toggleButton(fBtn) {

  fBtn.classList.toggle('FilterBorder')

  let getClicked = clickedBtns.filter((v,i, arr) => {
    return arr.indexOf(v) === i
  })

  let mapClicked = getClicked.map(v => {
    return v.classList.contains('FilterBorder')
  })

  let isTrueClicked = mapClicked.every(Boolean)


  if (fBtn.dataset.search === "clear" || (getClicked.length >= 3 && isTrueClicked)) {
    btnsArray.forEach(btn => {
      btn.classList.remove('FilterBorder')
      clickedBtns = [];
    })
  }

}
function resetFilter(pArr,fArr,resetBtn) {

  if (!fArr.length || resetBtn || fArr.length > 8) {
    pArr.forEach(p => {
      gsap.to(p, .5, {opacity:1})

      filteredArr = [];
    })
  }

}
function getFiltered(filterVal, pArr,resetBtn) {

  // CHECK FOR VALUES
  pArr.filter((p,i,arr) => {

    // FILTER
    if (arr[0]) {
      if (p.classList.contains('filter')) {
        p.style.opacity = 1;
    }
    // PROCEED WITH FILTER
    else {

      let topDown = p.querySelector('.top-down-opacity');
      let dataSearchProject = p.dataset.type;
      let isIn = filteredArr.includes(i)
      if (dataSearchProject === filterVal) {
        let isFiltered = filteredArr.indexOf(i);

        if (isIn) {
          filteredArr.splice(isFiltered,1);
          gsap.to(p, .5, {opacity:.1})

        } else {
          gsap.to(p,.2, {opacity:1})
          gsap.from(topDown,1.25, {y:-500,opacity:.9})
          // gsap.from(topDown,1,{opacity:1})
          filteredArr.push(i)
        }
      } else if (!isIn) {
        gsap.to(p, .5, {opacity:.4})

      }
    }}
  })

}

          // GOING INTO DETAILS ANIMATIONS, CLICK ON COLUMN

let viewProjects = document.querySelectorAll('.view-projects');
let viewArr = Array.from(viewProjects);
let grid = document.querySelector('.grid-projects');
let filterCol = document.querySelector('.filter')
const projectsArr = Array.from(projects);
let stars = document.querySelector('.stars');

projectsArr.map((proj,i,arr) => {
  proj.addEventListener('click', () => {

    let insideColArr = Array.from(proj.querySelector('.hold-projects').children);
    let titleRotate = insideColArr[0];
    let description = insideColArr[1]
    let langs = insideColArr[2]
    let btnsProjProceed = insideColArr[5]
    let imgProj = insideColArr[3]
    let stars = insideColArr[4]
    let titleRect = titleRotate.getBoundingClientRect()
    const exitProj = proj.querySelector('.i-exit')

    // description POSITION
    let calcTitPos = titleRect.height - titleRect.width

    const tlmProjects = new TimelineMax({})

    tlmProjects
    .add(function(){

      btnsArray.forEach(btn => {
        tlmProjects.reversed() ? btn.setAttribute('style', 'pointer-events:auto;') : btn.setAttribute('style', 'pointer-events:none;')
        filteredArr = [];
        clickedBtns = [];
        btn.classList.remove('FilterBorder')
      })

      tlmProjects.reversed() ? langs.style.display = "block" : langs.style.display = "none";

      tlmProjects.reversed() ? proj.setAttribute('style', 'pointer-events:auto;'): proj.setAttribute('style', 'pointer-events:none;');


      tlmProjects.reversed() ? stars.setAttribute('style', 'display:block;'): stars.setAttribute('style', 'display:none;');

      projects.forEach(p => {
        let opacityDirection = tlmProjects.reversed() ? 1 : .5;
        tlmProjects.reversed() ? p.setAttribute('style', 'pointer-events:auto;'): p.setAttribute('style', 'pointer-events:none;');
        p.style.width = "100%"
        p.style.opacity = opacityDirection

      })
      proj.style.opacity = 1;
    })
    .to(proj,.4, {width:'200%'})
      .to(titleRotate,.4, {rotation:-90, transformOrigin: '50% 50%', y:-titleRect.height/2 + titleRect.width/2},"same")
      .to(description, .4,{opacity:1,y:-calcTitPos,ease:'back',display:'block'})
      .add(function(){
        let descriptionRect = description.getBoundingClientRect();
        imgProj.style.top = descriptionRect.bottom + 'px';
        ;})
      .to(imgProj, .4,{opacity:1, scale:1,ease:'back',display:'block'},'same2')
      .to(btnsProjProceed, .4,{opacity:1,duration:.25, y:-50,ease:'back',display:'block'},"same")
      .to(exitProj,.4,{opacity:1,ease:'back',display:'block',scale:1},'same2')


      proj.setAttribute('style', 'pointer-events:none;')

      btnsProjProceed.setAttribute('style', 'pointer-events:auto;')
      exitProj.setAttribute('style', 'pointer-events:auto;')

      btnsProjProceed.addEventListener('click', () => {
        event.stopPropagation();
      })

      exitProj.addEventListener('click', () => {
        event.stopPropagation();
        tlmProjects.reverse()
      })

      normalView(exitProj,proj)
      normalView(btnsProjProceed, proj)
  })
})


function normalView(elemHovered, parent) {

  elemHovered.addEventListener('mouseenter', () => {
    parent.style.background = "#2E3192";
  })
  elemHovered.addEventListener('mouseleave', () => {
    parent.style.background = '#2E3192';
  })
}



        // CLICK BUTTON IN PROJECTS, DISPLAY IMAGES


const projectBtns = document.querySelectorAll('.btn-proj-docs');
const projectBtnsArr = Array.from(projectBtns);

let projectsHide = [];

const slider = document.querySelector('.slider-track');
const sliderContainer = document.querySelector('.maps-images')


projectBtnsArr.map((proj) => {
  proj.addEventListener('click', () => {

    slider.innerHTML = '';
    resetTheSlidePosition(slider);

    const whichProject = proj.parentElement.parentElement.parentElement.dataset.name

    const findProject = PROJECTS.find(o => o.name === whichProject);

    for (var i = 0; i < findProject.src.length; i++) {
      let listItem = document.createElement('li');
      let srcImg = document.createElement('img');
      listItem.classList.add('slide')
      srcImg.setAttribute('src', findProject.src[i])
      listItem.appendChild(srcImg)
      slider.appendChild(listItem)
    }

    slider.children[0].classList.add('current-slide');


    sliderContainer.style.display = 'block'
    const slides = slider.querySelectorAll('.slide')
    slideWidth = slides[0].getBoundingClientRect().width;

    slides.forEach((slide,index) =>{
      slide.style.left = slideWidth * index + "px";
    })


    document.querySelector('.maps-images').webkitRequestFullScreen();
    document.querySelector('.maps-images').mozRequestFullScreen();
    document.querySelector('.maps-images').requestFullScreen();
  })

});


                    // SLIDER CAROUSELL MOVEMENT

const whichSlide = document.getElementById('which-slide')
const slideTotalChange = document.getElementById('total-slides')


const nextBtn = document.querySelector('.button-go-right')
const prevBtn = document.querySelector('.button-go-left')


let counterWhichSlide = 1;

// FUNCTION TO PERFORM POSITIONING OF THE SLIDE
const positionTheSlide = (slider,currentSlide,targetSlide) => {

  let whichIdOfPhoto = targetSlide.getAttribute('data-id')

  whichSlide.textContent = whichIdOfPhoto

  slider.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');

}


const resetTheSlidePosition = (slider) =>{
  slider.style.transform = 'translateX(-' + 0 + ')';
}

// NEXT BUTTON ON CLICK
nextBtn.addEventListener('click',() => {
  currentSlide = slider.querySelector('.current-slide');
  console.log(currentSlide);
  nextSlide = currentSlide.nextElementSibling;

  positionTheSlide(slider,currentSlide,nextSlide);
})

//PREVIOUS SLIDE ON CLICK
prevBtn.addEventListener('click', () => {
  currentSlide = slider.querySelector('.current-slide');
  previousSlide = currentSlide.previousElementSibling;


  positionTheSlide(slider,currentSlide,previousSlide);

})


const PROJECTS = [
  {
    name: "warehouse summary",
    dir: 'Bioderma Presentation',
    src: ['../Media/Slides/Bioderma Presentation/Slide1.jpg', '../Media/Slides/Bioderma Presentation/Slide2.jpg', '../Media/Slides/Bioderma Presentation/Slide3.jpg']
  },
  {
    name: "pdf converter",
    dir: 'PDF Converter Presentation',
    src: ['../Media/Slides/PDF Converter Presentation/Slide1.jpg','../Media/Slides/PDF Converter Presentation/Slide2.jpg', '../Media/Slides/PDF Converter Presentation/Slide3.jpg']
  },
  {
    name: "ecart prix",
    dir: 'Ecart Prix Presentation',
    src: ['../Media/Slides/Ecart Prix Presentation/Slide1.jpg','../Media/Slides/Ecart Prix Presentation/Slide2.jpg','../Media/Slides/Ecart Prix Presentation/Slide3.jpg']
  }
]
