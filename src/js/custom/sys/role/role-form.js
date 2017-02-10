(function () {
    'use strict';

    angular.module('app')
        .controller('SysRoleFormCtrl', SysRoleFormCtrl);

    SysRoleFormCtrl.$inject = ['$rootScope', '$scope', '$state', '$filter', 'toaster', 'SysRoleService', 'SysMenuService', 'DICT_CONST'];
    function SysRoleFormCtrl($rootScope, $scope, $state, $filter, toaster, sysRoleService, sysMenuService, DICT_CONST) {

        var id = $state.params.id;

        $scope.treeOpts = {
            labelAttribute: 'name',
            expandToDepth: 2,
            twistieCollapsedTpl: '<span class="fa fa-fw fa-angle-right"></span>',
            twistieExpandedTpl: '<span class="fa fa-fw fa-angle-down"></span>',
            twistieLeafTpl: '<span class="fa fa-fw"></span>'
        };

        $scope.yes_no = DICT_CONST.YES_NO;

        if (!!id) { //编辑
            $scope.title = '角色详情';
        } else { //新建
            $scope.title = '新建角色';
            $scope.role = {
                enabled: true
            };
        }

        $rootScope.loading = true;
        sysMenuService.tree()
            .then(function (data) {
                var sortOrder = function (nodes) {
                    nodes = $filter('orderBy')(nodes, ['sort'], false);
                    angular.forEach(nodes, function (node) {
                        if (node.children && node.children.length > 0) {
                            node.children = sortOrder(node.children);
                        }
                    });
                    return nodes;
                };

                $scope.menus = sortOrder(data);

                if (!!id) {
                    sysRoleService.getById(id)
                        .then(function (data) {
                            $scope.role = data;

                            var roleMenus = [];
                            angular.forEach(data.menus, function (roleMenu) {
                                roleMenus.push(roleMenu.id);
                            });

                            $scope.selectNode($scope.menus, roleMenus);
                        });
                }
            })
            .finally(function () {
                $rootScope.loading = false;
            })
        ;

        $scope.selectNode = function (menus, data) {
            angular.forEach(menus, function (menu) {
                menu.selected = $.inArray(menu.id, data) >= 0;
                if (menu.children && menu.children.length > 0) {
                    $scope.selectNode(menu.children, data);
                }
            });
        };


        $scope.saveData = function () {
            $rootScope.loading = true;

            var selected = [];
            $scope.getSelected(selected, $scope.menus);

            $scope.role.menus = selected;

            sysRoleService.saveData($scope.role)
                .then(function (data) {
                    $state.go('app.sys.role.form', {
                        id: data.id
                    });
                    toaster.pop('success', '', '保存成功');
                })
                .finally(function () {
                    $rootScope.loading = false;
                })
            ;
        };

        $scope.getSelected = function (selected, menus) {
            angular.forEach(menus, function (menu) {
                if (menu.selected) selected.push({id: menu.id});
                if (menu.children && menu.children.length > 0) {
                    $scope.getSelected(selected, menu.children);
                }
            });
        };
    }
})();