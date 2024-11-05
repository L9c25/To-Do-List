// Seletores
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');


// Listeners de eventos
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);

function addToDo(event) {
    // Evita que o formulário seja enviado / Evita o recarregamento da página;
    event.preventDefault();

    // DIV do toDo;
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo');

    // Cria o LI
    const newToDo = document.createElement('li');
    if (toDoInput.value === '') {
            alert("Você Deve escrever algo!");
        } 
    else {
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // Adicionando ao armazenamento local;
        savelocal(toDoInput.value);

        // botão de check;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn');
        toDoDiv.appendChild(checked);
        // botão de deletar;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn');
        toDoDiv.appendChild(deleted);

        // Adiciona à lista;
        toDoList.appendChild(toDoDiv);

        // Limpa o campo de input;
        toDoInput.value = '';
    }

}   


function deletecheck(event){
    const item = event.target;
    // deletar
    if(item.classList[0] === 'delete-btn')
    {
        // item.parentElement.remove();
        // animação
        item.parentElement.classList.add("fall");

        // removendo do armazenamento local;
        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener('transitionend', function(){
            item.parentElement.remove();
        })
    }

    // marcar como concluído
    if(item.classList[0] === 'check-btn')
    {
        item.parentElement.classList.toggle("completed");
    }

}

// Salvando no armazenamento local:
function savelocal(todo){
    // Verifica: se há item(s) lá;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    // Verifica: se há item(s);
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        // DIV do toDo;
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo");

        // Cria o LI
        const newToDo = document.createElement('li');
        
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // botão de check;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn");
        toDoDiv.appendChild(checked);
        // botão de deletar;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn");
        toDoDiv.appendChild(deleted);

        // Adiciona à lista;
        toDoList.appendChild(toDoDiv);
    });
    // return console.log(todos);
}

function removeLocalTodos(todo){
    // Verifica: se há item(s);
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex =  todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
