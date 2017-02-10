(function () {
    'use strict';

    angular.module('app')
        .service('DashboardService', DashboardService);

    DashboardService.$inject = ['$http', '$q', 'APP_CONST'];
    function DashboardService($http, $q, APP_CONST) {

        this.get = function get() {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/dashboard')
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };
    }
})();