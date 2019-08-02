import scrollAnimations from '../../../src/index';
const sa = scrollAnimations({
    element: '#scroll-animation-content'
});
const parent = document.querySelector('.center');
window.addEventListener('resize', () => {
    TweenMax.set(['#scroll-animation-content', '.title'], { height: parent.clientHeight });
});
const smoothScrollBar = sa.getScrollBar();
const element = document.querySelector('#test');
smoothScrollBar.addListener(() => {
    console.log(smoothScrollBar.isVisible(element));
});
