(function () {
    'use strict';

    angular.module('app')
        .controller('SysRoleListCtrl', SysRoleListCtrl);

    SysRoleListCtrl.$inject = ['$rootScope', '$scope', '$state', 'dialogs', 'SysRoleService'];
    function SysRoleListCtrl($rootScope, $scope, $state, dialogs, sysRoleService) {

        $scope.title = '角色管理';
        $scope.params = {
            pageNum: 1,
            pageSize: 20,
            orderBy: ''
        };

        $scope.search = function () {
            $rootScope.loading = true;
            sysRoleService.list($scope.params)
                .then(function (data) {
                    $scope.pageInfo = data;
                })
                .finally(function () {
                    $rootScope.loading = false;
                })
            ;
        };

        $scope.search();

        $scope.pageChanged = function () {
            $scope.params.pageNum = $scope.pageInfo.pageNum;
            $scope.search();
        };

        $scope.delete = function (id) {

            dialogs.confirm('确认', '要删除该角色吗？', {
                size: 'md'
            })
                .result.then(function () {
                sysRoleService.deleteById(id)
                    .then(function () {
                        $state.reload();
                    })
                ;
            });
        };

    }
})();