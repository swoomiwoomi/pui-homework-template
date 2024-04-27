$(document).ready(function() {
    // Event handling for the send button
    $('#send-button').click(function() {
        var textBoxInputs = saveTextBoxInputs();
        setTimeout(function() {
            window.location.href = 'tasktime.html';
        }, 0);
    });

    // Function to save text box inputs
    function saveTextBoxInputs() {
        var textBoxInputs = []; 
        // Select all textareas with IDs starting with "user-input"
        $('textarea[id^="user-input"]').each(function() {
            var value = $(this).val().trim();
            if (value !== '') {
                textBoxInputs.push(value);
            }
        });
        localStorage.setItem('textBoxInputs', JSON.stringify(textBoxInputs));
        console.log("inputs:", textBoxInputs); // Log the array itself
    }

    // Function to display stored inputs
    function displayStoredInputs() {
        var storedTextBoxInputs = localStorage.getItem('textBoxInputs');
        if (storedTextBoxInputs) {
            var textBoxInputs = JSON.parse(storedTextBoxInputs);
            console.log('Stored Text Box Inputs:', textBoxInputs);
            var textBoxInputsDiv = $('#textBoxInputs');
            textBoxInputs.forEach(function(input, index) {
                var taskDiv = $('<div class="task"></div>');
                var checkbox = $('<input type="checkbox" class="task-checkbox"/>');
                checkbox.attr('id', 'taskCheckbox' + index);
                var label = $('<label></label>').attr('for', 'taskCheckbox' + index).text('Task ' + (index + 1) + ': ' + input);
                taskDiv.append(checkbox).append(label);
                textBoxInputsDiv.append(taskDiv);
            });
        } else {
            console.log('No stored text box inputs found.');
        }
    }

    // Call the displayStoredInputs function on window load
    $(window).on('load', displayStoredInputs);

    var textBoxCount = 3; // Initial text box count

    // Function to add a new text box
    function addTextBox() {
        if (textBoxCount < 10) {
            textBoxCount++;
            var textBoxContainer = $('#textBoxContainer');
            var newTextBox = $('<div class="TaskInput"><textarea id="user-input' + textBoxCount + '" placeholder=""></textarea></div>');
            var emptyLine = $('<div class="empty-line"></div>');
            textBoxContainer.append(emptyLine).append(newTextBox);
        } else {
            alert("Seems like too much of a load for you today :(");
        }
    }

    // Event handling for the timer buttons
    $('#start').click(startTimer);
    $('#pause').click(pauseTimer);
    $('#work').click(function() {
        resetTimer(25);
    });
    $('#longBreak').click(function() {
        resetTimer(10);
    });
    $('#shortBreak').click(function() {
        resetTimer(5);
    });

    var timerInterval;
    var minutes = 25;
    var seconds = 0;

    // Function to start the timer
    function startTimer() {
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Function to pause the timer
    function pauseTimer() {
        clearInterval(timerInterval);
    }

    // Function to reset the timer
    function resetTimer(duration) {
        clearInterval(timerInterval);
        minutes = duration;
        seconds = 0;
        updateDisplay();
    }

    // Function to update the timer display
    function updateTimer() {
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                clearInterval(timerInterval);
                var audio = document.getElementById("notificationSound");
                audio.play();
            }
        }
        updateDisplay();
    }

    // Function to pad numbers with leading zeros
    function pad(num) {
        return num < 10 ? "0" + num : num;
    }

    // Function to update the timer display
    function updateDisplay() {
        var formattedTime = pad(minutes) + ":" + pad(seconds);
        $("#timer").text(formattedTime);
    }

    // Initial display update
    updateDisplay();
});