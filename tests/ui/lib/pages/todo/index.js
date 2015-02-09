/* jshint node: true */

var BasePage = require('../page');

var TodoListView = require('./views/list');

/**
 * @class TodoIndexPage
 * @extends BasePage
 */
var TodoIndexPage = BasePage.extend(

  /** @lends TodoIndexPage.prototype */
  {
    /**
     * Initializes the page-object
     */
    initialize: function () {
      this.__super();

      this.setSelectors({
        "list": "#todo-list"
      });

      this.addLoadSelector("list");
    },

    /**
     * Gets the list-view
     *
     * @return {TodoListView}
     */
    getListView: function () {
      return new TodoListView(this.getElement("list"));
    },

    /**
     * List of blackout coordinates for the current page-object
     *
     * @method blackOut
     * @return {object[]}
     */
    blackOut: function () {
      return this.getListView().blackOut();
    }
  },

  /** @lends TodoIndexPage */
  {
    URL: "/",
    EXPECTED_URL: "/"
  }
);

module.exports = TodoIndexPage;
