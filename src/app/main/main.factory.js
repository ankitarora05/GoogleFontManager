(function() {
    'use strict';
    angular
        .module('googleFontManager')
        .factory('GoogleFonts', function($http) {
            return {
                get: function() {
                    return $http.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD-MWDKDqG6LejutSj7-KrwcunXArzhbwo');
                }
            };
        });
})();
