const form = document.querySelector('.form');
const formInput = document.querySelector('.form__input');
const tasksContainer = document.querySelector('.tasks__container');
const search = document.querySelector('.search__form');
const searchInput = document.querySelector('.search__input');

let list = JSON.parse(localStorage.getItem('list')) || [];
let currentId = list.length ? list[list.length - 1]?.id + 1 : 1;

showAllTasks(list);

function saveTodos() {
  localStorage.setItem('list', JSON.stringify(list))
}

function showAllTasks(list) {
  tasksContainer.innerHTML = '';
  if (list.length) {
    list.forEach((task) => showTask(task.id, task.todo))
  } else if (searchInput.value) {
    tasksContainer.innerHTML = '<p class="text-center">Not found tasks!</p>';
  } else {
    tasksContainer.innerHTML = '<p class="text-center">There is not tasks! Add one!</p>';
  }
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
  if (list.length === 1) showAllTasks(list)
  saveTodos();
}

function showTask(id, todo) {
  let wrapper = document.createElement('div');
  wrapper.classList.add('task__item-wrap');

  wrapper.append(createCheckBtn(id))

  wrapper.append(createImportantBtn(id))

  wrapper.append(createTaskItem(id, todo))

  wrapper.append(createRewriteBtn(id))

  wrapper.append(createRemoveBtn(id))

  tasksContainer.append(wrapper)
}

function createRemoveBtn(id) {
  let removeBtn = document.createElement('button');
  removeBtn.classList.add('task__btn', 'task__btn--remove' ,'btn');
  removeBtn.innerHTML = '<i class="fas fa-times"></i>'
  removeBtn.addEventListener('click', () => removeTask(id))
  return removeBtn;
}

function createRewriteBtn(id) {
  let rewriteBtn = document.createElement('button');
  rewriteBtn.classList.add('task__btn', 'task__btn--rewrite', 'btn');
  rewriteBtn.innerHTML = '<i class="fas fa-pen"></i>'
  rewriteBtn.addEventListener('click', () => rewriteTask(id));
  return rewriteBtn;
}

function createImportantBtn(id) {
  let importantBtn = document.createElement('button');
  importantBtn.classList.add('task__btn', 'task__btn--important', 'btn');
  importantBtn.innerHTML = '<i class="fas fa-exclamation"></i>'
  importantBtn.addEventListener('click', () => importantTask(id));
  return importantBtn;
}

function createCheckBtn(id) {
  let checkBtn = document.createElement('button');
  checkBtn.classList.add('task__btn','task__btn--check', 'btn');
  checkBtn.innerHTML = '<i class="fas fa-check"></i>'
  checkBtn.addEventListener('click', () => checkTask(id));
  return checkBtn;
}

function createTaskItem(id, todo) {
  let taskItem = document.createElement('div');
  taskItem.classList.add('task__item');
  taskItem.innerText = todo;
  taskItem.setAttribute('data-id', id)
  taskItem.addEventListener('focusout',  () => saveTask(id))
  taskItem.addEventListener('keypress', (e) => {
    if (e.code === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      taskItem.blur()
    }
  })
  return taskItem;
}

function importantTask(id) {
  const task = getTask(id)
  task.classList.toggle('important');
}

function rewriteTask(id) {
  const task = getTask(id)
  task.setAttribute("contentEditable", "true")
  task.focus();
}

function saveTask(id) {
  const task = getTask(id)
  list.find(item => item.id === id).todo = task.innerText
  task.setAttribute("contentEditable", "false")
  saveTodos();
}

function checkTask(id) {
  const todo = list.find(item => item.id === id);
  todo.checked = !todo.checked;

  const task = getTask(id);
  task.classList.toggle('checked');
}

function searchTask(value) {
  let searchedTasks = list.filter(item => item.todo.includes(value));
  showAllTasks(searchedTasks);
}

function removeTask(id) {
  list = list.filter(todo => todo.id !== id);
  const task = getTask(id);
  task.parentElement.remove();
  if (!list.length) showAllTasks(list)
  saveTodos();
}

form.addEventListener('submit', addTask);

searchInput.addEventListener('input',(e) => searchTask(e.target.value))

