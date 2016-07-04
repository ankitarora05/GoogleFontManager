(function() {
    'use strict';

    angular
        .module('googleFontManager')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(GoogleFonts) {
        var vm = this,
            init = function() {
                vm.isDataAvailable = false;
                vm.showOnError = false;
                GoogleFonts.get().then(function(dataItems) {
                    if (dataItems.data) {
                        vm.fontData.fontDataArray = dataItems.data.items;
                        vm.isDataAvailable = true;
                    } else {
                        vm.showOnError = true;
                    }

                });

            };
        angular.extend(vm, {
            fontData: {
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: "normal",
                fontStyle: "normal",
                fontDataArray: []
            },
            getStyle: function(obj) {
                return {
                    "font-weight": obj.fontWeight,
                    "font-style": obj.fontStyle,
                    "font-family": obj.fontFamily
                }
            }
        });

        init();
    }
})();
