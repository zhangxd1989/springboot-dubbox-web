(function () {
    'use strict';

    angular.module('app')
        .service('SysRoleService', SysRoleService);

    SysRoleService.$inject = ['$http', '$q', 'APP_CONST'];
    function SysRoleService($http, $q, APP_CONST) {

        this.list = function list(params) {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/sys/role/list', {
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

        this.listAll = function list() {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/sys/role/all')
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

            $http.delete(APP_CONST.PROPERTY.API_URL + '/sys/role/' + id)
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

            $http.get(APP_CONST.PROPERTY.API_URL + '/sys/role/' + id)
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

            $http.post(APP_CONST.PROPERTY.API_URL + '/sys/role', data)
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