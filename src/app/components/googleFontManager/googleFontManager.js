//Js

(function() {
    angular.module('googleFontManager').directive('googleFontManagerDirective', googleFontManagerDirective);

    /** @ngInject */
    function googleFontManagerDirective($document) {
        function link(scope, elem) {
            scope.showListItems = false;
            scope.isPlaceholder = true;
            scope.fontItemList = scope.info.fontDataArray;
            scope.searchText = "";
            scope.placeHolderValue = "Select a google font for preview";
            scope.showList = function() {
                scope.showListItems = !scope.showListItems;
            }
            scope.calculateVarient = function(varient) {
                if(varient === 'regular') {
                    scope.info.fontStyle = 'normal';
                } else if(varient === 'italic') {
                    scope.info.fontStyle = 'italic';
                } else {
                    scope.info.fontWeight = varient;
                }
                return;
            }
            scope.selectFont = function(obj, varient) {
                scope.selected = obj.family + ',' + varient;
                scope.placeHolderValue = obj.family;
                WebFont.load({ // eslint-disable-line no-undef
                    google: {
                        families: [obj.family]
                    },
                    urls: [obj.files[varient]],
                    loading: function() {},
                    active: function() {
                        //sessionStorage.fonts = true;
                        safeApply(scope, function(){
                            scope.info.fontFamily = obj.family;
                            scope.calculateVarient(varient);
                        });
                    },
                    inactive: function() {},
                    timeout: 2000
                });
            }
            var documentClicked = function(event) {
                var isChild = angular.element(elem).has(event.target).length > 0;
                var isSelf = elem[0] == event.target;
                var isInside = isChild || isSelf;
                if (!isInside) {
                    scope.$applyAsync(function() {
                        scope.showListItems = false;
                    });
                }
            };

            function safeApply(scope, fn) {
                var phase = scope.$root.$$phase; // eslint-disable-line angular/no-private-call
                if (phase == '$apply' || phase == '$digest') {
                    if (fn && (typeof fn === 'function')) { // eslint-disable-line angular/typecheck-function
                        fn();
                    }
                } else {
                    scope.$apply(fn);
                }
            }

            $document.on('click', documentClicked);
        }
        return {
            scope: {
                info: '='
            },
            restrict: 'E',
            templateUrl: 'app/components/googleFontManager/googleFontManager.html',
            link: link
        };
    }
})();
