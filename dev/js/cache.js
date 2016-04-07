import module from './module.js';

module.run(['$templateCache', ($templateCache) => {
    $templateCache.put('index.html', require('../tpl/index.html'));
    $templateCache.put('config.html', require('../tpl/config.html'));
    $templateCache.put('blacklist.html', require('../tpl/blacklist.html'));
    $templateCache.put('maven.html', require('../tpl/maven.html'));
    $templateCache.put('login.html', require('../tpl/login.html'));
}]);
