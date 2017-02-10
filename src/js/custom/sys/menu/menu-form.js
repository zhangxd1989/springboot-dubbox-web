(function () {
    'use strict';

    angular.module('app')
        .controller('SysMenuFormCtrl', SysMenuFormCtrl);

    SysMenuFormCtrl.$inject = ['$rootScope', '$scope', '$state', 'toaster', 'SysMenuService', 'DICT_CONST'];
    function SysMenuFormCtrl($rootScope, $scope, $state, toaster, sysMenuService, DICT_CONST) {

        var id = $state.params.id;
        var parentId = $state.params.parentId;

        $scope.yes_no = DICT_CONST.YES_NO;

        if (!!id) { //编辑
            $scope.title = '菜单详情';
            $rootScope.loading = true;
            sysMenuService.getById(id)
                .then(function (data) {
                    $scope.menu = data;
                })
                .finally(function () {
                    $rootScope.loading = false;
                })
            ;
        } else if (!id && !parentId) { //新建
            $scope.title = '新建菜单';
            $scope.menu = {
                id: '',
                parentId: '',
                icon: 'icon-star',
                sort: 0,
                show: true
            };
        } else if (!id && !!parentId) { //添加子菜单
            $scope.title = '添加子菜单';
            $scope.menu = {
                id: '',
                parentId: parentId,
                sort: 0,
                show: false
            };
        }


        $scope.saveData = function () {
            $rootScope.loading = true;
            sysMenuService.saveData($scope.menu)
                .then(function (data) {
                    $state.go('app.sys.menu.form', {
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