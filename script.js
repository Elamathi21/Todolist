let tasks=JSON.parse(localStorage.getItem('tasks')) || [];
        let btn = document.getElementById("addbtn");
        let resultelement = document.getElementById("result");
        rendertask();
              btn.addEventListener('click', () => {
            let textelement = document.getElementById("text").value;
        if (textelement.trim() === "") {
            alert("Please enter a valid task!");
        } else {
            tasks.push({ text: textelement, isCompleted: false });
            document.getElementById("text").value = ""; // Clear input field
            rendertask(); // Render updated tasks
            localStorage.setItem('tasks',JSON.stringify(tasks))
        }
    });

    function rendertask() {
    resultelement.innerHTML = ""; // Clear existing content
    tasks.forEach((item, index) => {
        let divelement = document.createElement("div");
        divelement.className = "task-item";
            divelement.innerHTML = `
    <input type="checkbox" ${item.isCompleted ? 'checked' : ''} data-index="${index}">
    <h1 style="text-decoration: ${item.isCompleted ? 'line-through' : 'none'}; text-decoration-color: black;">
        ${item.text}
    </h1>
    <button class="edit" data-index="${index}">Edit</button>
    <button class="delete" data-index="${index}">Delete</button>
`;
        // Attach delete button event listener
        divelement.querySelector('.delete').addEventListener('click', function() {
            deletetask(this.getAttribute("data-index"));
        });

        // Attach checkbox event listener
        divelement.querySelector('input').addEventListener('change', function() {
            markComplete(this.getAttribute("data-index"));
        });
        divelement.querySelector('.edit').addEventListener('click', function() {
            edittask(this.getAttribute("data-index"));
        });


        resultelement.appendChild(divelement);
    });
}

           

        function deletetask(index) {
            if(confirm("Are you sure you want to delete this task?")){
            tasks.splice(index, 1);
            rendertask();
            localStorage.setItem('tasks',JSON.stringify(tasks))
        }
    }
        function markComplete(index) {
            tasks[index].isCompleted = !tasks[index].isCompleted;
            rendertask();
            localStorage.setItem('tasks',JSON.stringify(tasks))
        }
        function edittask(index) {
    const newTaskText = prompt("Edit your task:", tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index].text = newTaskText.trim();
        rendertask();
    } else if (newTaskText === "") {
        alert("Task cannot be empty!");
    }
    localStorage.setItem('tasks',JSON.stringify(tasks))
}