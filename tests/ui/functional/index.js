/* jshint node: true */
/* globals describe, it, before, beforeEach, after, afterEach */

require('./support/system');

describe('UI', function () {

  require('./globals/');
  require('./todo/');

  afterEach(function () {
    if (this.currentTest.state !== 'passed') {
      this.application.capture('debug_' + this.currentTest.fullTitle());
    }
  });
});
