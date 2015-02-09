/* jshint node: true */

var TodoIndexPage = require('./active');

/**
 * @class TodoActivePage
 * @extends TodoIndexPage
 */
var TodoActivePage = TodoIndexPage.extend(

  /** @lends TodoActivePage.prototype */
  {},

  /** @lends TodoActivePage */
  {
    URL: "/active",
    EXPECTED_URL: "/active"
  }
);

module.exports = TodoActivePage;
