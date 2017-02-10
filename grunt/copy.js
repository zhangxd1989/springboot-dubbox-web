module.exports = {
    dev: {
        nonull: true,
        files: [
            // Include our bower JS dependencies

            // angular
            {src: "bower_components/angular/angular.min.js", dest: "src/vendor/angular/angular.min.js"},
            {src: "bower_components/angular/angular.min.js.map", dest: "src/vendor/angular/angular.min.js.map"},
            {src: "bower_components/angular-animate/angular-animate.min.js", dest: "src/vendor/angular/angular-animate/angular-animate.min.js"},
            {src: "bower_components/angular-animate/angular-animate.min.js.map", dest: "src/vendor/angular/angular-animate/angular-animate.min.js.map"},
            {src: "bower_components/angular-cookies/angular-cookies.min.js", dest: "src/vendor/angular/angular-cookies/angular-cookies.min.js"},
            {src: "bower_components/angular-cookies/angular-cookies.min.js.map", dest: "src/vendor/angular/angular-cookies/angular-cookies.min.js.map"},
            {src: "bower_components/angular-resource/angular-resource.min.js", dest: "src/vendor/angular/angular-resource/angular-resource.min.js"},
            {src: "bower_components/angular-resource/angular-resource.min.js.map", dest: "src/vendor/angular/angular-resource/angular-resource.min.js.map"},
            {src: "bower_components/angular-sanitize/angular-sanitize.min.js", dest: "src/vendor/angular/angular-sanitize/angular-sanitize.min.js"},
            {src: "bower_components/angular-sanitize/angular-sanitize.min.js.map", dest: "src/vendor/angular/angular-sanitize/angular-sanitize.min.js.map"},
            {src: "bower_components/angular-touch/angular-touch.min.js", dest: "src/vendor/angular/angular-touch/angular-touch.min.js"},
            {src: "bower_components/angular-touch/angular-touch.min.js.map", dest: "src/vendor/angular/angular-touch/angular-touch.min.js.map"},

            // angular-dialogs
            {src: "bower_components/angular-dialog-service/dist/dialogs.min.js", dest: "src/vendor/angular/angular-dialog/dialogs.min.js"},
            {src: "bower_components/angular-dialog-service/dist/dialogs.min.css", dest: "src/css/dialogs.min.css"},

            // bootstrap
            {src: "bower_components/bootstrap/dist/css/bootstrap.css", dest: "src/css/bootstrap.css"},
            {src: "bower_components/bootstrap/dist/css/bootstrap.css.map", dest: "src/css/bootstrap.css.map"},
            {src: "bower_components/bootstrap/dist/js/bootstrap.js", dest: "src/vendor/jquery/bootstrap.js"},
            {src: "**", dest: "src/fonts", cwd: 'bower_components/bootstrap/fonts', expand : true},

            // fontawesome
            {src: "bower_components/font-awesome/css/font-awesome.min.css", dest: "src/css/font-awesome.min.css"},
            {src: "**", dest: "src/fonts", cwd: 'bower_components/font-awesome/fonts', expand : true},

            // libs
            {src: "bower_components/screenfull/dist/screenfull.min.js", dest: "src/vendor/libs/screenfull.min.js"},

            // core
            {src: "bower_components/angular-ui-router/release/angular-ui-router.min.js", dest: "src/vendor/angular/angular-ui-router/angular-ui-router.min.js"},
            {src: "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js", dest: "src/vendor/angular/angular-bootstrap/ui-bootstrap-tpls.min.js"},
            {src: "bower_components/angular-ui-utils/ui-utils.min.js", dest: "src/vendor/angular/angular-ui-utils/ui-utils.min.js"},
            {src: "bower_components/ngstorage/ngStorage.min.js", dest: "src/vendor/angular/ngstorage/ngStorage.min.js"},
            {src: "bower_components/oclazyload/dist/ocLazyLoad.min.js", dest: "src/vendor/angular/oclazyload/ocLazyLoad.min.js"},

            // modules for lazy load
            {src: "bower_components/angular-ui-select/dist/select.min.js", dest: "src/vendor/modules/angular-ui-select/select.min.js"},
            {src: "bower_components/angular-ui-select/dist/select.min.js.map", dest: "src/vendor/modules/angular-ui-select/select.min.js.map"},
            {src: "bower_components/angular-ui-select/dist/select.min.css", dest: "src/vendor/modules/angular-ui-select/select.min.css"},
            {src: "bower_components/angular-ui-select/dist/select.min.css.map", dest: "src/vendor/modules/angular-ui-select/select.min.css.map"},

            {src: "bower_components/angular-file-upload/dist/angular-file-upload.min.js", dest: "src/vendor/modules/angular-file-upload/angular-file-upload.min.js"},
            {src: "bower_components/angular-file-upload/dist/angular-file-upload.min.js.map", dest: "src/vendor/modules/angular-file-upload/angular-file-upload.min.js.map"},

            {src: "bower_components/angular-tree-dnd/dist/ng-tree-dnd.min.js", dest: "src/vendor/modules/angular-tree-dnd/ng-tree-dnd.min.js"},
            {src: "bower_components/angular-tree-dnd/dist/ng-tree-dnd.min.css", dest: "src/vendor/modules/angular-tree-dnd/ng-tree-dnd.min.css"},

            // toaster
            {src: "bower_components/angularjs-toaster/toaster.js", dest: "src/vendor/modules/angularjs-toaster/toaster.js"},
            {src: "bower_components/angularjs-toaster/toaster.css", dest: "src/vendor/modules/angularjs-toaster/toaster.css"}
        ]
    },
    angular: {
        files: [
            {expand: true, dest: 'angular/', src:'**', cwd:'src/'},
            {dest: 'angular/index.html', src:'src/index.min.html'}
        ]
    }
};