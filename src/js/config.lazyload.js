(function () {
    'use strict';
// lazyload config

    angular.module('app')

        .constant('JQ_CONFIG', {
                easyPieChart: ['vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
                sparkline: ['vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
                plot: ['vendor/jquery/charts/flot/jquery.flot.min.js',
                    'vendor/jquery/charts/flot/jquery.flot.resize.js',
                    'vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                    'vendor/jquery/charts/flot/jquery.flot.spline.js',
                    'vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                    'vendor/jquery/charts/flot/jquery.flot.pie.min.js']
            }
        )
        // oclazyload config
        .config(lazyLoadConfig)
    ;

    lazyLoadConfig.$inject = ['$ocLazyLoadProvider'];
    function lazyLoadConfig($ocLazyLoadProvider) {
        // We configure ocLazyLoad to use the lib script.js as the async loader
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: [
                {
                    name: 'ntt.TreeDnD',
                    files: [
                        'vendor/modules/angular-tree-dnd/ng-tree-dnd.min.js',
                        'vendor/modules/angular-tree-dnd/ng-tree-dnd.min.css'
                    ]
                },
                {
                    name: 'ivh.treeview',
                    files: [
                        'vendor/modules/angular-ivh-treeview/ivh-treeview.min.js',
                        'vendor/modules/angular-ivh-treeview/ivh-treeview.min.css',
                        'vendor/modules/angular-ivh-treeview/ivh-treeview-theme-basic.css'
                    ]
                },
                {
                    name: 'ui.select',
                    files: [
                        'vendor/modules/angular-ui-select/select.min.js',
                        'vendor/modules/angular-ui-select/select.min.css'
                    ]
                },
                {
                    name: 'angularFileUpload',
                    files: [
                        'vendor/modules/angular-file-upload/angular-file-upload.min.js',
                        'vendor/modules/angular-file-upload/ngThumb.js'
                    ]
                },
                {
                    name: 'toaster',
                    files: [
                        'vendor/modules/angularjs-toaster/toaster.js',
                        'vendor/modules/angularjs-toaster/toaster.css'
                    ]
                }
            ]
        });
    }
})();