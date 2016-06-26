module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		compass: {
			dist: {
				options: {
				sassDir: 'app/style/sass',
				cssDir: 'build/style',
				environment: 'production'
				}
			},
			dev: {
				options: {
					sassDir: 'app/style/sass',
					cssDir: 'app/style'
				}
			}
		},
		sass: {
			dist: {
				options: {
					compass: true,
				},
				files: {
					'app/style/style.css' : 'app/style/sass/app.sass',
				}
			}
		},
		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						myData: grunt.file.readJSON('app/data/data.json')
					},
				},
				files: {
					'app/index.html': 'app/views/index.jade'
				}
			}
		},
		watch: {
			grunt: { files: ['Gruntfile.js'] },
			options: {
				livereload: true,
			},

			grunt: { files: ['Gruntfile.js'] },

			jade: {
				files: 'app/views/**/*.jade',
				tasks: ['jade']
			},
			sass: {
				files: ['app/**/*.sass'],
				tasks: ['sass']
			},
		},
		express:{
			all:{
				options:{
					port:3000,
					hostname:'localhost',
					bases:['./app'],
					livereload: true
				}
			}
		}
	});
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	// Default task.
	grunt.registerTask(
		'build',
		'Convert Jade templates into html templates',
		['jade']
	);
	grunt.registerTask(
		'default',
		'Convert Jade templates into html templates',
		['sass', 'jade', 'express', 'watch']
	);
	grunt.registerTask(
		'serv',
		['express','watch']
	);
};
