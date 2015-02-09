/* jshint node: true */

var PanelObject = require('hodman').PanelObject;
var assert = require('assert');

/**
 * Application Header
 *
 * @class HeaderPanel
 * @extends PanelObject
 */
var HeaderPanel = PanelObject.extend(

  /** @lends HeaderPanel.prototype */
  {
    /**
     * Initializes the page-object
     */
    initialize: function () {
      this.__super();

      // CSS-selectors are relative to the header-panel DOM-element
      this.setSelectors({
        "title": "#header h1",
        "input": "#new-todo"
      });

      // Make sure that these items exist on a page
      this.addLoadSelectors(["title", "input"]);
    },


    /**
     * Gets the title
     *
     * @return {String}
     */
    getTitle: function () {
      return this.getElement("title").getText();
    },


    /**
     * Is the complete-all "checkbox" checked?
     *
     * @return {Boolean}
     */
    areAllCompleted: function () {
      return this.getElement("input").isSelected();
    },

    /**
     * Completes all todos
     *
     * @return {HeaderPanel}
     */
    completeAll: function () {
      assert.ok(this.areAllCompleted(), "The header has all todos already completed.");
      this.getElement("input").mouse().click();
      assert.ok(this.areAllCompleted(), "Todos could not be completed.");
      return this;
    },

    /**
     * Completes all todos
     *
     * @return {HeaderPanel}
     */
    incompleteAll: function () {
      assert.ok(!this.areAllCompleted(), "The header has all todos already completed.");
      this.getElement("input").mouse().click();
      assert.ok(!this.areAllCompleted(), "Todos are still completed.");
      return this;
    },


    /**
     * Add a new "todo" entry
     *
     * @param {string} todo
     * @return {HeaderPanel}
     */
    newEntry: function (todo) {
      this.getElement("input").sendKeys(todo + "\n");
      return this;
    }
  },

  /** @lends HeaderPanel */
  {
    // CSS-selector for this header-panel
    SELECTOR: "#todoapp"
  }
);

module.exports = HeaderPanel;
