function saveTextBoxInputs() {
    var textBoxInputs = []; 
    
   
    var textBoxes = document.querySelectorAll('textarea[id^="user-input"]');
    
   
    textBoxes.forEach(function(textBox) {
        
        if (textBox.value.trim() !== '') {
            
            textBoxInputs.push(textBox.value);
        }
    });
    
 
    localStorage.setItem('textBoxInputs', JSON.stringify(textBoxInputs));

    console.log("inputs:", textBoxInputs); // Log the array itself
}


var sendButton = document.getElementById('send-button');
if (sendButton) {
    
    sendButton.addEventListener('click', function() {
        var textBoxInputs = saveTextBoxInputs(); 

        setTimeout(function() {
            window.location.href = 'tasktime.html';
        }, 0);
    });
} else {
    console.log("Element with id 'send-button' not found.");
}


function displayStoredInputs() {
    var storedTextBoxInputs = localStorage.getItem('textBoxInputs');
    
    if (storedTextBoxInputs) {
        
        var textBoxInputs = JSON.parse(storedTextBoxInputs);
        
       
        console.log('Stored Text Box Inputs:', textBoxInputs);

       
        var textBoxInputsDiv = document.getElementById('textBoxInputs');
        
        
        textBoxInputs.forEach(function(input, index) {
            
            var taskDiv = document.createElement('div');
            taskDiv.className = 'task';

         
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'taskCheckbox' + index; 
            checkbox.className = 'task-checkbox';

          
            var label = document.createElement('label');
            label.htmlFor = 'taskCheckbox' + index;
            label.textContent = 'Task ' + (index + 1) + ': ' + input;

        
            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(label);

            
            textBoxInputsDiv.appendChild(taskDiv);
        });
    } else {

        console.log('No stored text box inputs found.');
    }
}

window.onload = function() {
    displayStoredInputs();
};

var textBoxCount = 3; // 

console.log("count equals:", textBoxCount);

function addTextBox() {
    if (textBoxCount < 10) {
        textBoxCount++; 
        var textBoxContainer = document.getElementById('textBoxContainer');

        var newTextBox = document.createElement('div');
        newTextBox.className = 'TaskInput';
        newTextBox.innerHTML = '<textarea id="user-input' + textBoxCount + '" placeholder=""></textarea>';

        var emptyLine = document.createElement('div');
        emptyLine.className = 'empty-line';
        textBoxContainer.appendChild(emptyLine);
        
       
        textBoxContainer.appendChild(newTextBox);

    } else {
        alert("Seems like too much of a load for you today :(");
    }
}

$(document).ready(function() {
    var timerInterval;
    var minutes = 25; 
    var seconds = 0;
  
    function startTimer() {
      timerInterval = setInterval(updateTimer, 1000);
    }
  
    function pauseTimer() {
      clearInterval(timerInterval);
    }
  
    function resetTimer(duration) {
      clearInterval(timerInterval);
      minutes = duration; 
      seconds = 0;
      updateDisplay();
    }
  
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
          audio.play()
        }
      }
      updateDisplay();
    }
  
    function updateDisplay() {
      var formattedTime = pad(minutes) + ":" + pad(seconds);
      $("#timer").text(formattedTime);
    }
  
    function pad(num) {
      return num < 10 ? "0" + num : num;
    }
  
    $("#start").click(function() {
      startTimer();
    });
  
    $("#pause").click(function() {
      pauseTimer();
    });
  
    $("#work").click(function() {
      resetTimer(25); 
    });
  
    $("#longBreak").click(function() {
      resetTimer(10); 
    });
  
    $("#shortBreak").click(function() {
      resetTimer(5); 
    });
  
    updateDisplay();
  });

  