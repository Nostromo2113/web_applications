// Getting elements from DOM
const input = document.querySelector('#input');
const btn_input = document.querySelector('.button_input');
const btnSortDate = document.querySelector('#btn_sort_date')
const activeResult = document.querySelector('#result_active');
const activeTotal = document.querySelector('.active_counter');
const archivedTotal = document.querySelector('.archive_counter')
const btnSortPriority = document.querySelector('#btn_sort_priority');
const archivedResult = document.querySelector('#result_archive');
// Active task array
const inputArray = [];
//Event Listener for input
btn_input.addEventListener('click', (e) => {
tasksInArray(input.value);
console.log(inputArray);
addRemoveTasks (inputArray);
input.value = '';
});
input.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
    tasksInArray(input.value);
    console.log(inputArray);
    input.value = '';
    addRemoveTasks (inputArray);
}});
//Event Lisener for sort buttons
btnSortPriority.addEventListener('click', (e) => {
 sortTasksByPriority(inputArray);
 addRemoveTasks(inputArray);
});

btnSortDate.addEventListener('click', (e) => {
  onlyDateSort(inputArray);
  addRemoveTasks(inputArray);
});
//Get the values from input and turn them into an object
function tasksInArray (value) {
    if (value != ''){
    const message = {
    text: value,
    timestamp: Date.now(),
    priority: 1,
    };
    inputArray.push(message);
    }};
//The main function for creating active tasks
function addRemoveTasks (array) {
  //updating counters
activeTotal.textContent = " " + array.length;
archivedTotal.textContent = " " + archivedTasksArr.length;
activeResult.innerHTML = '';
array.forEach ((message) => {
    console.log(message);
    //Creating variables for added elements
    const taskLi = document.createElement('li');
    const taskLiContent = document.createElement('span')
    const timeAndDate = document.createElement('span');
    const buttonContainer = document.createElement('div')
    const priorityBtn = document.createElement('button');
    const archiveBtn = document.createElement('button');
    const timestamp = new Date(message.timestamp).toLocaleString();
        timeAndDate.textContent = `${timestamp}`;
        timeAndDate.className = 'time';
        taskLiContent.textContent = `${message.text}`;
            buttonContainer.className = 'button_container';
            priorityBtn.textContent = 'priority';
            priorityBtn.className = 'delete_btn';
            archiveBtn.className = 'btn_task';
            archiveBtn.id = 'btn_to_archive'
            archiveBtn.textContent = '';
                buttonContainer.appendChild(archiveBtn);
                taskLi.appendChild(timeAndDate);
                taskLi.appendChild(taskLiContent);
                taskLi.appendChild(buttonContainer);
                
                activeResult.appendChild(taskLi);
    //Select the sort button if there is a priority element
    if(inputArray.some(task => task.priority > 1)){
      btnSortPriority.className = 'btn_sort_click_priority';
    } else {
      btnSortPriority.className = 'btn_sort';
    }
    //We look at the priority of the task, and set the appropriate class
        if(message.priority > 1){
        taskLi.id = 'task_click_priority';
        taskLi.className = 'task';
        } else {
        taskLi.className = 'task'
        };
//By clicking on an element, we change its priority. 1 or 2
taskLi.addEventListener('click', (e) => {
    togglePriority(message);
    addRemoveTasks (inputArray);
});
//Sending the task to the archive
archiveBtn.addEventListener('click', (e) => {
    archivedTasksAdd(message);
    archivedTasksCreateElement (archivedTasksArr);
    const index = inputArray.indexOf(message);
    removeTasks(index, inputArray);
    addRemoveTasks (inputArray);
});
});
};
//Function for removing elements from an array
function removeTasks (index, array) {
    if(index !== -1){
    array.splice(index, 1);
    archivedTotal.textContent = " " + archivedTasksArr.length;
    }
};
//Function for changing the priority of a task
function togglePriority(message) {
  if(message.priority < 2) {
    message.priority = 2;
  } else {
    message.priority = 1;
  }
};

//function for sorting by priority
function sortTasksByPriority(array) {
  array.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return new Date(a.timestamp) - new Date(b.timestamp);
  });
};

//function for sorting by date
let sortDirection = 1;
function onlyDateSort(array) {
  array.sort((a, b) => {
    if(sortDirection === 1){
      return new Date(a.timestamp) - new Date(b.timestamp);
  } else{
      return new Date(b.timestamp) - new Date(a.timestamp);
  }})
    if(sortDirection === 1){
      sortDirection = 2;
    } else {
      sortDirection = 1;
    }
};
//Archive task array
const archivedTasksArr = [];
//Moving the task to the archive
function archivedTasksAdd(message) {
archivedTasksArr.push(message);
console.log(archivedTasksArr)
};
//Moving the task from the archive to the active ones
function recovery(array, message) {
array.push(message);
console.log(inputArray);
};
//The main function for creating archive tasks
function archivedTasksCreateElement (array) {
    if(!archivedResult) return;
    archivedResult.innerHTML = '';
    archivedTasksArr.forEach(message => {
        //Creating variables for added elements
        const li = document.createElement('li');
        const liContent = document.createElement('span');
        const timestamp = new Date(message.timestamp).toLocaleString();
        const timeAndDate = document.createElement('span');
        const deleteBtn = document.createElement('button');
        const recoveryBtn = document.createElement('button');
        const buttonContainer = document.createElement('div');
            li.className = 'task'
            timeAndDate.textContent = `${timestamp}`;
            timeAndDate.className = 'time';
            liContent.textContent = `${message.text}`;
            buttonContainer.className = 'button_container';
            deleteBtn.textContent = '';
            deleteBtn.className = 'btn_task';
            recoveryBtn.className = 'btn_task';
            deleteBtn.id = 'btn_task_delete';
            recoveryBtn.id = 'btn_task_recovery';
                 buttonContainer.appendChild(deleteBtn);
                 buttonContainer.appendChild(recoveryBtn);
                 li.appendChild(timeAndDate);
                 li.appendChild(liContent);
                 li.appendChild(buttonContainer);
                 
                 archivedResult.appendChild(li);
   //Final deletion of the task
    deleteBtn.addEventListener('click', (e) => {
      const index = archivedTasksArr.indexOf(message);
      li.remove();
      removeTasks(index, array)
});
  //Task recovery event listener
    recoveryBtn.addEventListener('click', (e) => {
      const index = archivedTasksArr.indexOf(message);
      li.remove();
      message.priority = 2;
      recovery(inputArray, message);
      removeTasks(index, array);
      addRemoveTasks(inputArray);
  });
});
}
