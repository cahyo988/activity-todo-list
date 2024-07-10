// Load Tasks for all days
const loadTasks = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const taskCards = document.getElementById('task-cards');
    taskCards.innerHTML = '';

    days.forEach(day => {
        const tasks = JSON.parse(localStorage.getItem(day)) || [];
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';

        const cardBody = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${day}</h5>
                    <ul class="list-group" id="${day}-list">
                    ${tasks.map((task, index) => `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            ${task.task} - ${task.time}
                            <button class="btn btn-danger btn-sm" onclick="deleteTask('${day}', ${index})"><i class="bi bi-trash2"></i></button>
                        </li>
                    `).join('')}
                    </ul>
                </div>
            </div>
        `;
        card.innerHTML = cardBody;
        taskCards.appendChild(card);
    });
};

const addTask = () => {
    const taskInput = document.getElementById('new-task');
    const newTask = taskInput.value.trim();
    const daySelect = document.getElementById('day-select');
    const selectedDay = daySelect.value;
    const timeInput = document.getElementById('time-input');
    const taskTime = timeInput.value;

    if (newTask && taskTime) {
        const tasks = JSON.parse(localStorage.getItem(selectedDay)) || [];
        tasks.push({ task: newTask, time: taskTime }); 
        localStorage.setItem(selectedDay, JSON.stringify(tasks));
        taskInput.value = '';
        timeInput.value = ''; 
        loadTasks(); 
    }
};

const deleteTask = (day, index) => {
    const tasks = JSON.parse(localStorage.getItem(day)) || [];
    tasks.splice(index, 1); 
    localStorage.setItem(day, JSON.stringify(tasks)); 
    loadTasks(); 
};

// Load tasks when the page is opened
window.onload = loadTasks;
