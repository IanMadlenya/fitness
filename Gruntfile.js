// Gruntfile.js//
module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: ['public/js/**/*.js']
        },
        sass: {
            dist: {
                files: {
                    'public/dist/style.css' : 'public/stylesheets/scss/style.scss'
                }
            }
        },
        watch: {
            js: {
                files: ['public/js/**/*.js', 'public/js/**/*.html'],
                tasks: ['jshint', 'build:dev']
            },

            css: {
                files: ['public/stylesheets/scss/**/*.scss'],
                tasks: ['sass']
            }
        },
        // watch our node server for changes
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        // run watch and nodemon at the same time
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    'public/dist/modules.js': ['public/js/**/index.js', 'public/js/**/**/*.js'],
                    'public/dist/application.js': ['public/js/application.js']
                }
            }
        },
        concat: {
            js: {
                src: [
                    'public/lib/jquery/dist/jquery.min.js',
                    'public/lib/bootstrap/dist/js/bootstrap.min.js',
                    'public/lib/angular/angular.js',
                    'public/lib/angular-route/angular-route.js',
                    'public/lib/angular-resource/angular-resource.js',
                    'public/lib/angular-ui/build/angular-ui.min.js',
                    'public/lib/angular-local-storage/dist/angular-local-storage.min.js',
                    'public/dist/application.js', 
                    'public/dist/*.js'],
                dest: 'public/dist/bundle.js'
            }
        },
        uglify: {
            js: {
                src: ['public/dist/bundle.js'],
                dest: 'public/dist/bundle.js'
            }
        },
        clean: ['public/dist'],
        mochaTest: {
            test: {
                src: ['app/tests/*.js']
            }
        }
    });


    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-clean'); 
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', ['jshint', 'concurrent']);
    grunt.registerTask('test:server', 'mochaTest');
    grunt.registerTask('build:dev', ['clean', 'ngAnnotate', 'concat', 'sass']);
    grunt.registerTask('build', ['clean', 'ngAnnotate', 'concat', 'uglify', 'sass']);
    grunt.registerTask('heroku:production', ['build']);
};
