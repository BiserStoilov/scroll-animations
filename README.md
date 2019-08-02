# SCROLL ANIMATION FOR SMOOTH SCROLLBAR

JavaScript plugin that implement [AOS](https://github.com/michalsnik/aos) and [Relax](https://github.com/dixonandmoe/rellax) animations on scrolling with Smooth Scrollbar

## DEPENDENCIES

-   [Smooth Scrollbar](https://github.com/idiotWu/smooth-scrollbar)
-   [AOS](https://github.com/michalsnik/aos) - aos.css
-   [TweenMax (GSAP - GreenSock Animation Platform)](https://github.com/greensock/GreenSock-JS)

## HOW USE

1.  Download or git clone
    ```bash
    git clone https://github.com/BiserStoilov/scroll-animations.git
    ```
1.  Install dependencies
    ```bash
    npm install
    ```
1.  Run demo
    ```bash
    npm run demo
    ```
1.  Build production with dependencies
    ```bash
    npm run build
    ```
1.  Run plugin

    ```html
    <body data-aos-easing="ease-in-out" data-aos-duration="1000" data-aos-delay="100">
        <div id="scroll-animation-content">
            <div data-type-animation="aos" data-aos="fade-up"></div>
            <div data-type-animation="parallax"></div>
            <div data-type-animation="parallax" data-parallax-speed="10"></div>
        </div>
    </body>
    ```

    ```javascript
    import scrollAnimations from 'path/to/scroll-animations/src/index'; 
    const sa = scrollAnimations({
        element: '#scroll-animation-content'
    });
    ```

1.  Public methods

    ```javascript
    // Get Smooth Scrollbar instance
    const smoothScrollBar = sa.getScrollBar();
    // Destroy
    sa.destroy();
    ```
1.  Smoot ScrollBar Methods
    ```javascript
    const sa = scrollAnimations({
        element: '#scroll-animation-content'
    });
    const smoothScrollBar = sa.getScrollBar();
    const element = document.querySelector('#your-element');
    smoothScrollBar.addListener(() => {
        console.log(smoothScrollBar.isVisible(element));
    }); 
    ```

## NPM

```bash
npm i scroll-animations
```
