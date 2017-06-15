var STATE = (function() {
  var c = { toString: function() { return 'COMPLETE'; } };
  var p = {};

  return {
    COMPLETE: function() { return c; },
    PROGRESS: function() { return p; }
  };
})();

var todo = (function() {
  var tasks = [];

  var addTask = (function() {
    var id = 0;

    return function(title) {
          var result = id;

          tasks.push({
            title: title,
            id: id++,
            state: STATE.PROGRESS()
          });

          render();

          return result;
        };
  })();

  var removeTask = function(id) {
    var isRemoved = false;

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks.splice(i, 1);
        isRemoved = true;

        break;
      }
    }

    if (!isRemoved) {
      warning('removeTask: invalid id');
    }

    render();
  };

  var changeState = function(id, state) {
    var ID = false, STATE, i;

    for (i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        ID = id;
        break;
      }
    }
    if (ID === false) {
      warning('changeState: invalid id - ' + id);
      return;
    }

    STATE = state;

    for (i = 0; i < tasks.length; i++) {
      if (tasks[i].id === ID) {
        tasks[i].state = STATE;
        break;
      }
    }

    render();
  };

  var warning = console.log;
  var target;

  var render = function() {
    target.render(Object.assign(tasks));
  };

  return {
    setRenderer: function(renderer) {
      if (!(renderer instanceof Renderer)) return; 
      // if (typeof renderer.init !== 'function' || typeof renderer.render !== 'function') return;

      target = renderer;
      target.init(todo);
    },
    add: addTask,
    remove: removeTask,
    toggle: function(id) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          if (tasks[i].state === STATE.PROGRESS()) {
            changeState(id, STATE.COMPLETE());
          } else {
            changeState(id, STATE.PROGRESS());
          }

          break;
        }
      }
    }
  };
})();