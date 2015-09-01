module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['src/**/*.html'],
        tasks: ['copy','browserify']
      }
    },
    browserify : {
      js : {
        src : 'src/app/app.js',
        dest : 'dist/js/app.js'
      }
    },
    'http-server': {
      'dev': {
        root: 'dist/',
        port: 8282,
        showDir: false,
        runInBackground: true,
        ext: 'html'
      }
    },
    clean: {
      build: {
        src: ['dist']
      }
    },
    copy: {
      main: {
        files: [{
          src: ['src/*.html'],
          dest: 'dist/',
          filter: 'isFile',
          flatten: true,
          expand: true
        },
        {
          src : ['src/app/**/*.html'],
          dest : 'dist/partials/',
          flatten : true,
          expand : true,
          filter:'isFile'
        },
        {
          src:['node_modules/angular-material/angular-material.css',
          'node_modules/angular-aria/angular-aria.css',
          'node_modules/angular-hotkeys/build/hotkeys.css'],
          flatten:true,
          expand:true,
          dest : 'dist/styles/',
          filter : 'isFile'
        },
        {
          src : ['node_modules/bootstrap/dist/fonts/*'],
          dest : 'dist/fonts/',
          filter : 'isFile',
          flatten:true,
          expand:true
        }]
      }
    }
  });

  // detault task 
  grunt.registerTask('default', ['clean', 'copy','browserify']);

  // development server
  grunt.registerTask('dev', ['http-server', 'watch']);
};