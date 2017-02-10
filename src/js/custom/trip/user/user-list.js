(function () {
    'use strict';

    angular.module('app')
        .controller('TripUserListCtrl', TripUserListCtrl);

    TripUserListCtrl.$inject = ['$rootScope', '$scope', 'TripUserService', 'DICT_CONST'];
    function TripUserListCtrl($rootScope, $scope, tripUserService, DICT_CONST) {

        $scope.title = '用户信息';
        $scope.gender = DICT_CONST.GENDER;
        $scope.yes_no = DICT_CONST.YES_NO;
        $scope.params = {
            pageNum: 1,
            pageSize: 20,
            orderBy: ''
        };

        $scope.search = function () {
            $rootScope.loading = true;
            tripUserService.list($scope.params)
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
    }
})();