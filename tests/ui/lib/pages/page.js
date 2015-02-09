/* jshint node: true */

var ApplicationPage = require('./application');

/**
 * @class BasePage
 * @extends ApplicationPage
 *
 * This is the BasePage-object that selects automatically the main-section
 * of all pages. In many web applications, the menus, the header and footer
 * stay where they are and only parts of all pages are replaced. This
 * ever-changing part of a page is represented by this objects and is
 * therefore the basis of many other page-objects. Here, you can add some
 * commonly used accessors that are used across multiple pages, avoiding
 * to re-implement the code again and again.
 */
var BasePage = ApplicationPage.extend(

  /** @lends BasePage.prototype */
  {},

  /** @lends BasePage */
  {
    // This is the selector for the main-section of the web application.
    // This will be inherited to the child-classes.
    SELECTOR: '#main'
  }
);

module.exports = BasePage;
