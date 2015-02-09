/* jshint node: true */

var path = require('path');

// Web-driver setup
var webDriverDecorator = {

  "type": "webDriver",

  "configuration": {

    // Running in shared-mode (share browser session);
    // turn it on to creating a new browser instance for each test (very slow)
    "isolation": false,

    // Web-driver client configuration
    "client": {
      "type": "cabbie", // Using Cabbie as web-driver client

      // Client-specific configuration
      "configuration": {
        "mode": "sync", // Synchronous mode
        "debug": false, // Turn this on to see what Cabbie does internally
        "httpDebug": false // Turn this on to see web-driver http calls and responses (needs also "debug" to be true)
      },

      // Requested browser capabilities
      "capabilities": {
      }
    },

    // Web-driver server configuration
    "server": {
      "type": "ghostDriver"
    },

    // Coverage configuration for client-side coverage collection
    "coverage": {
      "active": true, // Activate coverage collection on the client-side

      // Map paths to server (this machine) file-system
      "mapping": [
        {
          "from": "^tmp/instrumented/", // Map from here ...
          "to": "tmp/transpiled/" // ... to here
        }
      ]
    }
  }
};

module.exports = {

  // Global configuration
  "configuration": {

    // Configuration for report-manager
    "reportManager": {

      // Configuration for reporting
      "reporter": [
        { "type": "Spec" }, // Printing spec information for each test
        { "type": "List", "progress": false }, // Print a list of problems at the end
        { "type": "Duration" }, // Print the total time the tests took
        { "type": "Junit", "path": path.join(__dirname, "test-results.xml") } // Create a JUnit report file
      ]
    },

    // Load the web-driver plugin
    "plugins": ["preceptor-webdriver"],

    // Activate global code-coverage collection
    "coverage": {
      "active": true
    },

    // Settings available to test-client
    "settings": {
      "implicitTimeOut": 1000,
      "windowWidth": 800,
      "windowHeight": 600,
      "webBaseUrl": "http://localhost:4200"
    }
  },

  "tasks": [
    {
      "type": "shell",
      "name": "Cleanup",

      "active": true,
      "failOnError": true,

      "configuration": {
        "cwd": __dirname + "/regression",
        "cmd": 'rm -rf highlight build && mkdir highlight build'
      }
    },

    {
      "type": "mocha",
      "name": "UI Functional tests",

      "active": true,
      "suite": true,
      "coverage": true,
      "debug": false,

      "failOnError": false,
      "echoStdErr": false,

      "decorator": [webDriverDecorator],

      "configuration": {
        "paths": [__dirname + "/functional/index.js"],
        "timeOut": 300000,
        "slow": 60000
      }
    },

    {
      "type": "kobold",
      "name": "Visual regression tests",

      "active": true,
      "suite": true,

      "failOnError": true,

      "configuration": {
        "highlightOnSuccess": true,

        "storage": {
          "options": {
            "path": __dirname + "/regression"
          }
        }
      }
    }
  ]
};
