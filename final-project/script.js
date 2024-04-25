// Function to save text box inputs to an array and local storage
function saveTextBoxInputs() {
    var textBoxInputs = []; // Array to store text box inputs
    
    // Select all text boxes with IDs starting with "user-input"
    var textBoxes = document.querySelectorAll('textarea[id^="user-input"]');
    
    // Loop through each text box
    textBoxes.forEach(function(textBox) {
        // Check if the current text box's value is not empty
        if (textBox.value.trim() !== '') {
            // If not empty, add the value of the text box to the array
            textBoxInputs.push(textBox.value);
        }
    });
    
    // Save textBoxInputs to local storage
    localStorage.setItem('textBoxInputs', JSON.stringify(textBoxInputs));

    console.log("inputs:", textBoxInputs); // Log the array itself
}

// Event listener for the "Done" button
var sendButton = document.getElementById('send-button');
if (sendButton) {
    // Add event listener only if the element exists
    sendButton.addEventListener('click', function() {
        var textBoxInputs = saveTextBoxInputs(); // Save text box inputs to an array and local storage
        // Output the array to the console

        // Redirect to another page after a short delay
        setTimeout(function() {
            window.location.href = 'tasktime.html';
        }, 0);
    });
} else {
    console.log("Element with id 'send-button' not found.");
}

// Function to display stored inputs on tasktime.html
function displayStoredInputs() {
    var storedTextBoxInputs = localStorage.getItem('textBoxInputs');
    
    if (storedTextBoxInputs) {
        // Parse storedTextBoxInputs back to array
        var textBoxInputs = JSON.parse(storedTextBoxInputs);
        
        // Log the stored inputs to the console
        console.log('Stored Text Box Inputs:', textBoxInputs);

        // Display the stored inputs on the page
        var textBoxInputsDiv = document.getElementById('textBoxInputs');
        
        // Loop through the stored inputs and display them
        textBoxInputs.forEach(function(input, index) {
            // Create a div for each task with a checkbox and task text
            var taskDiv = document.createElement('div');
            taskDiv.className = 'task';

            // Create checkbox input
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'taskCheckbox' + index; // Unique ID for each checkbox
            checkbox.className = 'task-checkbox';

            // Create label for the checkbox
            var label = document.createElement('label');
            label.htmlFor = 'taskCheckbox' + index;
            label.textContent = 'Task ' + (index + 1) + ': ' + input;

            // Append checkbox and label to the task div
            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(label);

            // Append the task div to the textBoxInputsDiv
            textBoxInputsDiv.appendChild(taskDiv);
        });
    } else {
        // No inputs stored in local storage
        console.log('No stored text box inputs found.');
    }
}
// Call the displayStoredInputs function when the page loads
window.onload = function() {
    displayStoredInputs();
};

// Rest of your code for adding text boxes and other functionalities
var textBoxCount = 3; // Initial count of text boxes

console.log("count equals:", textBoxCount);

function addTextBox() {
    if (textBoxCount < 10) {
        textBoxCount++; // Increment the count
        var textBoxContainer = document.getElementById('textBoxContainer');
    
        // Create a new text box
        var newTextBox = document.createElement('div');
        newTextBox.className = 'TaskInput';
        newTextBox.innerHTML = '<textarea id="user-input' + textBoxCount + '" placeholder=""></textarea>';

        var emptyLine = document.createElement('div');
        emptyLine.className = 'empty-line';
        textBoxContainer.appendChild(emptyLine);
        
        // Append the new text box to the container
        textBoxContainer.appendChild(newTextBox);

    } else {
        alert("Seems like too much of a load for you today :(");
    }
}