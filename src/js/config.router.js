(function () {
    'use strict';

    /**
     * Config for the router
     */
    angular.module('app')
        .run(appInit)
        .config(routerConfig);

    appInit.$inject = ['$rootScope', '$state', '$stateParams', '$localStorage', 'APP_CONST'];
    function appInit($rootScope, $state, $stateParams, $localStorage, APP_CONST) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.sysuser = $localStorage[APP_CONST.STORAGE.USER];
        $rootScope.menu = $localStorage[APP_CONST.STORAGE.MENU];

        $rootScope.$on('$stateChangeStart', function (event, to) {
            var isNotLogin = $.inArray(to.name, ['access.login']) === -1;

            if (isNotLogin && !$rootScope.sysuser) {
                event.preventDefault();
                $state.go("access.login");
            }
        });
    }

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function routerConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/app/dashboard');
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'tpl/app.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('toaster');
                        }]
                }
            })

            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'tpl/custom/framework/dashboard.html',
                controller: 'DashboardCtrl',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load([
                                'vendor/jquery/charts/sparkline/jquery.sparkline.min.js',
                                'vendor/jquery/charts/flot/jquery.flot.min.js',
                                'vendor/jquery/charts/flot/jquery.flot.resize.js',
                                'vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                                'vendor/jquery/charts/flot/jquery.flot.spline.js',
                                'vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                                'js/custom/framework/dashboard.js',
                                'js/custom/framework/dashboard-service.js'
                            ]);
                        }]
                }
            })

            .state('app.password', {
                url: '/password',
                controller: 'ResetPwdCtrl',
                templateUrl: 'tpl/custom/framework/reset-password.html',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/custom/framework/reset-password.js',
                                'js/custom/sys/user/user-service.js'
                            ]);
                        }]
                }
            })

            .state('app.sys', {
                url: '/sys',
                template: '<div ui-view></div>'
            })
            .state('app.sys.menu', {
                url: '/menu',
                template: '<div ui-view></div>'
            })
            .state('app.sys.menu.list', {
                url: '/list',
                templateUrl: 'tpl/custom/sys/menu/menu-list.html',
                controller: 'SysMenuListCtrl',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad',
                        function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load(['js/custom/sys/menu/menu-list.js',
                                'js/custom/sys/menu/menu-service.js'
                            ]).then(
                                function () {
                                    return $ocLazyLoad.load('ntt.TreeDnD');
                                }
                            );
                        }]
                }
            })
            .state('app.sys.menu.form', {
                url: '/form/{id}?pid={parentId}',
                templateUrl: 'tpl/custom/sys/menu/menu-form.html',
                controller: 'SysMenuFormCtrl',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/custom/sys/menu/menu-form.js',
                                'js/custom/sys/menu/menu-service.js'
                            ]);
                        }]
                }
            })

            .state('app.sys.user', {
                url: '/user',
                template: '<div ui-view></div>'
            })
            .state('app.sys.user.list', {
                url: '/list',
                templateUrl: 'tpl/custom/sys/user/user-list.html',
                controller: 'SysUserListCtrl',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/custom/sys/user/user-list.js',
                                'js/custom/sys/user/user-service.js'
                            ]);
                        }]
                }
            })
            .state('app.sys.user.form', {
                url: '/form/{id}',
                templateUrl: 'tpl/custom/sys/user/user-form.html',
                controller: 'SysUserFormCtrl',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/custom/sys/user/user-form.js',
                                'js/custom/sys/user/user-service.js',
                                'js/custom/sys/role/role-service.js'
                            ]);
                        }]
                }
            })
            .state('app.sys.user.info', {
                url: '/info',
                templateUrl: 'tpl/custom/sys/user/user-info.html',
                controller: 'SysUserInfoCtrl',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/custom/sys/user/user-info.js',
                                'js/custom/sys/user/user-service.js'
                            ]);
                        }]
                }
            })

            .state('app.sys.role', {
                url: '/role',
                template: '<div ui-view></div>'
            })
            .state('app.sys.role.list', {
                url: '/list',
                templateUrl: 'tpl/custom/sys/role/role-list.html',
                controller: 'SysRoleListCtrl',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/custom/sys/role/role-list.js',
                                'js/custom/sys/role/role-service.js'
                            ]);
                        }]
                }
            })
            .state('app.sys.role.form', {
                url: '/form/{id}',
                templateUrl: 'tpl/custom/sys/role/role-form.html',
                controller: 'SysRoleFormCtrl',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad',
                        function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load(['js/custom/sys/role/role-form.js',
                                'js/custom/sys/role/role-service.js',
                                'js/custom/sys/menu/menu-service.js'
                            ]).then(function () {
                                return $ocLazyLoad.load('ivh.treeview');
                            });
                        }]
                }
            })

            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
            .state('access.login', {
                url: '/login',
                templateUrl: 'tpl/custom/framework/login.html',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/custom/framework/login.js',
                                'js/custom/sys/user/user-service.js',
                                'js/custom/sys/menu/menu-service.js'
                            ]);
                        }]
                }
            })
            .state('access.404', {
                url: '/404',
                templateUrl: 'tpl/404.html'
            })

            .state('app.trip', {
                url: '/trip',
                template: '<div ui-view></div>'
            })
            .state('app.trip.user', {
                url: '/user',
                template: '<div ui-view></div>'
            })
            .state('app.trip.user.list', {
                url: '/list',
                templateUrl: 'tpl/custom/trip/user/user-list.html',
                controller: 'TripUserListCtrl',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/custom/trip/user/user-list.js',
                                'js/custom/trip/user/user-service.js'
                            ]);
                        }]
                }
            })
            .state('app.trip.user.form', {
                url: '/form/{id}',
                templateUrl: 'tpl/custom/trip/user/user-form.html',
                controller: 'TripUserFormCtrl',
                resolve: {
                    deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/custom/trip/user/user-form.js',
                                'js/custom/trip/user/user-service.js'
                            ]);
                        }]
                }
            })
        ;

    }
})();