module.exports = function(grunt) {
	// 1. Time how long tasks take
	require("time-grunt")(grunt);
	
	// 2. load all grunt tasks matching the `grunt-*` pattern
	require("load-grunt-tasks")(grunt);
	
	// 3. All configuration goes here
	grunt.initConfig({
		path: {
			src: "dev",					// Dev files
			dest: "dist",				// Dist files
			bower: "dev/js/components"	// Bower Files
		},
		concat: {
			options: {
				sourceMap: true
			},
			js: {
				src: [
					"<%= path.bower %>/angular/angular.js",
					"<%= path.bower %>/angular-animate/angular-animate.js",
					"<%= path.bower %>/angular-aria/angular-aria.js",
					"<%= path.bower %>/angular-messages/angular-messages.js",
//					"<%= path.bower %>/angular-sanitize/angular-sanitize.js",
//					"<%= path.bower %>/angular-material/angular-material.js",
					"<%= path.bower %>/angular-ui-router/release/angular-ui-router.js",
					"<%= path.src %>/js/web-resume.js",
				],
				dest: "<%= path.src %>/js/web-resume.complete.js",
			},
			css: {
				src: [
					"<%= path.src %>/js/components/bootstrap/dist/css/bootstrap.css",
					"<%= path.src %>/css/web-resume.css"
				],
				dest: "<%= path.src %>/css/web-resume.complete.css",
			}
		},
		
		uglify: {
			options: {
				sourceMap: true,
				sourceMapIncludeSources: true,
				sourceMapIn: "<%= path.src %>/js/web-resume.complete.js.map",
				compress: { drop_console: true }
			},
			dev: {
				files: {
					"<%= path.dest %>/js/web-resume.min.js": ["<%= path.src %>/js/web-resume.complete.js"]
				}
			}
		},
		
		cssnano: {
			dist: {
				files: {
					"<%= path.dest %>/css/web-resume.min.css": "<%= path.src %>/css/web-resume.complete.css"
				}
			}
		},
		
		imagemin: {
			dynamic: {										// Another target
				files: [{
					expand: true,							// Enable dynamic expansion
					cwd: "<%= path.src %>/img/",			// src matches are relative to this path
					src: ["**/*.{png,jpg,gif}"],			// Actual patterns to match
					dest: "<%= path.dest %>/img/"			// Destination path prefix
				}]
			}
		},
		
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace : true,
					minifyCSS: true,
					minifyJS: true,
					removeRedundantAttributes: true
				},
				files: [{
					expand: true,
					cwd: "<%= path.src %>",
					src: ["**/*.html"],				// copy all files and subfolders ending in .html
					dest: "<%= path.dest %>",		// destination folder
				}]
			}
		},
		

		connect: {
			server: {
				options: {
					port: 8000,
					base: "<%= path.dest %>"
				}
			}
		},
		
		watch: {
			js: {
				files: "<%= path.src %>/js/**/*.js",
				tasks: ["concat:js", "uglify"]
			},
			css: {
				files: "<%= path.src %>/css/**/*.css",
				tasks: ["concat:css", "cssnano"],
			},
			img: {
				files: "<%= path.src %>/img/**/*.{png,jpg,gif}",
				tasks: ["imagemin"],
			},
			html: {
				files: "<%= path.src %>/**/*.html",
				tasks: ["htmlmin:dist"],
			}
		}
	});

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask("default", ["concat:js", "uglify", "concat:css", "cssnano", "imagemin", "htmlmin", "connect", "watch"]);
};