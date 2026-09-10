const form = document.querySelector("#form-task");
const inputTask = document.querySelector("#input-task");
const taskList = document.querySelector("#list-task");
const taskCount = document.querySelector("#task-count");
const emptyState = document.querySelector("#empty-state");
const clearCompletedButton = document.querySelector("#clear-completed");

const STORAGE_KEY = "focuslist-tasks";
let tasks = loadTasks();

function loadTasks() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
        return [];
    }
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updateSummary() {
    const remaining = tasks.filter((task) => !task.completed).length;
    taskCount.textContent = `${remaining} ${remaining === 1 ? "task" : "tasks"} remaining`;
    emptyState.hidden = tasks.length > 0;
    clearCompletedButton.hidden = !tasks.some((task) => task.completed);
}

function createTaskElement(task) {
    const listItem = document.createElement("li");
    listItem.dataset.id = task.id;
    listItem.classList.toggle("completed", task.completed);

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "task-toggle";
    toggleButton.textContent = "✓";
    toggleButton.setAttribute("aria-label", task.completed ? "Mark task as incomplete" : "Mark task as complete");

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.text}`);

    toggleButton.addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    });

    deleteButton.addEventListener("click", () => {
        tasks = tasks.filter((item) => item.id !== task.id);
        saveTasks();
        renderTasks();
    });

    listItem.append(toggleButton, taskText, deleteButton);
    return listItem;
}

function renderTasks() {
    taskList.replaceChildren(...tasks.map(createTaskElement));
    updateSummary();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = inputTask.value.trim();
    if (!text) return;

    tasks.unshift({
        id: crypto.randomUUID(),
        text,
        completed: false
    });

    saveTasks();
    renderTasks();
    form.reset();
    inputTask.focus();
});

clearCompletedButton.addEventListener("click", () => {
    tasks = tasks.filter((task) => !task.completed);
    saveTasks();
    renderTasks();
});

renderTasks();
