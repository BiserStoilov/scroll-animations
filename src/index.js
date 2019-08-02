import Scrollbar from 'smooth-scrollbar';
import { TweenMax } from 'gsap';

const ScrollAnimations = data => {
    const options = {
        scrollBarOptions: {
            damping: 0.08,
            thumbMinSize: 3
        },
        scrollBarMobileSpeed: 0.3,
        parallaxSpeed: 5
    };

    const variables = {};

    const init = () => {
        if (data.element !== undefined) {
            setVariables();
            setTypeAnimation();
            setScrollBar();
            resize();
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 10);
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 20);
        } else {
            console.error('Set an element!');
        }
    };

    const classManipulate = {
        has: (element, className) => {
            return new RegExp(' ' + className + ' ').test(
                ' ' + element.className + ' '
            );
        },

        add: (element, className) => {
            if (!classManipulate.has(element, className)) {
                element.className += ' ' + className;
            }
        },

        remove: (element, className) => {
            let newClass =
                ' ' + element.className.replace(/[\t\r\n]/g, ' ') + ' ';
            if (classManipulate.has(element, className)) {
                while (newClass.indexOf(' ' + className + ' ') >= 0) {
                    newClass = newClass.replace(' ' + className + ' ', ' ');
                }
                element.className = newClass.replace(/^\s+|\s+$/g, '');
            }
        }
    };

    const isMobile = () => {
        if (
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        } else {
            return false;
        }
    };

    const setVariables = () => {
        variables.element = document.querySelector(data.element);
        variables.scrollBarOptions = data.scrollBarOptions
            ? data.scrollBarOptions
            : options.scrollBarOptions;
        variables.scrollBarMobileSpeed = options.scrollBarMobileSpeed;
        variables.elements = variables.element.querySelectorAll(
            '[data-type-animation]'
        );
        variables.parentElements = [];
        for (let a = 0; a < variables.elements.length; a++) {
            variables.parentElements[a] = variables.elements[a].parentElement;
        }
        variables.parallaxSpeed = data.parallaxSpeed
            ? data.parallaxSpeed
            : options.parallaxSpeed;
    };

    const setTypeAnimation = () => {
        variables.typeAnimation = {};
        variables.speedParallax = {};
        for (let a = 0; a < variables.elements.length; a++) {
            variables.typeAnimation[a] = variables.elements[a].getAttribute(
                'data-type-animation'
            );
            if (variables.typeAnimation[a] === 'parallax') {
                variables.speedParallax[a] = variables.elements[a].getAttribute(
                    'data-parallax-speed'
                )
                    ? variables.elements[a].getAttribute('data-parallax-speed')
                    : variables.parallaxSpeed;
            }
        }
    };

    const setScrollBar = () => {
        variables.parentPos = variables.element.getBoundingClientRect();
        variables.elementPos = {};
        variables.elementTop = {};
        variables.realPosition = {};
        if (isMobile() === true) {
            class MobilePlugin extends ScrollbarPlugin {
                static pluginName = 'mobile';
                static defaultOptions = {
                    speed: variables.scrollBarMobileSpeed
                };
                transformDelta(delta, fromEvent) {
                    if (fromEvent.type !== 'touchend') {
                        return delta;
                    }

                    return {
                        x: delta.x * this.options.speed,
                        y: delta.y * this.options.speed
                    };
                }
            }
            Scrollbar.use(MobilePlugin);
        }
        variables.scrollBar = Scrollbar.init(
            variables.element,
            variables.scrollBarOptions
        );
        let position = 0,
            direction,
            isVisible;
        variables.scrollBar.addListener(status => {
            if (status.offset.y > position) {
                direction = 'down';
            } else {
                direction = 'up';
            }
            position = status.offset.y;
            for (let a = 0; a < variables.elements.length; a++) {
                isVisible = variables.scrollBar.isVisible(
                    variables.parentElements[a]
                );
                if (variables.typeAnimation[a] === 'parallax' && isVisible) {
                    variables.elementPos[a] = variables.elements[
                        a
                    ].getBoundingClientRect();
                    variables.elementTop[a] =
                        variables.elementPos[a].top - variables.parentPos.top;
                    variables.realPosition =
                        variables.elementTop[a] -
                        variables.parentPos.height / 2 +
                        variables.elementPos[a].height / 2;
                    TweenMax.set(variables.elements[a], {
                        y: variables.realPosition / variables.speedParallax[a]
                    });
                } else if (
                    variables.typeAnimation[a] === 'aos' &&
                    isVisible &&
                    direction === 'down'
                ) {
                    classManipulate.add(variables.elements[a], 'aos-animate');
                } else if (
                    variables.typeAnimation[a] === 'aos' &&
                    !isVisible &&
                    variables.elements[a].getBoundingClientRect().top > 0
                ) {
                    classManipulate.remove(
                        variables.elements[a],
                        'aos-animate'
                    );
                }
            }
        });
    };

    const windowResize = () => {
        variables.parentPos = variables.element.getBoundingClientRect();
        let isVisible;
        for (let a = 0; a < variables.elements.length; a++) {
            if (variables.typeAnimation[a] === 'parallax') {
                isVisible = variables.scrollBar.isVisible(
                    variables.parentElements[a]
                );
                if (isVisible) {
                    variables.elementPos[a] = variables.elements[
                        a
                    ].getBoundingClientRect();
                    variables.elementTop[a] =
                        variables.elementPos[a].top - variables.parentPos.top;
                    variables.realPosition =
                        variables.elementTop[a] -
                        variables.parentPos.height / 2 +
                        variables.elementPos[a].height / 2;
                    TweenMax.set(variables.elements[a], {
                        y: variables.realPosition / variables.speedParallax[a]
                    });
                }
            }
        }
    };

    const resize = () => {
        window.addEventListener('resize', windowResize);
    };

    return {
        init: () => {
            init();
        },
        publicMethods: {
            destroy: () => {
                window.removeEventListener('resize', windowResize);
                Scrollbar.destroy(variables.element);
            },
            getScrollBar: () => {
                return variables.scrollBar;
            }
        }
    };
};

const scrollAnimations = data => {
    const scrollAnimations = new ScrollAnimations(data);
    scrollAnimations.init();
    return scrollAnimations.publicMethods;
};

export default scrollAnimations;
