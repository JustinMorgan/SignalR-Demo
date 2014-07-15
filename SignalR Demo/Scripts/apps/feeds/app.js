(function () {
    "use strict";
    angular.module('Feeds.services', ['ui.router', 'ngResource']);
    angular.module('Feeds.directives', ['common-utils', 'ui.bootstrap', 'ngAnimate']);
    angular.module('Feeds', ['Feeds.services', 'Feeds.directives'])
        .config([
            '$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/');
                $stateProvider.state("List", {
                    url: "/",
                    controller: 'List'
                });
            }
        ]);
})();