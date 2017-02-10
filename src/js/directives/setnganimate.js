(function () {
    'use strict';

    angular.module('app')
        .directive('setNgAnimate', setNgAnimate);

    setNgAnimate.$inject = ['$animate'];
    function setNgAnimate($animate) {
        return {
            link: function ($scope, $element, $attrs) {
                $scope.$watch(function () {
                    return $scope.$eval($attrs.setNgAnimate, $scope);
                }, function (valnew) {
                    $animate.enabled(!!valnew, $element);
                });
            }
        };
    }
})();