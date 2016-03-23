/*
 * grunt-react-native
 * https://github.com/alexmick/grunt-react-native
 *
 * Copyright (c) 2016 Alexander Micklewright
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    react_native: {
      ios: {
        options: {
          minify: false,
          verbose: false,
          watch: false,
        },
        src: 'test/fixtures/index.ios.js',
        dst: 'tmp/dev/index.ios.bundle',
      },
      ios_release: {
        options: {
          minify: true,
          platform: 'ios',
          verbose: false,
          watch: false,
        },
        src: 'test/fixtures/index.ios.js',
        dst: 'tmp/release/index.ios.bundle',
      },
      android: {
        options: {
          minify: false,
          verbose: false,
          watch: false,
        },
        src: 'test/fixtures/index.android.js',
        dst: 'tmp/dev/index.android.bundle',
      },
      android_release: {
        options: {
          minify: true,
          platform: 'android',
          verbose: false,
          watch: false,
        },
        src: 'test/fixtures/index.android.js',
        dst: 'tmp/release/index.android.bundle',
      },
      watch: {
        options: {
          verbose: false,
          watch: true,
        },
        src: 'test/fixtures/',
      },
    },


    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'react_native:ios', 'react_native:ios_release', 'react_native:android', 'react_native:android_release', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
