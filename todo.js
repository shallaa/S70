var todo = (function() {
  var tasks = [];

  var STATE_P = '진행';
  var STATE_C = '완료';

  var addTask = (function() {
    var id = 0;

    return function(title) {
          var result = id;

          tasks.push({
            title: title,
            id: id++,
            state: STATE_P
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
    var ID = false, STATE;
    for (var i = 0; i < tasks.length; i++) {
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

    for (var i = 0; i < tasks.length; i++) {
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
      if (typeof renderer.init !== 'function' || typeof renderer.render !== 'function') return;

      target = renderer;
      target.init(todo);
    },
    add: addTask,
    remove: removeTask,
    toggle: function(id) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          if (tasks[i].state === STATE_P) {
            changeState(id, STATE_C);
          } else {
            changeState(id, STATE_P);
          }

          break;
        }
      }
    }
  };
})();