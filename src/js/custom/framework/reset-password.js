(function () {
    'use strict';

    angular.module('app')
        .controller('ResetPwdCtrl', ResetPwdCtrl);

    ResetPwdCtrl.$inject = ['$rootScope', '$scope', '$state', 'SysUserService'];
    function ResetPwdCtrl($rootScope, $scope, $state, sysUserService) {

        $scope.title = '重置密码';
        $scope.user = {};

        $scope.saveData = function () {
            $rootScope.loading = true;
            sysUserService.resetPwd($scope.user)
                .then(function () {
                    $state.go('access.login');
                })
                .finally(function () {
                    $rootScope.loading = false;
                })
            ;
        }

    }
})();