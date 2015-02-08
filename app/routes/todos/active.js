import Ember from 'ember';

export default Ember.Route.extend({
  templateName: 'todos/index',
  controllerName: 'todos/index',

  model: function () {
    return this.store.filter('todo', function (todo) {
      return !todo.get('isCompleted');
    });
  }
});
