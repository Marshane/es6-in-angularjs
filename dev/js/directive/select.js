import $ from 'jquery';
import _ from 'lodash';

angular.module('ui.select', [])
.directive('select', ['$document','$compile','$templateCache', ($document, $compile, $templateCache) => {
    return {
        restrict: 'A',
        scope: {
            data: '=',
            ngDisabled: '=',
            ngModel:'='
        },
        require:'^ngModel',
        replace: true,
        compile: function(tElement, tAttrs) {
            return {
                pre: function(scope, elem, attr) {
                    var temp = $(require('../../tpl/select.html'));
                    var row = temp.find('.ui-select-choices-row');
                    var input = temp.find('.ui-select-search input');
                    var group = temp.find('.ui-select-choices-group');
                    if (!attr.key) {
                        row.attr('ng-repeat','it in data | filter:search.key track by $index');
                        // console.log(row);
                        input.attr('ng-model','search.key');
                        group.attr('refresh-on-change','data | filter:search.key');
                    }
                    $(elem).append($compile(temp)(scope));
                },
                post: function(scope, elem, attr, ngModel) {
                    var modelInput = $(elem).find('.ui-select-input input');
                    var textInput = $(elem).find('.ui-select-search input');
                    var onDocumentClick = function(e) {
                        if (!scope.open) return;
                        var contains = $.contains(elem[0], e.target);
                        // console.log(contains);
                        if (contains) return;
                        scope.$apply(function() {
                            scope.open = 0;
                            clearKey()
                        });
                    };

                    var ngDisable = scope.ngDisable;


                    var clearKey = function() {
                        if (attr.key) {
                            scope.search[attr.key] = '';
                        } else {
                            scope.search.key = '';
                        }
                    }
                    var isKeyEm = function() {
                        if (attr.key) {
                            return scope.search[attr.key]
                        } else {
                            return scope.search.key
                        }
                    }

                    scope.search = {};

                    scope.p = {};
                    scope.placeholder = attr.placeholder;
                    scope.key = attr.key;
                    scope.toggle = function(e) {
                        e = e || window.event;

                        if (scope.ngDisabled) return ;
                        scope.$apply(function() {
                            scope.open = !scope.open;
                            scope.p.index = 0;

                            clearKey();
                        });
                    };
                    $($document).on('click', onDocumentClick);
                    modelInput.on('keydown', function(e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1
                    });
                    modelInput.on('click', scope.toggle);

                    scope.p.index = 0;
                    var keyCode = [38, 40, 13];
                    $(elem[0]).on('keyup', function(e) {
                        var key = e.which;
                        var temp = scope.data;

                        if(isKeyEm() && isKeyEm() !==''){
                            // console.log('------')
                            if (attr.key) {
                                temp = _.filter(temp, function(it) {
                                    return it[attr.key].indexOf(scope.search[attr.key]) >= 0
                                })
                            } else {
                                temp = _.filter(temp, function(it) {
                                    return it.indexOf(scope.search.key) >= 0
                                });
                            }
                        }
                        if (!temp.length) return;

                        if (!~keyCode.indexOf(key)) {
                            if ( modelInput.val() === '') {
                                ngModel.$setViewValue('');
                                scope.$apply();
                            }
                            return;
                        }
                        switch (key) {
                            case 38: {
                                scope.p.index === 0 ? scope.p.index = temp.length - 1 : scope.p.index--;
                                break;
                            }
                            case 40: {
                                scope.p.index === temp.length - 1 ? scope.p.index = 0 : scope.p.index++;
                                // console.log(scope.p.index);
                                break;
                            }
                            case 13: {
                                scope.onSelected(temp[scope.p.index], scope.p.index);
                                e.preventDefault();
                                break;
                            }
                        }

                        scope.$apply();
                    });
                    scope.$watch('search', function(a,b) {
                        if(a != b){
                            scope.p.index = 0;

                        }
                    },true);
                    scope.selected = {};

                    scope.onSelected = function(it, index) {
                        // console.log(it);
                        scope.open = 0;
                        scope.p.index = index;
                        scope.selected = it;
                        if (attr.key) {
                            ngModel.$setViewValue(it[attr.asValue ? attr.asValue : attr.key]);
                            modelInput[0].value = it[attr.key];
                        } else {
                            scope.ngModel = it;
                            modelInput[0].value = it;
                        }
                        clearKey();
                        // console.log(scope.p.index)
                    };

                    var valueHandler = function() {
                        if (attr.key) {
                            var current = _.filter(scope.data, function(it, index) {

                                return it[attr.asValue] == scope.ngModel;

                            })[0] || {};
                            console.log(current)
                            modelInput[0].value = current[attr.key] || '';
                        } else {
                            modelInput[0].value = scope.ngModel;
                        }
                        // console.log(scope.ngModel)
                    }

                    scope.$watch('ngModel', function(n) {
                        if(n === undefined || n === '') {
                            modelInput[0].value = '';
                        } else {
                            valueHandler();
                        }
                    });


                    scope.$watchCollection('data', function(n) {
                        // console.log('data change');
                        scope.p.index = 0;
                        if (n && n.length) {
                            if (scope.ngModel === undefined || scope.ngModel === ''){

                                scope.selected = n[0];
                            } else {
                                if (attr.key) {
                                    scope.selected = _.filter(n, function(it, index) {

                                        return it[attr.asValue] === scope.ngModel;

                                    })[0] || {};
                                    modelInput[0].value = scope.selected[attr.key] || '';
                                } else {
                                    scope.selected = scope.ngModel;
                                }
                            }
                        }
                    });


                }
            }
        }
    }
}]);
