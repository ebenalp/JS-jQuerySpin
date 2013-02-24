/**
 * jQuery Spin
 * 
 * Overlays desired DOM element(s) with a spinner, fading out the background.
 * Nothing required other than the script.
 * 
 * @author Oliver Nassar <onassar@gmail.com>
 */

// preload spinner
(new Image()).src = 'http://i.imgur.com/uM2gq.gif';

// let's do this
(function($){
    $.fn.spin = function(overlayStyleOptions, spinnerStyleOptions) {
        var styles = {
            overlay: {
                position: 'absolute',
                opacity: '0.5',
                zIndex: '10000',
                backgroundColor: '#000',
                borderRadius: '4px'
            },
            spinner: {
                position: 'absolute',
                width: '60px',
                padding: '10px',
                backgroundColor: '#fff',
                backgroundImage: 'url(http://i.imgur.com/uM2gq.gif)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                height: '60px',
                zIndex: '10001',
                borderRadius: '6px',
                boxShadow: '0 0px 6px #666'
            }
        };
        this.each(function() {

            // options
            var overlayStyles = $.extend(
                    styles.overlay, overlayStyleOptions || {}
                ),
                spinnerStyles = $.extend(
                    styles.spinner, spinnerStyleOptions || {}
                );

            // tracking
            var spinning = $(this).data('spinning') === true;
            if (spinning === true) {
                $(this).data('spinning', false)
                $(this).data('overlay').remove();
                $(this).data('spinner').remove();
            } else {

                // tracking
                $(this).data('spinning', true)

                // overlay node
                var overlay = $('<div />');
                $(this).data('overlay', overlay);

                // spinner node (note call here as well as below to spinner.css)
                var spinner = $('<div />');
                $(this).data('spinner', spinner);
                spinner.css(spinnerStyles);

                // dom
                $(this).append(overlay, spinner);

                // determine position (changes depending on parent position)
                var left = $(this).offset().left,
                    top = $(this).offset().top,
                    width = $(this).innerWidth(),
                    height = $(this).innerHeight();
                if ($(this).css('position') === 'relative') {
                    left = 0;
                    top = 0;
                }

                // overlay styles
                overlayStyles.left = left + 'px';
                overlayStyles.top = top + 'px';
                overlayStyles.width = width + 'px';
                overlayStyles.height = height + 'px';
                overlay.css(overlayStyles);

                // spinner styles
                spinnerStyles.left = (
                    parseInt($(this).innerWidth()) -
                    parseInt(spinner.innerWidth())
                ) / 2;
                if ($(this).css('position') !== 'relative') {
                    spinnerStyles.left += $(this).offset().left;
                }
                spinnerStyles.top = (
                    parseInt($(this).innerHeight()) -
                    parseInt(spinner.innerHeight())
                ) / 2;
                if ($(this).css('position') !== 'relative') {
                    spinnerStyles.top += $(this).offset().top;
                }
                spinner.css(spinnerStyles);
            }
        });
    };
})(jQuery);