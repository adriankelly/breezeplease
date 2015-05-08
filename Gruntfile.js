module.exports = function(grunt) {

grunt.initConfig({


// ng Annotate

	ngAnnotate: {
        options: {
            singleQuotes: true,
        },
        app1: {
            files: {
                'build/ngAnnotate/app.js': ['app/js/app.js'],
                'build/ngAnnotate/controllers/AppController.js': ['app/js/controllers/AppController.js'],
                'build/ngAnnotate/directives.js': ['app/js/directives.js'],
                'build/ngAnnotate/filters.js': ['app/js/filters.js'],
                'build/ngAnnotate/services.js': ['app/js/services.js']
            },
        },
    },

// Autoprefix
    autoprefixer: {

        options: {
            browsers: ['last 2 versions']
        },

        multiple_files: {
            expand: true,
            flatten: true,
            src: ['app/css/style.css'], // -> src/css/file1.css, src/css/file2.css

            // Modify last folder name
            dest: 'build/autoprefixer/style.css' // -> dest/css/file1.css, dest/css/file2.css
      }
    },

// Concat JS & CSS

    concat: {
        css: {
            src: [
                'app/css/bootstrap.min.css',
                'build/autoprefixer/**/*.css'
            ],
            dest: 'build/concat/style.css'
        },
        js1 : {
            src: [
                'app/lib/jquery-2.1.3.min.js',
                'app/lib/bootstrap.min.js',
                'app/lib/angular/angular.min.js',
                'build/ngAnnotate/**/*.js'
            ],
            dest: 'build/concat/script.js'
        },
    },


// Minify CSS

    cssmin: {
        add_banner: {
            options: {
                banner: '/* Author: Adrian Kelly */' //NOTE: This isn't working anymore!!!!!
            },
            files: {
                'build/css/style.min.css': ['build/concat/style.css'] //includes bootstrap
            }
        }
    },

// Minify JS

    uglify: {
        js: {
            files: {
                'build/js/script.min.js': ['build/concat/script.js']
            },
        }
    }






});


    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['ngAnnotate', 'autoprefixer', 'concat', 'cssmin', 'uglify']);


};
