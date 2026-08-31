const form = document.querySelector("#form-task");
const inputTask = document.querySelector("#input-task");
const taskList = document.querySelector("#list-task");

form.addEventListener("submit", (event) =>{
    event.preventDefault();

    const newTask = document.createElement("li");
    const deleteButton = document.createElement("button");


    newTask.textContent = inputTask.value;
    deleteButton.textContent = "Eliminar";

    newTask.append(deleteButton);
    taskList.append(newTask);

    inputTask.value = "";

    deleteButton.type = "button";

    deleteButton.addEventListener("click", () =>{
        newTask.remove();
    })
    inputTask.focus();
})