(function() {
    'use strict';

    angular
        .module('googleFontManager')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(GoogleFonts, $log) {
        var vm = this,
            init = function() {
                vm.isDataAvailable = false;
                vm.showOnError = false;
                vm.fontData = {
                    fontFamily: "Arial, Helvetica, sans-serif",
                    updateFontController: function(itemObj) {
                        $log.debug('itemObj from controller' + itemObj)
                    }
                }
                GoogleFonts.get().then(function(dataItems) {
                    if (dataItems.data) {
                        //vm.fontData = data;
                        vm.fontData.fontDataArray = dataItems.data.items;
                        vm.isDataAvailable = true;
                    } else {
                        vm.showOnError = true;
                    }

                });

            };
        angular.extend(vm, {
            fontData: {}
        });

        init();
    }
})();
