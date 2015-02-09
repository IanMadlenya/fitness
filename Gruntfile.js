// Gruntfile.js
module.exports = function(grunt) {
    grunt.initConfig({
        // JS TASKS ================================================================
        // check all js files for errors
        jshint: {
            all: ['public/js/**/*.js']
        },

        //Compile Sass

        sass: {
            dist: {
                files: {
                    'public/stylesheets/css/style.css' : 'public/stylesheets/scss/style.scss'
                }
            }
        },

        // COOL TASKS ==============================================================
        // watch css and js files and process the above tasks
        watch: {
            js: {
                files: ['public/js/**/*.js'],
                tasks: ['jshint']
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('default', ['jshint', 'concurrent']);
};