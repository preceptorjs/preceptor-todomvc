import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean'),
  createdDate: DS.attr('string'),
  completedDate: DS.attr('string')
});
