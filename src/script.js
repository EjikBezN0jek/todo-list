const form = document.querySelector('.form');
const formInput = document.querySelector('.form__input');
const formBtn = document.querySelector('.form__btn');
const tasksContainer = document.querySelector('.tasks__container');

let list = [];

showTasks();

function addTask(e) {
  e.preventDefault();

  let task = {
    id: list.length + 1,
    todo: formInput.value,
    checked: false,
    important: false
  };

  list.push(task);
  showTask(task.id, task.todo)
  formInput.value = '';
}

function showTasks() {
  tasksContainer.innerHTML = '';
  list.forEach((task) => showTask(task.id, task.todo))

  const tasks = tasksContainer.querySelectorAll('.task__item')
  tasks.forEach(task => task.addEventListener('click', () => checkTask(+task.dataset.id)))
}

function showTask(id, todo) {
  tasksContainer.insertAdjacentHTML("beforeend", `
        <div class="task__item" data-id="${id}">${todo}</div>
    `)
}

function checkTask(id) {
  const todo = list.find(item => item.id === id);
  todo.checked = !todo.checked

  const task = document.querySelector(`.task__item[data-id="${id}"]`);
  task.classList.toggle('checked')
}


form.addEventListener('submit', addTask);