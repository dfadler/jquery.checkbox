(function($, window, undefined) {

    var defaults = {},

        Checkbox = function(element, options) {
            this.options = $.extend(defaults, options);
            this.$el = $(element);
            this.$customCheckbox = this.attachCustomCheckboxContainer();
            this.init();
        };

    Checkbox.prototype = {
        attachCustomCheckboxContainer: function() {
            this.$el.after('<div class="custom-checkbox" />');
            return this.$el.siblings('.custom-checkbox');
        },

        bind: function() {
            this.$customCheckbox.on('change', this.toggleCheckbox);
            this.$customCheckbox.on('click', {context: this}, this.toggleClass);
        },

        init: function() {
            this.bind();
        },

        toggleCheckbox: function(isActive) {
            this.$el
                .attr('checked', isActive)
                .trigger('change');
        },

        toggleClass: function(e) {

            var $el = $(this),
                context = e.data.context,
                isActive = $el.hasClass('active') ? false : true;

            context.toggleCheckbox(isActive);
            $el.toggleClass('active');
        }
    };

    $.fn.checkbox = function(options) {
        return this.each(function() {
            new Checkbox(this, options);
        });
    };

}(jQuery, window));