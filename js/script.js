//Seleção
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//Funções
const saveTodo = (text) =>{
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todo.appendChild(deleteBtn);


    todoList.appendChild(todo);
    todoInput.value = "";
    todoInput.focus();
}

const toggleForms = () =>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) =>{
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector("h3");
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    })
}

//Eventos
todoForm.addEventListener("submit", (e) =>{
    e.preventDefault(); //Isso faz o formulário não ser enviado quando o botão for pressionado

    const inputValue = todoInput.value;

    if (inputValue) {
        //Save todo
        saveTodo(inputValue);
    }
})

document.addEventListener("click", (e) => {

    const targetElement = e.target;
    const parentElement = targetElement.closest("div"); //Seleciona o elemento pai mais próximo
    let todoTitle;

    if(parentElement && parentElement.querySelector("h3")){
        todoTitle = parentElement.querySelector("h3").innerText;
    }

    if(targetElement.classList.contains("finish-todo")){
        parentElement.classList.toggle("done");
    } else if(targetElement.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    } else if(targetElement.classList.contains("remove-todo")){
        parentElement.remove();
    }

})

cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    toggleForms();

})

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editInputValue = editInput.value; //Novo Valor

    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms();
})



