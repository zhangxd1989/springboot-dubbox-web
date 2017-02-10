(function () {
    'use strict';

    angular.module('app')
        .config(appConfig)
    ;

    appConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];
    function appConfig($controllerProvider, $compileProvider, $filterProvider, $provide) {

        var app =
            angular.module('app');

        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
    }

})();