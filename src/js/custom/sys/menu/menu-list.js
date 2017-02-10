(function () {
    'use strict';

    angular.module('app')
        .controller('SysMenuListCtrl', SysMenuListCtrl);

    SysMenuListCtrl.$inject = ['$rootScope', '$scope', '$state', '$TreeDnDConvert', 'dialogs', 'SysMenuService'];
    function SysMenuListCtrl($rootScope, $scope, $state, $TreeDnDConvert, dialogs, sysMenuService) {

        $scope.title = '菜单管理';

        var tree;
        $scope.tree_data = {};
        $scope.my_tree = tree = {};

        $scope.filter = {};

        $scope.my_tree.update = function (node) {
            $state.go('app.sys.menu.form', {
                id: node.id,
                parentId: node.parentId
            });
        };

        $scope.my_tree.delete = function (node) {

            dialogs.confirm('确认', '要删除该菜单及所有子菜单项吗？', {
                size: 'md'
            })
                .result.then(function () {
                sysMenuService.deleteById(node.id)
                    .then(function () {
                        $state.reload();
                    })
                ;
            });
        };

        $scope.my_tree.addChild = function (node) {
            $state.go('app.sys.menu.form', {
                parentId: node.id,
                level: node.__level__
            });
        };

        $scope.expanding_property = {
            field: 'name',
            displayName: '名称'
        };
        $scope.col_defs = [
            {
                field: 'href',
                displayName: '链接'
            }, {
                field: 'sort',
                displayName: '排序',
                titleClass: 'text-center',
                cellClass: 'text-center'
            }, {
                field: 'show',
                titleClass: 'text-center',
                cellClass: 'text-center',
                displayName: '可见',
                cellTemplate: '<span>{{node.show | dict: "YES_NO" }}</span>'
            }, {
                field: 'permission',
                displayName: '权限标识'
            }, {
                displayName: '操作',
                cellTemplate: '<button ng-click="tree.update(node)" class="btn btn-default btn-sm">详情</button>'
                + '<button ng-click="tree.delete(node)" class="btn btn-default btn-sm m-l-xs" ng-if="hasAuthority(\'sys:menu:edit\')">删除</button>'
                + '<button ng-click="tree.addChild(node)" class="btn btn-default btn-sm m-l-xs" ng-if="hasAuthority(\'sys:menu:edit\')">添加子菜单</button>'
            }];

        $rootScope.loading = true;
        sysMenuService.list()
            .then(function (data) {
                $scope.tree_data = $TreeDnDConvert.line2tree(data, 'id', 'parentId');
            })
            .finally(function () {
                $rootScope.loading = false;
            })
        ;

    }
})();