const form = document.querySelector("#form-task");
const inputTask = document.querySelector("#input-task");
const taskList = document.querySelector("#list-task");

form.addEventListener("submit", (event) =>{
    event.preventDefault();

    const newTask = document.createElement("li");
    const deleteButton = document.createElement("button");
    const completeButton = document.createElement("button");


    newTask.textContent = inputTask.value;
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");

    completeButton.textContent = "Complete";
    completeButton.classList.add("completeButton");

    newTask.append(deleteButton);
    newTask.append(completeButton)
    taskList.append(newTask);

    inputTask.value = "";

    deleteButton.type = "button";
    completeButton.type = "button";

    deleteButton.addEventListener("click", () =>{
        newTask.remove();
    })

    completeButton.addEventListener("click", () => {
        newTask.classList.toggle("completed")

        if(newTask.classList.contains("completed"))
        {
            completeButton.textContent = "Mark as incomplete";
        } else
        {
            completeButton.textContent = "Mark as complete";
        }
        
    })

    inputTask.focus();
})