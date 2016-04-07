import module from './module.js';

module.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
    $locationProvider.html5Mode(!0);
    $routeProvider
        .when('/', {
            templateUrl: 'index.html',
            controller: 'indexCtrl',
            controllerAs: 'vm'
        })
        .when('/config', {
            templateUrl: 'config.html',
            controller: 'configCtrl',
            controllerAs: 'vm'
        })
        .when('/blacklist', {
            templateUrl: 'blacklist.html',
            controller: 'blacklistCtrl',
            controllerAs: 'vm'
        })
        .when('/maven', {
            templateUrl: 'maven.html',
            controller: 'mavenCtrl',
            controllerAs: 'vm'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm',
            resolve: {
                user: ['UserService', (UserService) => {
                    return UserService.getUser().then(res => res, res => res);
                }]
            }
        })
        .otherwise({redirectTo: '/'});
}])
.run(['$rootScope', '$location', ($rootScope, $location) => {
    $rootScope.state = {};
    $rootScope.$on("$routeChangeStart", (event, next, current) => {
        $rootScope.$originalPath = next.$$route && next.$$route.originalPath;
        $rootScope.isLogin = $rootScope.$originalPath === '/login';
    });
}]);
