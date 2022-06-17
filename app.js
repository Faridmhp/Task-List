// Doc Const
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const liCollection = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearbtn = document.querySelector('.clear-task');
const tasks = document.querySelector('.collection-item');

loadEvents();


function loadEvents(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTask);
    form.addEventListener('submit', runAddTask);
    clearbtn.addEventListener('click', runClear);
    liCollection.addEventListener('click', runRemove);
    filter.addEventListener('keyup', runFilter);
}


// Input Task
function runAddTask(e) {
    let input = taskInput.value;
    // Make Li and put it in LS
    insertLS(input);
    taskInput.value = "";
    e.preventDefault();
}
//LS 
function insertLS(text) {
    let task;
    if(localStorage.getItem('task') === null){
        task = [];
    } else {
        task = JSON.parse(localStorage.getItem('task'));
    }
    task.push(text);
    localStorage.setItem('task', JSON.stringify(task));
    liMaker(text);

}
// Creat li 
function liMaker(text) {
    let newli = document.createElement('li');
    newli.className = 'collection-item';
    newli.appendChild(document.createTextNode(text));
    let link_li = document.createElement('a');
    link_li.className = 'delete-item secondary-content';
    link_li.href = '#';
    link_li.innerHTML = '<i class="fa fa-remove"></i>';
    newli.appendChild(link_li);
    liCollection.appendChild(newli);
}


// getTask
function getTask(e){
    let task;
    if(localStorage.getItem('task') === null){
        task = [];
    } else {
        task = JSON.parse(localStorage.getItem('task'));
    }

    task.forEach(function(text){
        liMaker(text);
    })
}




// Remove Btn
function runRemove(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
        removeFromLS(e.target.parentElement.parentElement);
    }




    e.preventDefault();
}

// Remove element from LS
function removeFromLS(taskItem) {
    let task;
    if(localStorage.getItem('task') === null){
        task = [];
    } else {
        task = JSON.parse(localStorage.getItem('task'));
    }
    task.forEach(function(text, index){
        if(taskItem.textContent === text){
            task.splice(index, 1);
        }
    });
    localStorage.setItem('task', JSON.stringify(task));
}


// Filter
function runFilter(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent.toLowerCase()
        if(item.indexOf(text) != -1){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
    })

}




// Clear Btn
function runClear(e) {

    // // Easy Slow
    // liCollection.innerHTML = '';

    // Fast
    while(liCollection.firstChild) {
        liCollection.removeChild(liCollection.firstChild);
        
    }
    localStorage.clear();
    e.preventDefault();
}

