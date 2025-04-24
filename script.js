// Initialize toast
const toastEl = document.getElementById('actionToast');
const toast = new bootstrap.Toast(toastEl);

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

// Handle form submission for adding tasks
document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('taskName').value;
    const description = document.getElementById('taskDescription').value;
    const deadline = document.getElementById('taskDeadline').value;

    // Create task object with creation date
    const task = {
        name,
        description,
        deadline,
        createdAt: new Date().toISOString()
    };

    // Save task
    saveTask(task);

    // Show toast
    showToast('Task added successfully!', 'text-bg-success');

    // Clear form
    document.getElementById('taskForm').reset();

    // Update task list
    renderTasks();
});

// Save task to localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Download tasks as tasks.txt
function downloadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const textContent = JSON.stringify(tasks, null, 2);
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.txt';
    a.click();
    URL.revokeObjectURL(url);

    // Show toast
    showToast('Tasks downloaded as tasks.txt!', 'text-bg-success');
}

// Upload tasks from tasks.txt
function uploadTasks(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const uploadedTasks = JSON.parse(e.target.result);
            if (!Array.isArray(uploadedTasks)) throw new Error('Invalid file format');

            // Get existing tasks
            let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

            // Track new tasks added
            let newTaskCount = 0;

            // Append non-duplicate tasks
            uploadedTasks.forEach(uploadedTask => {
                // Check for duplicates based on name, description, and deadline
                const isDuplicate = existingTasks.some(task =>
                    task.name === uploadedTask.name &&
                    task.description === uploadedTask.description &&
                    task.deadline === uploadedTask.deadline
                );

                if (!isDuplicate) {
                    existingTasks.push(uploadedTask);
                    newTaskCount++;
                }
            });

            // Save updated tasks
            localStorage.setItem('tasks', JSON.stringify(existingTasks));
            renderTasks();

            // Show toast with number of new tasks
            showToast(`${newTaskCount} new task${newTaskCount === 1 ? '' : 's'} uploaded successfully!`, 'text-bg-success');
        } catch (err) {
            showToast('Error: Invalid tasks.txt file!', 'text-bg-danger');
        }
    };
    reader.readAsText(file);
}

// Show toast notification
function showToast(message, bgClass) {
    toastEl.className = `toast ${bgClass}`;
    toastEl.querySelector('.toast-body').textContent = message;
    toast.show();
}

// Calculate days left until deadline
function getDaysLeft(deadline) {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Format date for display
function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Render tasks to the page
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Sort tasks by days left (ascending), then by createdAt (descending)
    tasks.sort((a, b) => {
        const daysLeftA = getDaysLeft(a.deadline);
        const daysLeftB = getDaysLeft(b.deadline);
        if (daysLeftA !== daysLeftB) {
            return daysLeftA - daysLeftB; // Sort by days left ascending
        }
        return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt descending
    });

    tasks.forEach((task, index) => {
        const daysLeft = getDaysLeft(task.deadline);
        let cardClass = 'task-card';
        if (daysLeft < 0) cardClass += ' deadline-overdue';
        else if (daysLeft <= 3) cardClass += ' deadline-soon';

        const taskCard = document.createElement('div');
        taskCard.className = cardClass;
        taskCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title"><i class="fas fa-task me-2"></i> ${task.name}</h5>
                <p class="card-text"><i class="fas fa-align-left me-2"></i> ${task.description}</p>
                <p class="card-text"><i class="fas fa-calendar-plus me-2"></i> <strong>Created:</strong> ${formatDate(task.createdAt)}</p>
                <p class="card-text"><i class="fas fa-calendar-times me-2"></i> <strong>Deadline:</strong> ${formatDate(task.deadline)}</p>
                <p class="card-text"><i class="fas fa-hourglass-half me-2"></i> <strong>Days Left:</strong> ${daysLeft >= 0 ? daysLeft : 'Overdue'}</p>
                <div class="d-flex gap-2">
                    <button class="btn btn-warning btn-sm" onclick="openEditModal(${index})"><i class="fas fa-edit me-1"></i> Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})"><i class="fas fa-trash me-1"></i> Delete</button>
                </div>
            </div>
        `;
        taskList.appendChild(taskCard);

        // Animate card
        setTimeout(() => taskCard.classList.add('animate'), index * 100);
    });
}

// Open edit modal with task data
function openEditModal(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];

    document.getElementById('editTaskName').value = task.name;
    document.getElementById('editTaskDescription').value = task.description;
    document.getElementById('editTaskDeadline').value = task.deadline;
    document.getElementById('editTaskIndex').value = index;

    const modal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    modal.show();
}

// Save edited task
function saveEditedTask() {
    const index = document.getElementById('editTaskIndex').value;
    const name = document.getElementById('editTaskName').value;
    const description = document.getElementById('editTaskDescription').value;
    const deadline = document.getElementById('editTaskDeadline').value;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index] = {
        name,
        description,
        deadline,
        createdAt: tasks[index].createdAt
    };

    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Show toast
    showToast('Task updated successfully!', 'text-bg-success');

    // Update task list
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Show toast
    showToast('Task deleted successfully!', 'text-bg-success');

    renderTasks();
}
