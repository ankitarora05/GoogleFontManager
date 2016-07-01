(function() {
  'use strict';

  angular
    .module('googleFontManager')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
