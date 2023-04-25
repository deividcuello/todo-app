const taskList = document.querySelector('#task-list');
const inputForm = document.querySelector('#input-form');
const submitBtn = document.querySelector('#submit-btn');

let style = true;

getLocal();

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(inputForm.value.trim() != ''){
        const li = document.createElement("li");
        const span = document.createElement("span");
        const div = document.createElement("div");
        const completeBtn = document.createElement("button");
        completeBtn.textContent = 'Complete';
        const updateBtn = document.createElement("button");
        updateBtn.textContent = 'Update';
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = 'Delete';
        div.classList.add('d-flex')
        updateBtn.classList.add('update-btn', 'p-2', 'rounded', 'text-light');
        completeBtn.classList.add('complete-btn', 'p-2', 'rounded', 'text-light');
        deleteBtn.classList.add('delete-btn', 'p-2', 'rounded', 'text-light');
        
        span.textContent = inputForm.value.trim();
    
        taskList.prepend(li);
        li.appendChild(span);
        li.appendChild(div);
        div.appendChild(completeBtn);
        div.appendChild(updateBtn);
        div.appendChild(deleteBtn);

        completeBtn.addEventListener('click', (e) => {
            const task = e.target.parentElement.parentElement.firstChild;
            task.classList.toggle('completed');
         })
         
        updateBtn.addEventListener('click', (e) => {
            const task = e.target.parentElement.parentElement.firstChild;
            task.toggleAttribute('contenteditable');
            task.style.backgroundColor = style ? 'var(--light-gray)' : 'transparent';
            style = !style;
         })
            
        deleteBtn.addEventListener('click', (e) => {
            const task = e.target.parentElement.parentElement;
            task.remove();
            saveLocal(task.firstChild.textContent)
         })
    
        inputForm.value = '';

        saveLocal();

    } else{
        alert('Introduzca una tarea');
    }
})

function saveLocal(deleted_task, update = false){
    console.log(update)
    let mytasks = Array.from(document.querySelectorAll('#task-list span'));
    mytasks = (mytasks).map(task => {
        return task.textContent;
    })
    mytasks = mytasks.filter(task => {
        return task != deleted_task});
    localStorage.setItem('todos', JSON.stringify(mytasks));
}

function getLocal(){
    const mytasks = JSON.parse(localStorage.getItem("todos"));

    if(mytasks == null){
        return
    }

    mytasks.reverse().forEach((task) => {
        
        const li = document.createElement("li");
        const span = document.createElement("span");
        const div = document.createElement("div");
        const completeBtn = document.createElement("button");
        completeBtn.textContent = 'Complete';
        const updateBtn = document.createElement("button");
        updateBtn.textContent = 'Update';
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = 'Delete';
        div.classList.add('d-flex')
        updateBtn.classList.add('update-btn', 'p-2', 'rounded', 'text-light');
        completeBtn.classList.add('complete-btn', 'p-2', 'rounded', 'text-light');
        deleteBtn.classList.add('delete-btn', 'p-2', 'rounded', 'text-light');
        
        span.textContent = task;
    
        taskList.prepend(li);
        li.appendChild(span);
        li.appendChild(div);
        div.appendChild(completeBtn);
        div.appendChild(updateBtn);
        div.appendChild(deleteBtn);

        completeBtn.addEventListener('click', (e) => {
            const task = e.target.parentElement.parentElement.firstChild;
            task.classList.toggle('completed');
         })
         
        updateBtn.addEventListener('click', (e) => {
            const task = e.target.parentElement.parentElement.firstChild;
            task.toggleAttribute('contenteditable');
            task.style.backgroundColor = style ? 'var(--light-gray)' : 'transparent';
            style = !style;
            console.log(task.style.backgroundColor == 'transparent')
            if(task.style.backgroundColor == 'transparent'){
                saveLocal()
            }
         })
            
        deleteBtn.addEventListener('click', (e) => {
            const task = e.target.parentElement.parentElement;
            saveLocal(task.firstChild.textContent)
            task.remove();
         })
    })
}
