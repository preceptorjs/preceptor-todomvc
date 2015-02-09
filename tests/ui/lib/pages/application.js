/* jshint node: true */

var PageObject = require('hodman').PageObject;

var HeaderPanel = require('./application/header');
var FooterPanel = require('./application/footer');

var assert = require('assert');

/**
 * @class Application
 * @extends PageObject
 */
var Application = PageObject.extend(

  /** @lends Application.prototype */
  {
    /**
     * Initializes the page-object
     */
    initialize: function () {
      this.__super();

      this.setSelectors({
        "footer": "#footer",
        "page": "#main"
      });
    },


    /**
     * Gets the header-panel
     *
     * @return {HeaderPanel}
     */
    getHeader: function () {
      // No need to give it a root element
      // since it finds it itself from the DOM root
      return new HeaderPanel();
    },


    /**
     * Does the application have a footer?
     *
     * @return {Boolean}
     */
    hasFooter: function () {
      return this.hasElement("footer");
    },

    /**
     * Gets the footer-panel
     *
     * @return {FooterPanel}
     */
    getFooter: function () {
      return new FooterPanel();
    },


    /**
     * Does the application have page content?
     *
     * @return {Boolean}
     */
    hasPageContent: function () {
      return this.hasElement("page");
    },

    /**
     * Gets the page-panel
     *
     * @return {TodoIndexPage}
     */
    getPage: function () {
      var TodoIndexPage = require('./todo/index');
      return new TodoIndexPage();
    },


    /**
     * List of blackout coordinates for the current page-object
     *
     * @method blackOut
     * @return {object[]}
     */
    blackOut: function () {
      if (this.hasPageContent()) {
        return this.getPage().blackOut();
      } else {
        return [];
      }
    }
  },

  /** @lends Application */
  {
    URL: "/",

    // We don't care here if it redirects somewhere else
    EXPECTED_URL: "/"
  }
);

module.exports = Application;
