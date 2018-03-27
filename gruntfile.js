module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      
      
      concat: {
            options: {
              separator: ';',
            },
            dist: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    'js/global.js'  // This specific file
                ],
                dest: 'js/build/production.js',
            }
      },
      
    uglify: {
        build: {
            src: 'js/build/production.js',
            dest: 'release/js/production.min.js'
        }
      },
      
    postcss: {
        options: {
          map: true, // inline sourcemaps

          // or
          map: {
              inline: false, // save all sourcemaps as separate files...
              annotation: 'dist/css/maps/' // ...to the specified directory
          },

          processors: [
            require('pixrem')(), // add fallbacks for rem units
            require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
            require('cssnano')() // minify the result
          ]
        },
        dist: {
          src: 'css/*.css',
          dest: 'release/css/main.min.css'
        }
      },
      
//      cssmin: {
//            report: 'gzip',
//          target: {
//            files: [{
//              expand: true,
//              cwd: 'css',
//              src: ['*.css', '!*.min.css'],
//              dest: 'release/css/',
//              ext: '.min.css'
//            }]
//          }
//        },
      
      responsive_images: {
          dev: {
            options: {
              engine: 'gm',
                newFilesOnly: true,
              sizes: [{
                  name: '200',
                  width: 200,
                  quality: 40
                },{
                  name: '400',
                  width: 400,
                  quality: 40
                },{
                  name: "600",
                  width: 600,
                  quality: 40
                },{
                  name: "800",
                  width: 800,
                  quality: 40
                },{
                  name: "1000",
                  width: 1000,
                  quality: 40
                },{
                  name: "1500",
                  width: 1500,
                  quality: 40
                    },{
                  name: "2000",
                  width: 2000,
                  quality: 40
                },{
                  name: "4000",
                  width: 4000,
                  quality: 40
            }]
            },

            /*
            You don't need to change this part if you don't change
            the directory structure.
            */
            files: [{
              expand: true,
              src: ['*.{gif,jpg,png}'],
              cwd: 'images_src/',
              dest: 'release/images/'
            }]
          }
        },
      
      
  });

  // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
//    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-responsive-images');

  // Default task(s).
  grunt.registerTask('default', [ 'concat' , 'uglify' , 'postcss' , 'responsive_images' ]);

};