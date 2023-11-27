const todoList = JSON.parse(localStorage.getItem('Mylist')) || [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  const currentDate = new Date(); // Get the current date and time

  todoList.forEach((todoObject, index) => {
    const name = todoObject.name;
    const dueDate = new Date(todoObject.date + ' ' + todoObject.time); // Convert the due date and time to a Date object

    let checkMark = '';
    if (currentDate >= dueDate) {
      checkMark = '<span class="check-mark">&#10004;</span>'; // Add a check mark
    }

    const html = `
      <div class="list">
        <p>${name}</p>
        ${checkMark}
      </div>
      <p class="input_date">${todoObject.date}</p>
      <p class="input_time">${todoObject.time}</p>
      <button class="delete-btn js-removeClick">Delete</button> 
    `;

    todoListHTML += html;
  });

  document.querySelector('.todos').innerHTML = todoListHTML;

  document.querySelectorAll('.js-removeClick').forEach((button, index) => {
    button.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
      localStorage.setItem('Mylist', JSON.stringify(todoList));
    });
  });
}

document.querySelector('.js-display-added').addEventListener('click', () => {
  addTodo();
});

function addTodo() {
  const listName = document.querySelector('.js-list');
  const name = listName.value;

  const dueDate = document.querySelector('.js-date');
  const date = dueDate.value;

  const dueTime = document.querySelector('.js-time');
  const time = dueTime.value;

  const todo = {
    name,
    date,
    time
  };

  if (!listName.value) {
    return;
  }

  todoList.push(todo);
  localStorage.setItem('Mylist', JSON.stringify(todoList));

  renderTodoList();

  listName.value = '';
  dueDate.value = '';
  dueTime.value = '';
}
