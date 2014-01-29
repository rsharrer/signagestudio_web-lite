/**
 Orientation selector Backbone > View
 @class OrientationSelectorView
 @constructor
 @return {Object} instantiated OrientationSelectorView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    var OrientationSelectorView = Backbone.View.extend({

        initialize: function () {
            var self = this;
            self.HORIZONTAL = 'HORIZONTAL';
            self.VERTICAL = 'VERTICAL';
            self.ORIENTATION = 'ORIENTATION';

            $(this.el).find('#prev').on('click',function(e){
                self.options.appCoreStackView.slideToPage(self.options.from, 'left');
                return false;
            });

            $(Elements.IMG_HORIZONTAL).on('click', function () {
                self._selectOrientation(self.HORIZONTAL);
            });

            $(Elements.IMG_VERTICAL).on('click', function () {
                self._selectOrientation(self.VERTICAL);
            });
        },

        /**
         Select a particular orientation and optionally move to the next selection views through
         the ScreenArrowSelector instance.
         @method _selectOrientation
         @param {String} i_orientation
         **/
        _selectOrientation: function (i_orientation) {
            var self = this;

            switch (i_orientation) {
                case self.HORIZONTAL:
                {
                    $(Elements.IMG_HORIZONTAL).css('opacity', '1');
                    $(Elements.IMG_VERTICAL).css('opacity', '0.6');
                    break;
                }

                case self.VERTICAL:
                {
                    $(Elements.IMG_HORIZONTAL).css('opacity', '0.6');
                    $(Elements.IMG_VERTICAL).css('opacity', '1');
                    break;
                }
            }

            self.model.set(self.ORIENTATION, i_orientation);
            self.resolutionSelector = Backbone.comBroker.getService(Services.RESOLUTION_SELECTOR);
            self.resolutionSelector.render();
            setTimeout(function () {
                self.options.appCoreStackView.slideToPage(self.options.to, 'right');
            }, 500);



        }
    });

    return OrientationSelectorView;

});
