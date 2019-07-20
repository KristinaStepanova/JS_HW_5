// Форма
// Список задач
const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c4e88e0',
    completed: true,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // UI Elements
  const tasksList = document.querySelector('.tasks-list-section .list-group');
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];

  renderTasks();
  form.addEventListener('submit', onFormSubmitHandler);
  tasksList.addEventListener('click', onDeleteHandler);

  // Functions
  function renderTasks() {
    const fragment = document.createDocumentFragment();
    Object.values(objOfTasks).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    tasksList.appendChild(fragment);
  }

  function listItemTemplate(task) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
    );
    li.setAttribute('data-task-id', task._id);

    const span = document.createElement('span');
    span.textContent = task.title;
    span.style.fontWeight = 'bold';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

    const article = document.createElement('p');
    article.textContent = task.body;
    article.classList.add('mt-2', 'w-100');

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);

    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert('Пожалуйста введите title и body');
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    tasksList.insertAdjacentElement('afterbegin', listItem);
    form.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }

  function onDeleteHandler(e) {
    const { target } = e;
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      parent.remove();
      delete objOfTasks[id];
    }
  }
})(tasks);
