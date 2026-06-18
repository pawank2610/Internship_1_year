let tasks =
JSON.parse(localStorage.getItem("tasks"))
|| [];

displayTasks();

function addTask(){

    const input =
    document.getElementById("taskInput");

    const taskText =
    input.value.trim();

    if(taskText === ""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        text:taskText,
        completed:false
    });

    saveTasks();

    input.value="";

    displayTasks();
}

function displayTasks(){

    const taskList =
    document.getElementById("taskList");

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        const li =
        document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML=
        `
        <span onclick="toggleTask(${index})">
        ${task.text}
        </span>

        <button
        class="delete-btn"
        onclick="deleteTask(${index})">
        Delete
        </button>
        `;

        taskList.appendChild(li);

    });

}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    displayTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    displayTasks();
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}