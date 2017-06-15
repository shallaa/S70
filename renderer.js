var Renderer = function() {};

Renderer.prototype.init = function(todo) {
  this.todo = todo;

  this._init();
};

Renderer.prototype.render = function(tasks) {
  this._render(tasks);
};

Renderer.prototype._init = function(todo) {

};

Renderer.prototype._render = function(tasks) {

};