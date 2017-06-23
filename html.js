var Item = (function() {
  var items = {};

  var Item = function(selector) {
    if (items[selector]) throw '이미 존재 - item';

    this._el = items[selector] = selector;
  }, fn = Item.prototype;

  fn.init = function() {
    var el;

    this._el = el = document.querySelector(this._el);

    if (el.parentNode) el.parentNode.removeChild(el);
  };

  fn.add = function(task) {
    var el = this._el.cloneNode(true);

    el.querySelector('p').innerHTML = task;

    var todo = this._todo;
    var btns = el.querySelectorAll('input');

    btns[0].onclick = function() {
      todo.toggle(task);
    };

    btns[1].onclick = function() {
      todo.remove(task);
    };

    return el;
  };

  return Item;
})();

var List = (function() {
  var List, fn;
  var containers = {};

  List = function(selector, item) {
    if (containers[selector]) throw '이미 존재 - list';

    this._container = containers[selector] = selector;
    this._item = item;
  };

  fn = List.prototype;

  fn.init = function(manager) {
    this._container = document.querySelector(this._container);
    this._item.init();
  };

  fn.clear = function() {
    this._container.innerHTML = '';
  };

  fn.add = function(task) {
    this._container.appendChild(this._item.add(task));
  };
})();

var ListManager = (function() {
  var ListManager = function(add, pList, cList) {
    this._add = add;
    this._pList = pList;
    this._cList = cList;

    this._isInitialized = false;
  };

  var fn = ListManager.prototype = new Renderer();

  fn._init = function() {
    if (this._isInitialized) return;
    this._isInitialized = true;

    this._add(this._todo);
    this._add = null;

    this._pList.init(this);
    this._cList.init(this);
  };

  fn._render = function(tasks) {
    var task;

    this._pList.clear();
    this._cList.clear();

    for(var i = 0; i < tasks.length; i++) {
      task = tasks[i];

      if (task.isComplete()) {
        this._cList.add(task);  
      } else {
        this._pList.add(task);  
      }
    }
  };

  return ListManager;
})();