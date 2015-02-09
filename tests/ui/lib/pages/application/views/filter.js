/* jshint node: true */

var ViewObject = require('hodman').ViewObject;

/**
 * Filter-view
 *
 * @class FilterView
 * @extends ViewObject
 */
var FilterView = ViewObject.extend(

  /** @lends FilterView.prototype */
  {
    /**
     * Initializes the page-object
     */
    initialize: function () {
      this.__super();

      this.setSelectors({
        "all": "li.todo-all a",
        "active": "li.todo-active a",
        "completed": "li.todo-completed a"
      });

      this.addLoadSelectors(["all", "active", "completed"]);
    },


    /**
     * Is the all-filter selected?
     *
     * @return {Boolean}
     */
    isAllSelected: function () {
      return this.getElement("all").hasClass("selected");
    },

    /**
     * Select all-filter
     *
     * @return {FilterView}
     */
    selectedAll: function () {
      this.getElement("all").mouse().click();
      return this;
    },


    /**
     * Is the active-filter selected?
     *
     * @return {Boolean}
     */
    isActiveSelected: function () {
      return this.getElement("active").hasClass("selected");
    },

    /**
     * Select active-filter
     *
     * @return {FilterView}
     */
    selectedActive: function () {
      this.getElement("active").mouse().click();
      return this;
    },


    /**
     * Is the completed-filter selected?
     *
     * @return {Boolean}
     */
    isCompletedSelected: function () {
      return this.getElement("completed").hasClass("selected");
    },

    /**
     * Select completed-filter
     *
     * @return {FilterView}
     */
    selectedCompleted: function () {
      this.getElement("completed").mouse().click();
      return this;
    }
  }
);

module.exports = FilterView;
