(function (window, angular, undefined) {
    'use strict';
    var module = angular.module('common-utils', ['ng', 'common-utils.tpls']);
    angular.module("common-utils.tpls", ["template/sort-by.html"]);

    //directives

    //example: <input name="myDate" datify />
    module.directive('datify', function () {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                elem.datify();
            }
        };
    });

    module.directive('selectbox', function () {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                elem.sb({ fixedWidth: true, useTie: true });
            }
        };
    });

    


    module.directive('shortdateinput', ['$filter', function ($filter) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, ngModelController) {
                ngModelController.$parsers.push(function(data) {
                    //View -> Model
                    return data;
                });
                ngModelController.$formatters.push(function(data) {
                    //Model -> View
                    return $filter('date')(data, "MM/dd/yyyy");
                });
            }
        };
    }]);

    module.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });

    module.directive('sortBy', function () {
        return {
            templateUrl: 'template/sort-by.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                sortdir: '=',
                sortedby: '=',
                sortvalue: '@',
                onsort: '='
            },
            link: function (scope, element, attrs) {
                scope.sort = function () {
                    if (scope.sortedby == scope.sortvalue)
                        scope.sortdir = scope.sortdir == 'asc' ? 'desc' : 'asc';
                    else {
                        scope.sortedby = scope.sortvalue;
                        scope.sortdir = 'asc';
                    }
                    scope.onsort(scope.sortedby, scope.sortdir);
                }
            }
        };
    });

    angular.module("template/sort-by.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/sort-by.html",
        "<a href=\"\" ng-click=\"sort(sortvalue)\" style=\"white-space:nowrap;\">\n" +
        "  <span ng-transclude=\"\"></span>\n" +
        "  <span ng-show=\"sortedby == sortvalue\">\n" +
        "    <i class=\"fa\" ng-class=\"{true: 'fa-chevron-down', false: 'fa-chevron-up'}[sortdir == 'asc']\"></i>\n" +
        "    </span>\n" +
        "</a>\n");
    }]);

    angular.module('ngon', []).factory('ngon', function () { return window.ngon || {}; });
    angular.module('underscore', []).factory('_', function () { return window._; });



})(window, window.angular);