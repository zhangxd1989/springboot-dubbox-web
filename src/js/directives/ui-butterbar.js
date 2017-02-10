(function () {
    'use strict';

    angular.module('app')
        .directive('uiButterbar', uiButterbar);

    uiButterbar.$inject = ['$anchorScroll'];
    function uiButterbar($anchorScroll) {
        return {
            restrict: 'AC',
            template: '<span class="bar"></span>',
            link: function (scope, el) {
                el.addClass('butterbar hide');
                scope.$on('$stateChangeStart', function () {
                    $anchorScroll();
                    el.removeClass('hide').addClass('active');
                });
                scope.$on('$stateChangeSuccess', function (event) {
                    event.targetScope.$watch('$viewContentLoaded', function () {
                        el.addClass('hide').removeClass('active');
                    })
                });
            }
        };
    }

})();