module.exports = {
    min: {
        files: [{
            expand: true,
            cwd: 'src/tpl/',
            src: ['*.html', '**/*.html'],
            dest: 'angular/tpl/',
            ext: '.html',
            extDot: 'first'
        }]
    }
};