(function () {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$rootScope', '$scope', '$state', '$localStorage', '$sessionStorage', 'AuthService', 'SysUserService', 'SysMenuService', 'APP_CONST'];
    function LoginCtrl($rootScope, $scope, $state, $localStorage, $sessionStorage, authService, sysUserService, sysMenuService, APP_CONST) {
        $scope.user = {};
        $scope.authError = null;
        $scope.usernameFocus = true;

        $scope.login = function () {
            $scope.authError = null;
            $rootScope.loading = true;

            authService.login($scope.user)
                .then(function (data) {
                    if ($scope.rememberPwd) {
                        $localStorage[APP_CONST.STORAGE.AUTH_TOKEN] = data.access_token;
                    }
                    $sessionStorage[APP_CONST.STORAGE.AUTH_TOKEN] = data.access_token;
                    sysUserService.retrieve()
                        .then(function (data) {
                            $localStorage[APP_CONST.STORAGE.USER] = data;
                            $rootScope.sysuser = data;
                            $state.go('app.dashboard');
                        });
                    sysMenuService.nav()
                        .then(function (data) {
                            $localStorage[APP_CONST.STORAGE.MENU] = data;
                            $rootScope.menu = data;
                        });
                })
                .catch(function () {
                    $scope.authError = '登录失败,请重试';
                })
                .finally(function () {
                    $rootScope.loading = false;
                });
        };

    }
})();