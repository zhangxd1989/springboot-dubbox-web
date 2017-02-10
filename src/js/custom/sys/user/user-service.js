(function () {
    'use strict';

    angular.module('app')
        .service('SysUserService', SysUserService);

    SysUserService.$inject = ['$http', '$q', 'APP_CONST'];
    function SysUserService($http, $q, APP_CONST) {

        this.retrieve = function retrieve() {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/sys/user/info')
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.list = function list(params) {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/sys/user/list', {
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

        this.deleteById = function deleteById(id) {
            var d = $q.defer();

            $http.delete(APP_CONST.PROPERTY.API_URL + '/sys/user/' + id)
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

            $http.get(APP_CONST.PROPERTY.API_URL + '/sys/user/' + id)
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.saveData = function saveData(data) {
            var d = $q.defer();

            $http.post(APP_CONST.PROPERTY.API_URL + '/sys/user', data)
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.saveInfo = function saveData(data) {
            var d = $q.defer();

            $http.post(APP_CONST.PROPERTY.API_URL + '/sys/user/info', data)
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.resetPwd = function saveData(data) {
            var d = $q.defer();

            $http.put(APP_CONST.PROPERTY.API_URL + '/sys/user/password', data)
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