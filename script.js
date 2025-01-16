document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task-button");
    const taskList = document.getElementById("task-list");

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const taskItem = document.createElement("li");
            taskItem.className = "task-item";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const taskContent = document.createElement("span");
            taskContent.textContent = taskText;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.style.display = "none";

            checkbox.addEventListener("change", function () {
                if (checkbox.checked) {
                    taskItem.classList.add("completed");
                    deleteButton.style.display = "inline";
                } else {
                    taskItem.classList.remove("completed");
                    deleteButton.style.display = "none";
                }
            });

            deleteButton.addEventListener("click", function () {
                taskList.removeChild(taskItem);
            });

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskContent);
            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);

            taskInput.value = ""; // Clear the input field
        }
    });

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});
