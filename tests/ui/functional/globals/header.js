/* jshint node: true */
/* globals describe, it, before, beforeEach, after, afterEach */

var assert = require('assert');

describe('Header', function () {

  beforeEach(function () {
    this.header = this.application.getHeader();
  });

  it('appearance', function (done) {
    this.header.capture(this.test.fullTitle()).then(function () { done(); });
  });

  it('should have the correct title', function () {
    assert.equal('todos', this.header.getTitle());
  });
});
