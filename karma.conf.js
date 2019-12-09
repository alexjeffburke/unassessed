module.exports = function(config) {
  config.set({
    frameworks: ["mocha"],

    files: [
      "./node_modules/unexpected/unexpected.js",
      "./unexempted.js",
      "./test/common/browser.js",
      "./build/test/unexempted.spec.js"
    ],

    client: {
      mocha: {
        reporter: "html",
        timeout: 60000
      }
    },

    browserStack: {
      video: false,
      project:
        process.env.TRAVIS_BRANCH === "master" &&
        !process.env.TRAVIS_PULL_REQUEST_BRANCH // Catch Travis "PR" builds
          ? "unexempted"
          : "unexempted-dev"
    },

    browsers: ["ChromeHeadless", "ie11"],

    customLaunchers: {
      ie11: {
        base: "BrowserStack",
        browser: "IE",
        browser_version: "11",
        os: "Windows",
        os_version: "7"
      }
    },

    reporters: ["dots", "BrowserStack"]
  });
};
