(function () {
    'use strict';

    angular.module('app')
        .service('TripUserService', TripUserService);

    TripUserService.$inject = ['$http', '$q', 'APP_CONST'];
    function TripUserService($http, $q, APP_CONST) {

        this.list = function list(params) {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/trip/user/list', {
                params: params
            })
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.getById = function getById(id) {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/trip/user/' + id)
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