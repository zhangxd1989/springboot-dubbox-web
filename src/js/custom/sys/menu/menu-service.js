(function () {
    'use strict';

    angular.module('app')
        .service('SysMenuService', SysMenuService);

    SysMenuService.$inject = ['$http', '$q', 'APP_CONST'];
    function SysMenuService($http, $q, APP_CONST) {

        this.nav = function tree() {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/sys/menu/nav')
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.tree = function tree() {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/sys/menu/tree')
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.list = function list() {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/sys/menu/list')
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

            $http.delete(APP_CONST.PROPERTY.API_URL + '/sys/menu/' + id)
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

            $http.get(APP_CONST.PROPERTY.API_URL + '/sys/menu/' + id)
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

            $http.post(APP_CONST.PROPERTY.API_URL + '/sys/menu', data)
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        }

    }
})();