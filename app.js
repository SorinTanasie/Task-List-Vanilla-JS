const form =  document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn =  document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const label = document.querySelector('#task-label');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',removeAllTasks);
    filter.addEventListener('keyup', filterTasks);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach( task => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
    
        const link = document.createElement('a');
        link.className='delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"> </i>';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}


function addTask(e) {


    if(taskInput.value === '') {
        label.innerText = 'Insert a task';
        label.style.color = 'red';
    }else{

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"> </i>';
    li.appendChild(link);
    taskList.appendChild(li);
    
    storeTaskInLocalStorage(taskInput.value);

    

    // Reset Styles
    label.innerText = 'New Task';
    label.style.color = '#9e9e9e';
    label.classList.remove('active');
    taskInput.value = '';


    }

    
    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    console.log(task)
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function removeTaskFromLocalStorage (taskItem){
    console.log('a intrat')
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    console.log(tasks)

    tasks.forEach((task,index) =>{
        if(taskItem.textContent.trim() === task.trim()){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeAllTasks(){
    //Clear from UI
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //Clear from Local Storage
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach( item =>{
        item.innerText.toLowerCase().includes(text) == 1 ? item.style.display= 'block' : item.style.display= 'none';
    })
}