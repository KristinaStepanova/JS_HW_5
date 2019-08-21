// Форма
// Список задач
const tasks = [
  // {
  //   _id: '5d2ca9e2e03d40b326596aa7',
  //   completed: true,
  //   body:
  //     'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
  //   title: 'Eu ea incididunt sunt consectetur fugiat nonOccaecat non ea quis occaecat ad culpa.',
  // },
  // {
  //   _id: '5d2ca9e29c8a94095c4e88e0',
  //   completed: false,
  //   body:
  //     'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
  //   title:
  //     'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  // },
];

(function (arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // UI Elements
  const tasksList = document.querySelector('.tasks-list-section .list-group');
  const allTaskBtn = document.querySelector('.all-tak');
  const unCompTaskBtn = document.querySelector('.uncompl-task');
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const message = document.querySelector('.message');

  if (tasks.length !== 0) {
    message.style.display = 'none';
  }

  renderTasks();
  form.addEventListener('submit', onFormSubmitHandler);
  tasksList.addEventListener('click', onDeleteHandler);
  allTaskBtn.addEventListener('click', onFilteredTasks);
  unCompTaskBtn.addEventListener('click', onFilteredTasks);

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
      'bgd-none'
    );
    li.setAttribute('data-task-id', task._id);

    const span = document.createElement('span');
    span.textContent = task.title;
    span.style.fontWeight = 'bold';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.classList.add('btn', 'btn-success', 'ml-2', 'done-btn');

    const article = document.createElement('p');
    article.textContent = task.body;
    article.classList.add('mt-2', 'w-100');

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(doneBtn);
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
    message.style.display = 'none';

    return { ...newTask };
  }

  function onDeleteHandler(e) {
    const { target } = e;
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      parent.remove();
      delete objOfTasks[id];
      if (Object.keys(objOfTasks).length == 0) {
        message.style.display = 'block';
      }
    }
    if (target.classList.contains('done-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      if (parent.classList.toggle('bgd-green')) {
        objOfTasks[id].completed = true;
      }
      if (parent.classList.toggle('bgd-none')) {
        objOfTasks[id].completed = false;
      }

    }
  }

  function toggleTasks(sortType) {
    Object.values(objOfTasks).forEach(task => {
      switch (sortType) {
        case 'all':
          document.querySelector(`[data-task-id='${task._id}']`).classList.remove('completed');
          break;
        case 'uncompleted':
          if (task.completed){
            document.querySelector(`[data-task-id='${task._id}']`).classList.add('completed');
          }
          break;
      }
    })
  }

  function onFilteredTasks(e) {
    const { target } = e;
    const sortType = target.dataset.taskSort;
    toggleTasks(sortType);
  }
})(tasks);
