(function () {
    'use strict';

    angular.module('app')
        .controller('SysUserInfoCtrl', SysUserInfoCtrl);

    SysUserInfoCtrl.$inject = ['$rootScope', '$scope', 'toaster', 'SysUserService'];
    function SysUserInfoCtrl($rootScope, $scope, toaster, sysUserService) {

        $scope.title = '个人信息';
        var id = $rootScope.sysuser.id;

        $rootScope.loading = true;
        sysUserService.getById(id)
            .then(function (data) {
                $scope.user = data;
            })
            .finally(function () {
                $rootScope.loading = false;
            })
        ;

        $scope.saveData = function () {
            $rootScope.loading = true;
            sysUserService.saveInfo($scope.user)
                .then(function () {
                    toaster.pop('success', '', '保存成功');
                })
                .finally(function () {
                    $rootScope.loading = false;
                })
            ;
        }

    }
})();