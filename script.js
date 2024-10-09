// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn'); // Select the "Add Task" button
    const taskInput = document.getElementById('task-input'); // Select the input field for new tasks
    const taskList = document.getElementById('task-list'); // Select the unordered list for displaying tasks

    // Load tasks from Local Storage and populate the task list
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Retrieve tasks from Local Storage
        storedTasks.forEach(taskText => addTask(taskText, false)); // Add tasks to the list without saving again
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        const trimmedTaskText = taskText.trim() || taskInput.value.trim(); // Trim input or use passed taskText

        // Check if the input is empty
        if (!trimmedTaskText) {
            alert("Please enter a task."); // Alert the user if empty
            return; // Exit the function
        }

        // Create a new li element for the task
        const listItem = document.createElement('li');
        listItem.textContent = trimmedTaskText; // Set the text content to the task text

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set the button text
        removeButton.classList.add('remove-btn'); // Add class for styling

        // Add event listener to the remove button to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the li element from the task list
            removeTaskFromLocalStorage(trimmedTaskText); // Remove the task from Local Storage
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);
        // Append the li to the task list
        taskList.appendChild(listItem);
        
        // Save to Local Storage if required
        if (save) {
            saveTaskToLocalStorage(trimmedTaskText);
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save updated tasks array to Local Storage
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Filter out the removed task
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update Local Storage
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', () => addTask('', true));

    // Event listener for the 'keypress' event to allow adding tasks with the "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask('', true); // Call addTask if "Enter" is pressed
        }
    });
});

