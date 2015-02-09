/* jshint node: true */

var ViewObject = require('hodman').ViewObject;
var assert = require('assert');

var TodoEntryView = require('./entry');

/**
 * Todo-List view
 *
 * @class TodoListView
 * @extends ViewObject
 */
var TodoListView = ViewObject.extend(

  /** @lends TodoListView.prototype */
  {
    /**
     * Initializes the page-object
     */
    initialize: function () {
      this.__super();

      this.setSelectors({
        "items": "li.row"
      });

      this.addLoadSelector("items");
    },


    /**
     * Gets a list of todo-items
     *
     * @return {HTMLElement[]}
     * @private
     */
    _getAllTodoItems: function () {
      var context = this.getContext(),
          selector = this.getSelector("items");

      return this.getAdapter().getElements(context, selector, 'css selector');
    },


    /**
     * Gets the number of todos in the list
     *
     * @return {Number}
     */
    count: function () {
      return this._getAllTodoItems().length;
    },

    /**
     * Gets an todo-entry by index
     *
     * @param {Number} index
     * @return {TodoEntryView}
     */
    getEntryViewByIndex: function (index) {
      var entries;

      assert.ok(index >= 0, "Negative indexes are not supported.");
      entries = this._getAllTodoItems();
      assert.ok(index < entries.length, "Index for todo-entries is out-of bounds. Length:" + entries.length);

      return new TodoEntryView(entries[index]);
    },


    /**
     * List of blackout items
     *
     * @method blackOut
     * @return {object[]}
     */
    blackOut: function () {
      var elements = [], items = this._getAllTodoItems();

      items.forEach(function (domItem) {
        var todoItem = new TodoEntryView(domItem);
        elements = elements.concat(todoItem.blackOut());
      });

      return elements;
    }
  }
);

module.exports = TodoListView;
