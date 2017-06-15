var Con = function() {};

Con.prototype = new Renderer();

Con.prototype._init = function() {
  // clear();
};

Con.prototype._render = function(tasks) {
  console.log('진행');

  var task, i;

  for (i = 0; i < tasks.length; i++) {
    task = tasks[i];

    if (task.state === STATE.PROGRESS()) {
      console.log(task.id + '. ' + task.title + '(' + task.state + ')' );
    }
  }

  console.log('완료');

  for (i = 0; i < tasks.length; i++) {
    task = tasks[i];

    if (task.state === STATE.COMPLETE()) {
      console.log(task.id + '. ' + task.title + '(' + task.state + ')' );
    }
  }

  console.log('추가     : addTask(할일 내용)');
  console.log('삭제     : removeTask(아이디)');
  console.log('상태 변경 : changeState(아이디, 상태 - 완료 또는 진행)');
};

var con = new Con();