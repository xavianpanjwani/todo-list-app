document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task-button");
    const taskList = document.getElementById("task-list");

    // Load tasks from localStorage
    loadTasks();

    addTaskButton.addEventListener("click", function () {
        addTask();
    });

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            createTaskElement(taskText, false);
            saveTasks();
            taskInput.value = ""; // Clear the input field
        }
    }

    function createTaskElement(taskText, isCompleted) {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        if (isCompleted) {
            taskItem.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isCompleted;

        const taskContent = document.createElement("span");
        taskContent.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.style.display = isCompleted ? "inline" : "none";

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                taskItem.classList.add("completed");
                deleteButton.style.display = "inline";
            } else {
                taskItem.classList.remove("completed");
                deleteButton.style.display = "none";
            }
            saveTasks();
        });

        deleteButton.addEventListener("click", function () {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll(".task-item");
        
        taskItems.forEach(function(item) {
            const taskText = item.querySelector("span").textContent;
            const isCompleted = item.classList.contains("completed");
            tasks.push({ text: taskText, completed: isCompleted });
        });
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(function(task) {
                createTaskElement(task.text, task.completed);
            });
        }
    }
});