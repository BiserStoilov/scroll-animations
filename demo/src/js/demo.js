import scrollAnimations from '../../../src/index';
import TweenMax from 'gsap/TweenMax';
scrollAnimations({
    element: '#scroll-animation-content'
});
const parent = document.querySelector('.center');
window.addEventListener('resize', () => {
    TweenMax.set(['#scroll-animation-content', '.title'], { height: parent.clientHeight });
});
