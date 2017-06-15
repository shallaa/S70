var Html = function() {};

Html.prototype = new Renderer();

Html.prototype._init = function() {
  this.progressLi = document.querySelector('#todo .progress li');
  this.completeLi = document.querySelector('#todo .complete li');

  this.progressLi.parentNode.removeChild(this.progressLi);
  this.completeLi.parentNode.removeChild(this.completeLi);

  console.log('form 안의 input을 연결');
};

Html.prototype._render = function(tasks) {
  if (typeof this.completeLi === 'undefined' || typeof this.progressLi === 'undefined') {
    return;
  }

  var complete = document.querySelector('#todo .complete');
  var progress = document.querySelector('#todo .progress');

  console.log('// 각 리스트를 비운다.');
  complete.innerHTML = '';
  progress.innerHTML = '';

  console.log('// 진행을 채운다.');
  console.log('// 완료를 채운다.');
  var task, child, inputs;

  for(var i = 0; i < tasks.length; i++) {
    task = tasks[i];

    if (task.state === STATE.COMPLETE()) {
      child = this.completeLi.cloneNode(true);
      child.querySelector('p').innerHTML = task.title;

      inputs = child.querySelectorAll('input');

      inputs[0].setAttribute('data-task-id', task.id);
      inputs[0].onclick = function() {
        this.todo.toggle(this.getAttribute('data-task-id'));
      };

      inputs[1].setAttribute('data-task-id', task.id);
      inputs[1].onclick = function() {
        this.todo.remove(this.getAttribute('data-task-id'));
      };

      complete.appendChild(child);
    } else {
      child = this.progressLi.cloneNode(true);
      child.querySelector('p').innerHTML = task.title;

      inputs = child.querySelectorAll('input');

      inputs[0].setAttribute('data-task-id', task.id);
      inputs[0].onclick = function() {
        this.todo.toggle(this.getAttribute('data-task-id'));
      };

      inputs[1].setAttribute('data-task-id', task.id);
      inputs[1].onclick = function() {
        this.todo.remove(this.getAttribute('data-task-id'));
      };

      progress.appendChild(child);
    }
  }

  console.log('// 인풋 박스를 비운다.');
};

var html = new Html();