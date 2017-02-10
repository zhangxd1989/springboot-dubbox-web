(function () {
    'use strict';

    angular.module('app')
        .controller('TripUserFormCtrl', TripUserFormCtrl);

    TripUserFormCtrl.$inject = ['$rootScope', '$scope', '$state', 'TripUserService'];
    function TripUserFormCtrl($rootScope, $scope, $state, tripUserService) {

        var id = $state.params.id;

        $scope.title = '用户详情';
        $rootScope.loading = true;
        tripUserService.getById(id)
            .then(function (data) {
                $scope.data = data;
            })
            .finally(function () {
                $rootScope.loading = false;
            })
        ;

    }
})();