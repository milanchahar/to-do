let tasks = [];

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        input.value = '';
        renderTasks();
        updateProgress();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    updateProgress();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    updateProgress();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">❌</button>
        `;

        taskList.appendChild(li);
    });
}

function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const percent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    document.getElementById('progressBar').value = percent;
    document.getElementById('progressText').textContent = `${percent}% tasks completed`;
}

// 👇 Make functions accessible in HTML onclick/onchange
window.addTask = addTask;
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
