// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn'); // Select the "Add Task" button
    const taskInput = document.getElementById('task-input'); // Select the input field for new tasks
    const taskList = document.getElementById('task-list'); // Select the unordered list for displaying tasks

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Retrieve and trim the input value

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task."); // Alert the user if empty
            return; // Exit the function
        }

        // Create a new li element for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Set the text content to the task text

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set the button text
        removeButton.classList.add('remove-btn'); // Add class for styling

        // Add event listener to the remove button to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the li element from the task list
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);
        // Append the li to the task list
        taskList.appendChild(listItem);
        
        // Clear the input field
        taskInput.value = '';
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for the 'keypress' event to allow adding tasks with the "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(); // Call addTask if "Enter" is pressed
        }
    });
});

