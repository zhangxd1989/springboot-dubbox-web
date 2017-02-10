module.exports = {
    vendor: {
        options :{
            stripBanners: true
        },
        src: [
            'src/vendor/jquery/jquery.min.js',
            'src/vendor/jquery/jquery-ui.min.js',
            'src/vendor/jquery/ladda/spin.min.js',
            'src/vendor/jquery/ladda/ladda.min.js',
            'src/vendor/angular/angular.min.js',
            'src/vendor/angular/**/*.js'
        ],
        dest: 'angular/vendor/vendor.min.js'
    },
    app: {
        options :{
            stripBanners: true
        },
        src: [
            'src/js/*.js',
            'src/js/directives/*.js',
            'src/js/filters/*.js',
            'src/js/services/*.js'
        ],
        dest: 'angular/js/dist.js'
    }
};