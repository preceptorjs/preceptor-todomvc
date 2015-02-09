/* jshint node: true */
/* globals describe, it, before, beforeEach, after, afterEach */

require('../support/system');

var assert = require('assert');

var todos = [
  'first todo',
  'second todo',
  'third todo',
  'forth todo',
  'fifth todo',
  'sixth todo'
];

var modifiedTodo = 'modified first todo';

describe('Todo', function () {

  describe('Index', function () {

    beforeEach(function () {
      if (this.application.hasPageContent()) {
        this.page = this.application.getPage();
      }
    });

    describe('Empty', function () {

      it('should not have a footer', function () {
        assert.ok(!this.application.hasFooter());
      });
    });

    describe('Create entry', function () {

      it('should be able to create a single todo', function () {
        this.application.getHeader().newEntry(todos[0]);

        this.page = this.application.getPage();
        var count = this.page.getListView().count();
        assert.equal(count, 1, "Doesn't have the correct amount of items in the list.");
      });

      it('single entry appearance', function (done) {
        this.application.capture(this.test.fullTitle()).then(function () { done(); });
      });

      it('should have a footer', function () {
        assert.ok(this.application.hasFooter());
      });

      it('should have the "all"-filter selected by default', function () {
        assert.ok(this.application.getFooter().filters().isAllSelected());
      });

      it('should not be able to clear completed items', function () {
        assert.ok(!this.application.getFooter().canClearCompleted());
      });

      it('should have one item left', function () {
        var itemsLeft = this.application.getFooter().getItemsLeft();
        assert.equal(itemsLeft, 1, "Doesn't have the correct number of items left.");
      });

      it('should not be in edit-mode', function () {
        assert.ok(!this.page.getListView().getEntryViewByIndex(0).isInEditMode());
      });

      it('should have the correct label', function () {
        assert.equal(this.page.getListView().getEntryViewByIndex(0).getTodoText(), todos[0]);
      });

      it('should have a created label', function () {
        assert.ok(this.page.getListView().getEntryViewByIndex(0).getCreatedLabel().length > 0);
      });

      it('should not be completed', function () {
        assert.ok(!this.page.getListView().getEntryViewByIndex(0).isCompleted());
      });

      it('should not have a completed label', function () {
        assert.ok(!this.page.getListView().getEntryViewByIndex(0).hasCompletedLabel());
      });
    });

    describe('Modify entry', function () {

      it('should be able to modify a todo', function () {
        this.page.getListView().getEntryViewByIndex(0).edit(modifiedTodo);
      });

      it('modified entry appearance', function (done) {
        this.page.capture(this.test.fullTitle()).then(function () { done(); });
      });

      it('should have left edit-mode', function () {
        assert.ok(!this.page.getListView().getEntryViewByIndex(0).isInEditMode());
      });

      it('should have the correct label', function () {
        assert.equal(this.page.getListView().getEntryViewByIndex(0).getTodoText(), modifiedTodo);
      });

      it('should have a created label', function () {
        assert.ok(this.page.getListView().getEntryViewByIndex(0).getCreatedLabel().length > 0);
      });
    });

    describe('Complete entry', function () {

      it('should complete the entry', function () {
        this.page.getListView().getEntryViewByIndex(0).complete();

        assert.ok(this.page.getListView().getEntryViewByIndex(0).isCompleted());
      });

      it('completed entry appearance', function (done) {
        this.application.capture(this.test.fullTitle()).then(function () { done(); });
      });

      it('should be able to clear completed items', function () {
        assert.ok(this.application.getFooter().canClearCompleted());
      });

      it('should have no item left', function () {
        var itemsLeft = this.application.getFooter().getItemsLeft();
        assert.equal(itemsLeft, 0, "Doesn't have the correct number of items left.");
      });

      it('should have a completed label', function () {
        assert.ok(this.page.getListView().getEntryViewByIndex(0).getCompletedLabel().length > 0);
      });
    });

    describe('Incomplete entry', function () {

      it('should incomplete the entry', function () {
        this.page.getListView().getEntryViewByIndex(0).incomplete();

        assert.ok(!this.page.getListView().getEntryViewByIndex(0).isCompleted());
      });

      it('should not be able to clear completed items', function () {
        assert.ok(!this.application.getFooter().canClearCompleted());
      });

      it('should have one item left', function () {
        var itemsLeft = this.application.getFooter().getItemsLeft();
        assert.equal(itemsLeft, 1, "Doesn't have the correct number of items left.");
      });

      it('should not have a completed label', function () {
        assert.ok(!this.page.getListView().getEntryViewByIndex(0).hasCompletedLabel());
      });
    });

    describe('Delete', function () {

      describe('Active entry', function () {

        it('should delete an active entry', function () {
          this.page.getListView().getEntryViewByIndex(0).delete();
        });

        it('should not have a footer', function () {
          assert.ok(!this.application.hasFooter());
        });

        it('deleted entry appearance', function (done) {
          this.application.capture(this.test.fullTitle()).then(function () { done(); });
        });
      });

      describe('Completed entry', function () {

        before(function () {
          this.application.getHeader().newEntry(todos[0]);

          this.page = this.application.getPage();
          this.page.getListView().getEntryViewByIndex(0).complete();
        });

        it('should delete a completed entry', function () {
          this.page.getListView().getEntryViewByIndex(0).delete();
        });

        it('should not have a footer', function () {
          assert.ok(!this.application.hasFooter());
        });
      });
    });

    describe('Create multiple entries', function () {

      it('should be able to create a single todo', function () {
        this.application.getHeader().newEntry(todos[0]);
        this.application.getHeader().newEntry(todos[1]);
        this.application.getHeader().newEntry(todos[2]);
        this.application.getHeader().newEntry(todos[3]);
        this.application.getHeader().newEntry(todos[4]);
        this.application.getHeader().newEntry(todos[5]);

        this.page = this.application.getPage();
        var count = this.page.getListView().count();
        assert.equal(count, 6, "Doesn't have the correct amount of items in the list.");
      });

      it('should have a footer', function () {
        assert.ok(this.application.hasFooter());
      });

      it('should have the "all"-filter selected by default', function () {
        assert.ok(this.application.getFooter().filters().isAllSelected());
      });

      it('should not be able to clear completed items', function () {
        assert.ok(!this.application.getFooter().canClearCompleted());
      });

      it('should have one item left', function () {
        var itemsLeft = this.application.getFooter().getItemsLeft();
        assert.equal(itemsLeft, 6, "Doesn't have the correct number of items left.");
      });

      it('should not be in edit-mode', function () {
        assert.ok(!this.page.getListView().getEntryViewByIndex(2).isInEditMode());
      });

      it('should have the correct label', function () {
        assert.equal(this.page.getListView().getEntryViewByIndex(2).getTodoText(), todos[2]);
      });

      it('should have a created label', function () {
        assert.ok(this.page.getListView().getEntryViewByIndex(2).getCreatedLabel().length > 0);
      });

      it('should not be completed', function () {
        assert.ok(!this.page.getListView().getEntryViewByIndex(2).isCompleted());
      });

      it('should not have a completed label', function () {
        assert.ok(!this.page.getListView().getEntryViewByIndex(2).hasCompletedLabel());
      });
    });

    describe('Complete and clear entry', function () {

      it('should complete an entry', function () {
        this.page.getListView().getEntryViewByIndex(3).complete();
        assert.ok(this.page.getListView().getEntryViewByIndex(3).isCompleted());
      });

      it('should be able to clear completed items', function () {
        assert.ok(this.application.getFooter().canClearCompleted());
      });

      it('should clear completed items', function () {
        this.application.getFooter().clearCompleted();
        assert.ok(!this.application.getFooter().canClearCompleted());
      });
    });

    describe('Complete multiple entries', function () {

      it('should complete entries', function () {
        this.page.getListView().getEntryViewByIndex(1).complete();
        this.page.getListView().getEntryViewByIndex(3).complete();
        this.page.getListView().getEntryViewByIndex(4).complete();
      });

      it('complete entries appearance', function (done) {
        this.application.capture(this.test.fullTitle()).then(function () { done(); });
      });

      it('should be able to clear completed items', function () {
        assert.ok(this.application.getFooter().canClearCompleted());
      });

      it('should have two items left', function () {
        var itemsLeft = this.application.getFooter().getItemsLeft();
        assert.equal(itemsLeft, 2, "Doesn't have the correct number of items left.");
      });

      describe('Active-filter', function () {

        it('should switch filter to "active"', function () {
          this.application.getFooter().filters().selectedActive();
          assert.ok(this.application.getFooter().filters().isActiveSelected());
        });

        it('active-filter appearance', function (done) {
          this.application.capture(this.test.fullTitle()).then(function () { done(); });
        });

        it('should show two entries', function () {
          assert.equal(this.page.getListView().count(), 2);
        });

        it('should not show completed entries', function () {
          assert.ok(!this.page.getListView().getEntryViewByIndex(1).isCompleted());
        });

        it('should display items in correct order', function () {
          assert.equal(this.page.getListView().getEntryViewByIndex(1).getTodoText(), todos[2]);
        });
      });

      describe('Completed-filter', function () {

        it('should switch filter to "completed"', function () {
          this.application.getFooter().filters().selectedCompleted();
          assert.ok(this.application.getFooter().filters().isCompletedSelected());
        });

        it('completed-filter appearance', function (done) {
          this.application.capture(this.test.fullTitle()).then(function () { done(); });
        });

        it('should show three entries', function () {
          assert.equal(this.page.getListView().count(), 3);
        });

        it('should show completed entries', function () {
          assert.ok(this.page.getListView().getEntryViewByIndex(1).isCompleted());
        });

        it('should display items in correct order', function () {
          assert.equal(this.page.getListView().getEntryViewByIndex(1).getTodoText(), todos[4]);
        });
      });

      describe('All-filter', function () {

        it('should switch filter to "all"', function () {
          this.application.getFooter().filters().selectedAll();
          assert.ok(this.application.getFooter().filters().isAllSelected());
        });

        it('all-filter appearance', function (done) {
          this.application.capture(this.test.fullTitle()).then(function () { done(); });
        });

        it('should show five entries', function () {
          assert.equal(this.page.getListView().count(), 5);
        });
      });
    });
  });
});
