/* jshint node: true */

var ViewObject = require('hodman').ViewObject;
var assert = require('assert');

/**
 * Todo-Entry view
 *
 * @class TodoEntryView
 * @extends ViewObject
 */
var TodoEntryView = ViewObject.extend(

  /** @lends TodoEntryView.prototype */
  {
    /**
     * Initializes the page-object
     */
    initialize: function () {
      this.__super();

      this.setSelectors({
        "checkmark": "input.toggle",
        "createdLabel": "span.row .created-label",
        "completedLabel": "span.row .completed-label",
        "label": "label",
        "delete": "button.destroy",
        "editInput": "input.edit"
      });
    },


    /**
     * Is item in edit-mode?
     *
     * @return {Boolean}
     */
    isInEditMode: function () {
      return this.getContext().hasClass("editing");
    },

    /**
     * Is item completed?
     *
     * @return {Boolean}
     */
    isCompleted: function () {
      return this.getContext().hasClass("completed");
    },


    /**
     * Gets the created-label
     *
     * @return {String}
     */
    getCreatedLabel: function () {
      assert.ok(!this.isInEditMode(), "Item is in edit-mode.");
      return this.getElement("createdLabel").getText();
    },

    /**
     * Does item have a completed label?
     *
     * @return {Boolean}
     */
    hasCompletedLabel: function () {
      return this.hasElement("completedLabel");
    },

    /**
     * Gets the completed-label
     *
     * @return {String}
     */
    getCompletedLabel: function () {
      assert.ok(!this.isInEditMode(), "Item is in edit-mode.");
      assert.ok(this.hasCompletedLabel(), "Item doesn't have a completed label.");
      return this.getElement("completedLabel").getText();
    },


    /**
     * Gets the todo-text
     *
     * @return {String}
     */
    getTodoText: function () {
      assert.ok(!this.isInEditMode(), "Item is in edit-mode.");
      return this.getElement("label").getText();
    },


    /**
     * Switch into the edit-mode
     *
     * @return {TodoEntryView}
     */
    switchToEditMode: function () {
      assert.ok(!this.isInEditMode(), "Item is already in edit-mode.");
      this.getElement("label").mouse().doubleClick();
      return this;
    },

    /**
     * Leave the edit-mode
     *
     * @return {TodoEntryView}
     */
    leaveEditMode: function () {
      assert.ok(this.isInEditMode(), "Item is not in edit-mode.");
      this.getElement("editInput").sendKeys("\n");
      return this;
    },

    /**
     * Edit text
     *
     * @param {String} text
     * @return {TodoEntryView}
     */
    edit: function (text) {
      if (!this.isInEditMode()) {
        this.switchToEditMode();
      }
      return this.enter(text).leaveEditMode();
    },

    /**
     * Enter text into the edit-input
     *
     * @param {String} text
     * @returns {TodoEntryView}
     */
    enter: function (text) {
      var element;
      assert.ok(this.isInEditMode(), "Item is not in edit-mode.");

      element = this.getElement("editInput");
      element.clear();
      element.sendKeys(text);

      return this;
    },


    /**
     * Complete item
     *
     * @return {TodoEntryView}
     */
    complete: function () {
      assert.ok(!this.isInEditMode(), "Item is in edit-mode.");
      assert.ok(!this.isCompleted(), "Item is already completed.");
      this.getElement("checkmark").mouse().click();
      assert.ok(this.isCompleted(), "Item did not complete.");
      return this;
    },

    /**
     * Incomplete item
     *
     * @return {TodoEntryView}
     */
    incomplete: function () {
      assert.ok(!this.isInEditMode(), "Item is in edit-mode.");
      assert.ok(this.isCompleted(), "Item is not completed.");
      this.getElement("checkmark").mouse().click();
      assert.ok(!this.isCompleted(), "Item is still complete.");
      return this;
    },


    /**
     * Delete item
     */
    delete: function () {
      assert.ok(!this.isInEditMode(), "Item is in edit-mode.");
      this.getContext().mouse().moveToCenter();
      this.getElement("delete").mouse().click();
    },


    /**
     * List of blackout items
     *
     * @method blackOut
     * @return {object[]}
     */
    blackOut: function () {
      var elements = [this.getElement("createdLabel")];

      if (this.hasCompletedLabel()) {
        elements.push(this.getElement("completedLabel"));
      }

      return elements;
    }
  }
);

module.exports = TodoEntryView;
