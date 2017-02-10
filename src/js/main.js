(function () {
    'use strict';

    angular.module('app')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$rootScope', '$scope', '$state', '$localStorage', '$sessionStorage', '$window', 'dialogs', 'AuthService', 'APP_CONST'];
    function AppCtrl($rootScope, $scope, $state, $localStorage, $sessionStorage, $window, dialogs, authService, APP_CONST) {
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

        // config
        $scope.app = {
            name: '管理平台',
            version: '1.0.0',
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: true,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        };

        // save settings to local storage
        if (angular.isDefined($localStorage.settings)) {
            $scope.app.settings = $localStorage.settings;
        } else {
            $localStorage.settings = $scope.app.settings;
        }
        $scope.$watch('app.settings', function () {
            if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                // aside dock and fixed must set the header fixed.
                $scope.app.settings.headerFixed = true;
            }
            // save to local storage
            $localStorage.settings = $scope.app.settings;
        }, true);

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        $rootScope.logout = function () {
            dialogs.confirm('确认', '确认退出登录?', {
                size: 'md'
            })
                .result.then(function () {
                authService.logout()
                    .finally(function () {
                        $sessionStorage[APP_CONST.STORAGE.AUTH_TOKEN] = '';
                        $localStorage[APP_CONST.STORAGE.AUTH_TOKEN] = '';
                        $localStorage[APP_CONST.STORAGE.USER] = {};
                        $localStorage[APP_CONST.STORAGE.MENU] = [];

                        delete $rootScope[APP_CONST.STORAGE.USER];
                        $state.go("access.login");
                    })
                ;
            });
        };

        $rootScope.hasAuthority = function (authority) {
            var user = $localStorage[APP_CONST.STORAGE.USER];
            var authorities = [];
            angular.forEach(user.authorities, function (data) {
                authorities.push(data.authority)
            });
            return $.inArray(authority, authorities) >= 0;
        };
    }

})();