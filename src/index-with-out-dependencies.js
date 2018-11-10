const ScrollAnimations = data => {
    const options = {
        scrollBarOptions: {
            damping: 0.03,
            thumbMinSize: 3
        },
        rellaxSpeed: 5
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
            return new RegExp(' ' + className + ' ').test(' ' + element.className + ' ');
        },

        add: (element, className) => {
            if (!classManipulate.has(element, className)) {
                element.className += ' ' + className;
            }
        },

        remove: (element, className) => {
            let newClass = ' ' + element.className.replace(/[\t\r\n]/g, ' ') + ' ';
            if (classManipulate.has(element, className)) {
                while (newClass.indexOf(' ' + className + ' ') >= 0) {
                    newClass = newClass.replace(' ' + className + ' ', ' ');
                }
                element.className = newClass.replace(/^\s+|\s+$/g, '');
            }
        }
    };

    const setVariables = () => {
        variables.element = document.querySelector(data.element);
        variables.scrollBarOptions = data.scrollBarOptions ? data.scrollBarOptions : options.scrollBarOptions;
        variables.elements = variables.element.querySelectorAll('[data-type-animation]');
        variables.rellaxSpeed = data.rellaxSpeed ? data.rellaxSpeed : options.rellaxSpeed;
    };

    const setTypeAnimation = () => {
        variables.typeAnimation = {};
        variables.speedRellax = {};
        for (let a = 0; a < variables.elements.length; a++) {
            variables.typeAnimation[a] = variables.elements[a].getAttribute('data-type-animation');
            if (variables.typeAnimation[a] === 'rellax') {
                variables.speedRellax[a] = variables.elements[a].getAttribute('data-rellax-speed')
                    ? variables.elements[a].getAttribute('data-rellax-speed')
                    : variables.rellaxSpeed;
            }
        }
    };

    const setScrollBar = () => {
        variables.parentPos = variables.element.getBoundingClientRect();
        variables.elementPos = {};
        variables.elementTop = {};
        variables.realPosition = {};
        variables.scrollBar = Scrollbar.init(variables.element, variables.scrollBarOptions);
        let position = 0,
            direction;
        variables.scrollBar.addListener(status => {
            if (status.offset.y > position) {
                direction = 'down';
            } else {
                direction = 'up';
            }
            position = status.offset.y;
            let isVisible;
            for (let a = 0; a < variables.elements.length; a++) {
                isVisible = variables.scrollBar.isVisible(variables.elements[a]);
                if (variables.typeAnimation[a] === 'rellax') {
                    if (isVisible) {
                        variables.elementPos[a] = variables.elements[a].getBoundingClientRect();
                        variables.elementTop[a] = variables.elementPos[a].top - variables.parentPos.top;
                        variables.realPosition =
                            variables.elementTop[a] -
                            variables.parentPos.height / 2 +
                            variables.elementPos[a].height / 2;
                        TweenMax.set(variables.elements[a], {
                            y: variables.realPosition / variables.speedRellax[a]
                        });
                    }
                } else if (variables.typeAnimation[a] === 'aos') {
                    if (isVisible && direction === 'down') {
                        classManipulate.add(variables.elements[a], 'aos-animate');
                    } else if (!isVisible && variables.elements[a].getBoundingClientRect().top > 0) {
                        classManipulate.remove(variables.elements[a], 'aos-animate');
                    }
                }
            }
        });
    };

    const windowResize = () => {
        setTimeout(() => {
            let isVisible;
            variables.parentPos = variables.element.getBoundingClientRect();
            for (let a = 0; a < variables.elements.length; a++) {
                if (variables.typeAnimation[a] === 'rellax') {
                    isVisible = variables.scrollBar.isVisible(variables.elements[a]);
                    if (isVisible) {
                        variables.elementPos[a] = variables.elements[a].getBoundingClientRect();
                        variables.elementTop[a] = variables.elementPos[a].top - variables.parentPos.top;
                        variables.realPosition =
                            variables.elementTop[a] -
                            variables.parentPos.height / 2 +
                            variables.elementPos[a].height / 2;
                        TweenMax.set(variables.elements[a], {
                            y: variables.realPosition / variables.speedRellax[a]
                        });
                    }
                }
            }
        }, 50);
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
