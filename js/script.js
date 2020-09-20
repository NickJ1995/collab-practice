$(document).ready(function() {

    // This object listens to scroll events and dispatches event handlers as needed.
    let ScrollSpy = {
        init: function() {
            this.cacheDOM();
            this.attachEventListeners();
        },

        cacheDOM: function() {
            this.$document = $(document);
            this.$header = $('header');
        },

        attachEventListeners: function() {
            // We need to explicitly bind the current object to the this keyword
            // of the onScroll function because inside the context of the scroll
            // event handler, the this keyword refers to the global document.
            this.$document.scroll(this.onScroll.bind(this));
        },

        onScroll: function() {
            this.$header.toggleClass(
                'scrolled', 
                this.$document.scrollTop() > this.$header.height()
            );
        }
    };

    // This listens for click events on the nav links and scrolls the page to
    // the corresponding section. 
    let NavScroller = {
        init: function() {
            this.cacheDOM();
            this.attachEventListeners();
        },

        cacheDOM: function() {
            this.header   = document.querySelector('header')
            this.hero     = document.querySelector('.hero')
            this.main     = document.querySelector('main')
            this.social   = document.querySelector('.social')
            this.navLinks = document.querySelectorAll('.nav-link')
            this.navbarToggle = document.querySelector('#navbarToggle')
        },

        attachEventListeners: function() {
            this.header.addEventListener('click', this.onNavLinkClicked.bind(this))
        },

        onNavLinkClicked: function(event) {
            let link = event.target;
            let section = this.linkToDOMSection(link);

            if (section != null) {
                event.preventDefault();
                let yOffset = section.offsetTop;
                // We need to subtract the height of the header from the yOffset
                // because the header has fixed positioning. Without this adjustment,
                // the header will cover part of the top of the section.
                yOffset -= this.header.offsetHeight;
                window.scrollTo({
                    left: 0,
                    top: yOffset,
                    behavior: 'smooth'
                });
                this.navbarToggle.classList.remove('show')
            }
        },

        linkToDOMSection: function(link) {
            let innerHTML = link.innerHTML.toLowerCase();

            if (innerHTML.search('home') > -1) {
                return this.hero;
            } else if (innerHTML.search('about') > -1) {
                return this.main;
            } else if (innerHTML.search('contact') > -1) {
                return this.social;
            }

            return null;
        }

    };

    ScrollSpy.init();
    NavScroller.init();
})