(function () {
    'use strict';

    angular.module('app')
        .directive('uiOrderColumn', uiOrderColumn);

    function uiOrderColumn() {
        "use strict";

        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                if (!attrs.uiOrderColumn) {
                    throw ("configuration object must be specified");
                }

                var property = attrs.uiOrderColumn;

                el.addClass('sorting');

                el.on('click', function () {
                    var sort = '';
                    if (el.hasClass('sorting_asc')) {
                        sort = 'asc';
                    } else if (el.hasClass('sorting_desc')) {
                        sort = 'desc';
                    }
                    angular.forEach($("th[ui-order-column]"), function (el) {
                        $(el).removeClass('sorting_asc').removeClass('sorting_desc');
                    });
                    if (sort == '') {
                        el.addClass('sorting_asc');
                        scope.params.orderBy = property + ' ASC';
                    } else if (sort == 'asc') {
                        el.addClass('sorting_desc');
                        scope.params.orderBy = property + ' DESC';
                    } else {
                        scope.params.orderBy = '';
                    }
                    scope.search();
                });
            }
        };
    }
})();