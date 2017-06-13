var con = (function() {
  return {
    init: function() {
      clear();
    },
    render: function(tasks) {
      console.log('진행');

      var task;

      for (var i = 0; i < tasks.length; i++) {
        task = tasks[i];

        if (task.state === '진행') {
          console.log(task.id + '. ' + task.title + '(' + task.state + ')' );
        }
      }

      console.log('완료');

      for (var i = 0; i < tasks.length; i++) {
        task = tasks[i];

        if (task.state === '완료') {
          console.log(task.id + '. ' + task.title + '(' + task.state + ')' );
        }
      }

      console.log('추가     : addTask(할일 내용)');
      console.log('삭제     : removeTask(아이디)');
      console.log('상태 변경 : changeState(아이디, 상태 - 완료 또는 진행)');
    }
  };
})();