/* jshint node: true */
/* globals describe, it, before, beforeEach, after, afterEach */

describe('Application', function () {

  it('appearance', function (done) {
    this.application.capture(this.test.fullTitle()).then(function () { done(); });
  });
});
