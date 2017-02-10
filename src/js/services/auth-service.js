(function () {
    'use strict';

    angular.module('app')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http', '$q', 'APP_CONST'];
    function AuthService($http, $q, APP_CONST) {

        this.login = function (credentials) {
            var d = $q.defer();

            $http.post(APP_CONST.PROPERTY.API_URL + '/auth/token', {
                loginName: credentials.username,
                password: credentials.password
            })
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.refresh = function () {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/auth/refresh')
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.logout = function () {
            var d = $q.defer();

            $http.delete(APP_CONST.PROPERTY.API_URL + '/auth/token', null)
                .success(function () {

                    d.resolve();
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };
    }
})();