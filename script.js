const inputBox = document.getElementById("inputBox");
const liContainer = document.getElementById("listContainer");
const listCon = document.getElementById("list");


function addTask(){
    const task = inputBox.value.trim();
    const div = document.createElement("div");
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const hour = currentDate.getHours();
    const min = currentDate.getMinutes();
    const sec = currentDate.getSeconds();

    if(!task){
        alert("Enter a task!");
        return;
    }
    div.innerHTML = `
        <div class="container">
            <div class="task">
                <div>
                    <input type="checkbox">
                </div>
                <div>
                    <span>${task}</span>
                </div>
            </div>
            <div class="date">${day}/${month}/${year} ${hour}:${min}:${sec}</div>
            <div class="delete">Delete</div>
            <div class="edit">Edit</div>
        </div>
    `;
    listCon.appendChild(div);

    const checkbox = div.querySelector("input");
    const editButton = div.querySelector(".edit");
    const deleteButton = div.querySelector(".delete");
    const taskSpan = div.querySelector("span");

    checkbox.addEventListener("click", () => {
        div.classList.toggle("completed", checkbox.checked);
        div.classList.remove("incomplete");
        updateCounters();
    });

    editButton.addEventListener("click", () => {
        const update = prompt("Edit task: ", taskSpan.textContent);
        if(update !== null){
            taskSpan.textContent = update;
            div.classList.remove("completed");
            div.classList.add("incomplete");
            checkbox.checked = false;
            updateCounters();
        }
    });
    
    const del = document.querySelector("#deleteAll");
    del.addEventListener("click", () => {
        if(confirm("Are you sure you want to delete All tasks?")){
            document.querySelectorAll(".completed, .incomplete").forEach(element => {
                element.remove();
            });
            updateCounters();
        } 
    });

    deleteButton.addEventListener("click", () => {
        if(confirm("Are you sure you want to delete this task?")){
            div.remove();
            updateCounters();
        }
    });
    div.classList.add("incomplete");
    updateCounters();
    inputBox.value = "";

}


const completedCounter = document.getElementById("completedCounter");
const incompletedCounter = document.getElementById("incompletedCounter");

function updateCounters(){
    const completedTasks = document.querySelectorAll(".completed").length;
    const incompletedTasks = document.querySelectorAll(".incomplete").length;
    completedCounter.textContent = completedTasks;
    incompletedCounter.textContent = incompletedTasks;
}
