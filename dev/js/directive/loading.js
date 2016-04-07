angular.module('ui.loading',[])
    .directive('loading', [() => {
        return {
            restrict: 'EA',
            replace: true,
            template: '<div class="line-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
        }
    }]);
