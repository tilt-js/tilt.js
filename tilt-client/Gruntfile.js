module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // a string to put between each file
        separator: ';'
      },
      build: {
        src: ['src/**/*.js'],
        dest: 'dist/tilt.js'
      },
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! Tilt.js <%= pkg.version %> - built <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/tilt.min.js': ['<%= concat.build.dest %>'],
        }
      }
    },
    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js'],
      options: {
        globals: {
          console: true,
        }
      }
    },
    jasmine : {
      src : 'src/**/*.js',
      options: {
        specs : 'spec/**/*spec.js',
        helpers : 'spec/helpers/*.js'
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['jshint', 'jasmine', 'concat', 'uglify']);
};