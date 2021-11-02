// Karma configuration file, see link for more information
// https://karma-runner.github.io/6.3/config/configuration-file.html

module.exports = function (config) {
  config.set({
    autoWatch: false,
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    logLevel: config.LOG_INFO,
    port: 9876,
    reporters: ['progress', 'kjhtml'],
    restartOnFileChange: true, // when auto-watch is on, cancel and restart unit tests whenever a change is detected
    singleRun: false,
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-edge-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    coverageReporter: {
      dir: require('path').join(__dirname, '../coverage/ngx-trebol-frontend'),
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ],
      // check: {
      //   global: {
      //     statements: 70,
      //     branches: 70,
      //     functions: 70,
      //     lines: 70
      //   }
      // }
    }
  });
};
