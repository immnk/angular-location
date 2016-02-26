var app = angular.module('starter', ['ui.bootstrap', 'ui.bootstrap.collapse',
    'ui.router', 'ngMaterial', 'ngAnimate'
]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$controllerProvider',
    '$compileProvider',
    '$filterProvider',
    '$provide',
    function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider,
        $filterProvider, $provide) {
        $stateProvider

        .state('menu', {
            url: '/menu',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'MenuCtrl',
            resolve: {
                load: ['$q', '$rootScope', function($q, $rootScope) {

                    var deferred = $q.defer();

                    require([
                        'js/controllers/menu-controller'
                    ], function() {

                        $rootScope.$apply(function() {
                            deferred.resolve();
                        });

                    });

                    return deferred.promise;
                }]
            }
        })

        .state('menu.dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {
                load: ['$q', '$rootScope', function($q, $rootScope) {

                    var deferred = $q.defer();

                    require([
                        'js/controllers/dashboard-controller'
                    ], function() {

                        $rootScope.$apply(function() {
                            deferred.resolve();
                        });

                    });

                    return deferred.promise;
                }]
            }
        })

        .state('menu.aboutus', {
            url: '/aboutus',
            templateUrl: 'templates/about-us.html'
        })

        .state('menu.contact', {
            url: '/contact',
            templateUrl: 'templates/contact-us.html'
        });

        $urlRouterProvider.otherwise('/menu/dashboard');

        app.components = {
            controller: $controllerProvider.register,
            service: $provide.service
        }
    }
]);
