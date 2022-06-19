import "./components/swiper";
import "./components/cookies";
import "./components/swiper";

(function() {
    var navbar = document.querySelector('nav');

    function navToggle() {
        if (window.scrollY > 10) {
            navbar.querySelectorAll('img').forEach(element => {
                element.style.filter = 'invert(1)';
            });
            navbar.style.backgroundColor = '#fff';
            navbar.style.borderBottom = '1px solid #f0f0f0';
            document.querySelector('.link').style.color = '#000';
        } else {
            navbar.querySelectorAll('img').forEach(element => {
                element.style.filter = 'invert(0)';
            });
            document.querySelector('.link').style.color = '#fff';
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            navbar.style.borderBottom = 'none'
        }
    }

    function menuToggle() {
        var button = document.querySelector('#hamburger');
        var menu = document.querySelector('#menu');
        var close = document.querySelector('#close');
        var menuText = document.querySelector('.left-container');
        var topBar = document.querySelector('.top-bar');
        button.onclick = function() {
            menu.style.width = '100vw';
            menu.style.transform = 'translateX(0)';
            menuText.style.transform = 'translateX(0)';
            topBar.style.opacity = '1';
        }
        close.onclick = function() {
            menu.style.transform = 'translateX(-100%)';
            menuText.style.transform = 'translateX(-200%)';
            topBar.style.opacity = '0';
        }
    }

    function reveal() {
        var reveals = document.getElementsByClassName('reveal-left');
        var texts = document.querySelectorAll('.fadein');
        var lines = document.querySelectorAll('.line');

        for (let i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var revealTop = reveals[i].getBoundingClientRect().top;
            var revealPoint = 100;

            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }

            if (revealTop < windowHeight / 1.5) {
                texts[i].style.opacity = '1';
                lines[i].style.opacity = '1';
            } else {
                texts[i].style.opacity = '0';
                lines[i].style.opacity = '0';
            }
        }
    }

    function scrollAnimations() {
        var downElements = document.getElementsByClassName('scroll-down');
        var upElements = document.getElementsByClassName('scroll-up');
        var speed = 0.1

        for (let i = 0; i < downElements.length; i++) {
            var elementTop = downElements[i].getBoundingClientRect().top;

            if (elementTop > 0 && elementTop < window.innerHeight) {
                console.log(elementTop * speed - (window.innerHeight / 2) * speed)
                downElements[i].style.bottom = elementTop * speed - (window.innerHeight / 2) * speed + "px";
            }

        }
        for (let i = 0; i < upElements.length; i++) {
            var elementTop = upElements[i].getBoundingClientRect().top;

            if (elementTop > 0 && elementTop < window.innerHeight) {
                upElements[i].style.top = elementTop * speed - (window.innerHeight / 2) * speed + "px";
            }

        }
    }

    window.addEventListener('scroll', function() {
        navToggle();
        reveal();
        scrollAnimations()
    })

    menuToggle();

})();