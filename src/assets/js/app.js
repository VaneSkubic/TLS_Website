import "./components/swiper";
import "./components/cookies";
import "./components/swiper";

(function() {
    var navbar = document.querySelector('nav');
    var menuOpened = false;
    window.addEventListener('scroll', function() {
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
    })
    $(document).on('scroll', function() {
        var headers = document.querySelectorAll('h2');
        headers.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight / 2) {}
        })
    })

    var button = document.querySelector('#hamburger');
    var menu = document.querySelector('#menu');
    var close = document.querySelector('#close');
    button.onclick = function() {
        navbar.style.display = 'none'
        menu.style.display = 'block';
        menu.style.transform = 'scale(1)';
    }
    close.onclick = function() {
        navbar.style.display = 'block'
        menu.style.display = 'none';
    }

    window.addEventListener('scroll', reveal)

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

})();