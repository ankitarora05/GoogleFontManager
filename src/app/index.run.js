(function() {
  'use strict';

  angular
    .module('googleFontManager')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
