$(document).ready(function() {

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

    ScrollSpy.init();
})