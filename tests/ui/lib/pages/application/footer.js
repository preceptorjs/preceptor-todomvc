/* jshint node: true */

var PanelObject = require('hodman').PanelObject;
var assert = require('assert');

var FilterView = require('./views/filter');

/**
 * Application Footer
 *
 * @class FooterPanel
 * @extends PanelObject
 */
var FooterPanel = PanelObject.extend(

  /** @lends FooterPanel.prototype */
  {
    /**
     * Initializes the page-object
     */
    initialize: function () {
      this.__super();

      // CSS-selectors are relative to the footer-panel DOM-element
      this.setSelectors({
        "itemsCounter": "#todo-count strong",
        "filters": "#filters",
        "clear": "#clear-completed"
      });

      // Make sure that these items exist on a page
      this.addLoadSelectors(["itemsCounter", "filters"]);
    },


    /**
     * Gets the number of items left
     *
     * @returns {Number}
     */
    getItemsLeft: function () {
      return parseInt(this.getElement("itemsCounter").getText(), 10);
    },


    /**
     * Does the footer have a "clear completed" button?
     *
     * @return {Boolean}
     */
    canClearCompleted: function () {
      return this.hasElement("clear");
    },

    /**
     * Clears a completed todos, removing them from the view
     *
     * @return {FooterPanel}
     */
    clearCompleted: function () {
      assert.ok(this.canClearCompleted(), "Cannot clear completed since the button isn't there.");
      this.getElement("clear").mouse().click();
    },


    /**
     * Gets the filter-view
     *
     * @return {FilterView}
     */
    filters: function () {
      return new FilterView(this.getElement("filters"));
    }
  },

  /** @lends FooterPanel */
  {
    // CSS-selector for this footer-panel
    SELECTOR: "#footer"
  }
);

module.exports = FooterPanel;
