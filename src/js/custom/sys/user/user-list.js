(function () {
    'use strict';

    angular.module('app')
        .controller('SysUserListCtrl', SysUserListCtrl);

    SysUserListCtrl.$inject = ['$rootScope', '$scope', '$state', 'dialogs', 'SysUserService'];
    function SysUserListCtrl($rootScope, $scope, $state, dialogs, sysUserService) {

        $scope.title = '用户管理';
        $scope.params = {
            pageNum: 1,
            pageSize: 20,
            orderBy: ''
        };

        $scope.search = function () {
            $rootScope.loading = true;
            sysUserService.list($scope.params)
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

            dialogs.confirm('确认', '要删除该用户吗？', {
                size: 'md'
            })
                .result.then(function () {
                sysUserService.deleteById(id)
                    .then(function () {
                        $state.reload();
                    })
                ;
            });
        };

    }
})();