(function () {
    'use strict';

    angular.module('app')
        .controller('SysUserFormCtrl', SysUserFormCtrl);

    SysUserFormCtrl.$inject = ['$rootScope', '$scope', '$state', '$filter', 'toaster', 'SysUserService', 'SysRoleService', 'DICT_CONST'];
    function SysUserFormCtrl($rootScope, $scope, $state, $filter, toaster, sysUserService, sysRoleService, DICT_CONST) {

        var id = $state.params.id;

        $scope.yes_no = DICT_CONST.YES_NO;

        $rootScope.loading = true;
        if (!!id) { //编辑
            $scope.title = '用户详情';
        } else { //新建
            $scope.title = '新建用户';
            $scope.user = {
                enabled: true
            };
        }

        sysRoleService.listAll()
            .then(function (data) {
                $scope.roles = data;
                if (!!id) {
                    sysUserService.getById(id)
                        .then(function (data) {
                            $scope.user = data;
                            var userRoles = [];
                            angular.forEach(data.roles, function (userRole) {
                                userRoles.push(userRole.id);
                            });
                            angular.forEach($scope.roles, function (role) {
                                role.checked = $.inArray(role.id, userRoles) >= 0;
                            });
                            $scope.selectedRoles();
                        })
                    ;
                }
            })
            .finally(function () {
                $rootScope.loading = false;
            });

        $scope.selectedRoles = function () {
            $scope.selected = $filter('filter')($scope.roles, {checked: true});
        };

        $scope.saveData = function () {
            $rootScope.loading = true;

            var selected = [];
            angular.forEach($scope.selected, function (role) {
                selected.push({id: role.id});
            });
            $scope.user.roles = selected;

            sysUserService.saveData($scope.user)
                .then(function (data) {
                    $state.go('app.sys.user.form', {
                        id: data.id
                    });
                    toaster.pop('success', '', '保存成功');
                })
                .finally(function () {
                    $rootScope.loading = false;
                })
            ;
        }

    }
})();