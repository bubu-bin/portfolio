// require('../smooth-scrollbar')
// import Scrollbar from 'smooth-scrollbar';
//
// Scrollbar.init(document.querySelector('#my-scrollbar'));

import { camelCase } from 'lodash';

console.log(camelCase('hello world'));

//
//
// const logos = document.querySelectorAll('.logos');
// const logosArr = Array.from(logos);
//
// const sectionLangs = document.querySelector('#skills-page')
// const sections = document.querySelectorAll('.section')
//
// const contactMail = document.querySelector('.contact-mail-container')
// const contactTitle = document.querySelector('.contact-title')
//
// const phoneStrokes = document.querySelectorAll('.strokes');
// const phoneStrokes2 = document.querySelectorAll('.strokesD');
//
//
// const tlmLogos = new TimelineMax({})
//
// const tlmStrokes = new TimelineMax({repeat : -1, repeatDelay:3})
// const tlmStrokesD = new TimelineMax({repeat : -1, repeatDelay:6})
//
// const options = {
//   rootMargin: '0px 0px 0% 0px',
//   threshold: 0.65 // half of item height
// }
//
//
// let executedSkills = false;
// let executedContact = false;
//
// const observer = new IntersectionObserver((entries, observer) => {
//
//   entries.forEach(entry => {
//     if (!entry.isIntersecting) {
//       return;
//     } else if (!executedSkills) {
//
//       if (entry.target.classList.contains('skills-page')) {
//         executedSkills = true;
//         logosArr.map(l => {
//           l.style.display = "block";
//         })
//         tlmLogos
//           .staggerFrom(logosArr, 0.5, {y:200, display:'power4'},0.1 )
//       }
//     }
//
//     if (!executedContact) {
//
//       if (entry.target.classList.contains('contact-page')) {
//         executedContact = true;
//         contactMail.style.display = 'flex'
//         contactTitle.style.display = 'block'
//         tlmStrokes
//             .staggerFrom(phoneStrokes, .5, {scale:0,transformOrigin:'bottom', repeat:1, repeatDelay:.05},0)
//         tlmStrokesD
//             .staggerFrom(phoneStrokes2, .5, {scale:0,transformOrigin:'top', repeat:1, repeatDelay:.05},0)
//         gsap.from(contactMail, .75, {y:200, ease:'back'})
//         gsap.from(contactTitle, .5, {scale:0, delay:.6, ease:'back'})
//       }
//     }
//
//   })
// },options)
//
//
// sections.forEach(section => {
//   observer.observe(section)
// })
