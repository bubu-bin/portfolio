const logos = document.querySelectorAll('.logos');
const logosArr = Array.from(logos);

const sectionLangs = document.querySelector('#skills-page')
const sections = document.querySelectorAll('.section')

const contactMail = document.querySelector('.contact-mail-container')
const contactTitle = document.querySelector('.contact-title')

const tlmLogos = new TimelineMax({})

const tlmStrokes = new TimelineMax({repeat : -1, repeatDelay:3})
const tlmStrokesD = new TimelineMax({repeat : -1, repeatDelay:6})

const options = {
  rootMargin: '0px 0px 0% 0px',
  threshold: 0.65
}



let executedSkills = false;
let executedContact = false;

const observer = new IntersectionObserver((entries, observer) => {

  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else if (!executedSkills) {

      if (entry.target.classList.contains('skills-page')) {
        executedSkills = true;
        logosArr.map(l => {
          l.style.display = "block";
        })
        tlmLogos
          .staggerFrom(logosArr, 0.5, {y:200, display:'power4'},0.1 )
      }
    }


    if (!executedContact) {

      if (entry.target.classList.contains('contact-page')) {
        executedContact = true;
        contactMail.style.display = 'flex'
        contactTitle.style.display = 'block'
        gsap.from(contactMail, .75, {y:200, ease:'back'})
        gsap.from(contactTitle, .5, {scale:0, delay:.6, ease:'back'})
      }
    }

  })
},options)


sections.forEach(section => {
  observer.observe(section)
})


const optionsLinks = {
  rootMargin: '0px',
  threshold: 1
}


const linksSocialI = document.querySelectorAll('.links-social i')
const linksSocialP = document.querySelectorAll('.links-social p')
// const linksSocialI = linksSocialContainer.getElementsByTagName('i');
// const linksSocialP  = linksSocialContainer.getElementsByTagName('p');

const observerLinks = new IntersectionObserver((entries,observerLinks) => {

  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else if (!entry.target.classList.contains('home-page')) {
      linksSocialI.forEach(linkI => {
        linkI.setAttribute('style', 'color:white;')
    })
    linksSocialP.forEach(linkP => {
      linkP.setAttribute('style', 'color:white;')
  })
    } else {
      linksSocialI.forEach(linkI => {
        linkI.setAttribute('style', 'color:black;')
    })
    linksSocialP.forEach(linkP => {
      linkP.setAttribute('style', 'color:black;')
  })
    }


  })


},optionsLinks)

sections.forEach(section => {
  observerLinks.observe(section);
})
