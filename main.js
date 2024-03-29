
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let arrayOfTasks = [];

if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}


getElesFromLocalStorage();

submit.onclick = submited;
function submited(){
    if(input.value !== ""){
        addTaskToArray(input.value);
        input.value = "";
    }
}

//click on task 
tasksDiv.addEventListener("click", (e) => {
    //del btn
    if(e.target.classList.contains("del")){
        // remove ele from page
        e.target.parentElement.remove();
        // remove ele from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    }
    // task ele
    if(e.target.classList.contains("task")){
        // toggle completed
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        // toggle done class
        e.target.classList.toggle("done");
    }
});

function addTaskToArray(taskText){
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrayOfTasks.push(task);

    addElesToPageFrom(arrayOfTasks);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addElesToPageFrom(arrayOfTasks){
    tasksDiv.innerHTML = "";

    let count = 1;
    arrayOfTasks.forEach(task => {

        let div = document.createElement("div");
        div.className = "task";
        if(task.completed){
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));

        div.appendChild(span);

        tasksDiv.appendChild(div);
        count++;

    });
}

function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getElesFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElesToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId){
    for(let i = 0; i < arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false;
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}

function clearAll(){
    tasksDiv.innerHTML = "";
    arrayOfTasks = [];
    window.localStorage.clear();
    console.log(arrayOfTasks);
}
input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        submited();
    }
})