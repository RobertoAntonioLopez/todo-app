const form = document.querySelector("#form-task");
const inputTask = document.querySelector("#input-task");
const taskList = document.querySelector("#list-task");

form.addEventListener("submit", (event) =>{
    event.preventDefault();

    const newTask = document.createElement("li");

    newTask.textContent = inputTask.value;
    taskList.append(newTask);

    inputTask.value = "";

    inputTask.focus();
})