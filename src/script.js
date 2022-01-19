const form = document.querySelector('.form');
const formInput = document.querySelector('.form__input');
const tasksContainer = document.querySelector('.tasks__container');

let list = JSON.parse(localStorage.getItem('list')) || [];
let currentId = list.length ? list[list.length - 1]?.id + 1 : 1;

showAllTasks();

function saveTodos() {
  localStorage.setItem('list', JSON.stringify(list))
}

function showAllTasks() {
  tasksContainer.innerHTML = '';
  list.forEach((task) => showTask(task.id, task.todo))
}

function getTask(id) {
  return document.querySelector(`.task__item[data-id="${id}"]`);
}

function addTask(e) {
  e.preventDefault();
  if (!formInput.value) return;

  let task = {
    id: currentId++,
    todo: formInput.value,
    checked: false,
    important: false,
  };

  list.push(task);
  formInput.value = '';
  showTask(task.id, task.todo)
  saveTodos();
}

function showTask(id, todo) {
  let wrapper = document.createElement('div');
  wrapper.classList.add('task__item-wrap');

  let removeBtn = document.createElement('button');
  removeBtn.classList.add('task__btn', 'btn');
  removeBtn.innerHTML = '<i class="fas fa-times"></i>'
  removeBtn.addEventListener('click', () => removeTask(id))
  wrapper.appendChild(removeBtn)

  let taskItem = document.createElement('div');
  taskItem.classList.add('task__item');
  taskItem.innerText = todo;
  taskItem.setAttribute('data-id', id)
  taskItem.addEventListener('click', () => checkTask(id))
  wrapper.appendChild(taskItem)

  tasksContainer.appendChild(wrapper)

  // Shorty:
  // let removeBtn = `<button class="task__btn btn" onclick="removeTask(${id})"> <i class="fas fa-times"></i></button>`;
  // let todoItem = `<div class="task__item" data-id="${id}" onclick="checkTask(${id})">${todo}</div>`;
  // tasksContainer.insertAdjacentHTML("beforeend", `<div class="task__item-wrap">${removeBtn + todoItem}</div>`)
}

function checkTask(id) {
  const todo = list.find(item => item.id === id);
  todo.checked = !todo.checked;

  const task = getTask(id);
  task.classList.toggle('checked');
}

function removeTask(id) {
  list = list.filter(todo => todo.id !== id);
  const task = getTask(id);
  task.parentElement.remove();
  saveTodos();
}


form.addEventListener('submit', addTask);

