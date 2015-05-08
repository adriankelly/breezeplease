module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Autoprefixer
        autoprefixer: {
        	options: {
    			browsers: ['last 2 versions']
			},
    		multiple_files: [{
    			expand: true,
    			flatten: true,
    			src: 'css/*.css',
    			dest: 'staging/css_ap/'
			}],
        },

        //Image compression
		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: 'images/', //src matches relative to this path
		            src: ['**/*.{png,jpg,gif}'],
		            dest: 'build/images/'
		        }]
		    }
		},

        //Concatenate JS
		concat: {
			multiple_files: {
				files: {
	    			'staging/concatenated.js': ['js/*.js'],
	    			// 'dist/with_extras.js': ['src/main.js', 'src/extras.js'],
		  		},
			},
		},

		//Concatenate CSS
		concat_css: { //src files are coming from autoprefix dest
			options: {},
			files: {
		  		'staging/concatenated.css': ['staging/css_ap/*.css'], //add js libraries
			},
		},

        //Minify JS
		uglify: { //src files coming from staging folder
		    build: {
		        src: 'staging/concatenated.js',
		        dest: 'build/js/script.min.js'
		    }
		},

        //Minify CSS
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'staging/',
		      src: ['*.css', '!*.min.css'],
		      dest: 'build/css/style.min.css'
		    }]
		  }
		},

		//sass
		sass: {
		    dev: {
		    	src: ['*.scss'],
		    	dest: '/css/style.css',
		    },
		},

		//Watch for changes
		watch: {
			sass: {
		    	files: '**/*.scss',
		    	tasks: ['sass'],
	    	livereload: {
		    	options: { livereload: true },
		    	},
		  	},
		},
// want to spin up a server and do live reload


	});

 	// 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['autoprefixer', 'imagemin', 'concat', 'concat_css', 'uglify', 'cssmin']);

};