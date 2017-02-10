(function () {
    'use strict';

    angular.module('app')
        .directive('uiModule', uiModule);

    uiModule.$inject = ['MODULE_CONFIG', 'uiLoad', '$compile'];
    function uiModule(MODULE_CONFIG, uiLoad, $compile) {
        return {
            restrict: 'A',
            compile: function (el) {
                var contents = el.contents().clone();
                return function (scope, el, attrs) {
                    el.contents().remove();
                    uiLoad.load(MODULE_CONFIG[attrs.uiModule])
                        .then(function () {
                            $compile(contents)(scope, function (clonedElement) {
                                el.append(clonedElement);
                            });
                        });
                }
            }
        };
    }
})();