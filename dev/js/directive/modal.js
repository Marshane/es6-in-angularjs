angular.module('ms.modal', [])
    .factory('msTip', ['msModal', (msModal) => {

        return msModal({
            controller: 'tipCtrl',
            templateUrl: 'msTip.html'
        });

    }])
    .controller('tipCtrl', ['msModal', '$timeout', 'msTip', (msModal, $timeout, msTip) => {
        let hide = () => {
            $timeout.cancel(timeout);
            msTip.hide();
        };
        let timeout = $timeout(() => {
            hide();
        }, 2e3);
    }])
    .factory('msConfirm', ['msModal', (msModal) => {

        let modal = msModal({
            controller: 'confirmCtrl',
            templateUrl: 'msConfirm.html'
        });

        return modal
    }])
    .controller('confirmCtrl', ['msModal', '$timeout', 'msConfirm', '$scope', (msModal, $timeout, msConfirm, $scope) => {

        $scope.cancel = () => {
            msConfirm.hide();
        };

        $scope.ok = () => {
            $scope.callback();
            msConfirm.hide();
        };

    }])
    .factory("msModal", ["$animate", "$compile", "$injector", "$rootScope", "$controller", "$q", "$http", "$templateCache", function($animate, $compile, $injector, $rootScope, $controller, $q, $http, $templateCache) {
        return function(config) {
            function activate(locals) {
                console.log(element);
                // return active() ? void 0 : html.then(function(html) {
                //     element || attach(html, locals)
                // })
                return html.then(function(html) {
                    attach(html, locals);
                })
            }

            function locals(locals) {
                if (scope && locals)
                    for (var prop in locals)
                        scope[prop] = locals[prop]
            }

            function attach(html, locals) {
                if (element = angular.element(html),
                    0 === element.length)
                    throw new Error("The template contains no elements; you need to wrap text nodes");
                if ($animate.enter(element, container),
                    scope = $rootScope.$new(),
                    locals)
                    for (var prop in locals)
                        scope[prop] = locals[prop];
                angular.forEach(resolve, function(value, key) {
                    resolve[key] = angular.isString(value) ? $injector.get(value) : angular.isFunction(value) ? $injector.invoke(value) : value
                });
                var doCompile = function() {
                    var ctrl = $controller(controller, {
                        $scope: scope
                    });
                    controllerAs && (scope[controllerAs] = ctrl),
                        $compile(element)(scope)
                };
                resolve ? $q.all(resolve).then(function() {
                    scope = angular.extend(scope, arguments[0]),
                        doCompile()
                }) : doCompile()
            }

            function deactivate() {
                var deferred = $q.defer();
                return element ? $animate.leave(element, function() {
                        scope.$destroy(),
                            element = null,
                            deferred.resolve()
                    }) : deferred.resolve(),
                    deferred.promise
            }

            function active() {
                return !!element
                // return 0
            }
            if (!(!config.template ^ !config.templateUrl))
                throw new Error("Expected modal to have exactly one of either `template` or `templateUrl`");
            var html, scope, controller = (config.template,
                    config.controller || angular.noop),
                controllerAs = config.controllerAs,
                container = angular.element(config.container || document.body),
                resolve = config.resolve,
                element = null;
            if (config.template) {
                var deferred = $q.defer();
                deferred.resolve(config.template),
                    html = deferred.promise
            } else
                html = $http.get(config.templateUrl, {
                    cache: $templateCache
                }).then(function(response) {
                    return response.data
                });
            return {
                show: activate,
                hide: deactivate,
                active: active,
                locals: locals
            }
        }
    }])
    .run(['$templateCache', ($templateCache) => {
        $templateCache.put('msTip.html', require('../../tpl/modal/tip.html'));
        $templateCache.put('msConfirm.html', require('../../tpl/modal/confirm.html'));
    }]);
