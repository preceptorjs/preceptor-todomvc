/* jshint node: true */

var TodoIndexPage = require('./active');

/**
 * @class TodoCompletedPage
 * @extends TodoIndexPage
 */
var TodoCompletedPage = TodoIndexPage.extend(

  /** @lends TodoCompletedPage.prototype */
  {},

  /** @lends TodoCompletedPage */
  {
    URL: "/completed",
    EXPECTED_URL: "/completed"
  }
);

module.exports = TodoCompletedPage;
