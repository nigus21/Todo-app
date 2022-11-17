const todoInput = document.querySelector(".todo-input")
const todoBtn = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filteroption = document.querySelector('.filter-todo')


let todoDiv
let errormsg

document.addEventListener('DOMContentLoaded',getTodos)
todoBtn.addEventListener('click', addTodo)
filteroption.addEventListener('click', filterTodo)


function addTodo(event) {

    event.preventDefault();

    // if (todoInput.value == '') {
    //     todoList.innerHTML = `please enter a task to accomplish`, 1000;
    //     console.log(todoList.innerHTML)
    //     const removeError = () => {
    //         todoList.remove()
    //     }
    //     settime =setTimeout(removeError,1000) 
    // }

     
        // todoList.innerHTML = '';
        todoDiv = document.createElement('div')
        todoDiv.classList.add("todo")

        //create list
        const newTodo = document.createElement('li')
        newTodo.classList.add('todo-item')
        newTodo.innerHTML = todoInput.value;
        // localStorage.setItem('$', todoInput.value);
        // newTodo.innerHTML = localStorage.getItem('$');
        todoDiv.appendChild(newTodo);

        //local storage
        saveLocalTodo(todoInput.value)
        //creat completed button
        const completedBtn = document.createElement('button')
        completedBtn.classList.add('completedBtn')
        completedBtn.innerHTML = '<i class="fas fa-check"></i>'
        todoDiv.appendChild(completedBtn)

        completedBtn.addEventListener('click', completeTask)

        //create delete btn
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('deleteBtn')
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
        todoDiv.appendChild(deleteBtn)

        deleteBtn.addEventListener('click', deleteTask)
        todoList.appendChild(todoDiv)


        todoInput.value = ""
    
}


 
let item

//function to delete a task
const deleteTask = (event) => {
    item = event.target;
    const delItem = item.parentElement
    delItem.classList.add('movedown')
    delItem.addEventListener('transitionend', () => {
        console.log("hii")
        delItem.remove();
    })
}

//function to complete a task
const completeTask = (event) => {
    item = event.target;
    const fadeItem = item.parentElement
    fadeItem.classList.toggle("completed")
}


function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (event.target.value) {
            case "all":
                todo.style.display = 'flex'
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none'
                }
                break;
            case "uncompleted":
                if (!(todo.classList.contains('completed'))) {
                    todo.style.display = 'flex'
                }
                else {
                    todo.style.display = 'none'
                }
                break;
        }
    })
}

function saveLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
    todos= [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos))

}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
    todos= [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(todo=>{

          // todoList.innerHTML = '';
          todoDiv = document.createElement('div')
          todoDiv.classList.add("todo")
  
          //create list
          const newTodo = document.createElement('li')
          newTodo.classList.add('todo-item')
          newTodo.innerHTML = todo;
          todoDiv.appendChild(newTodo);
  
          //creat completed button
          const completedBtn = document.createElement('button')
          completedBtn.classList.add('completedBtn')
          completedBtn.innerHTML = '<i class="fas fa-check"></i>'
          todoDiv.appendChild(completedBtn)
  
          completedBtn.addEventListener('click', completeTask)
  
          //create delete btn
          const deleteBtn = document.createElement('button')
          deleteBtn.classList.add('deleteBtn')
          deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
          todoDiv.appendChild(deleteBtn)
  
          deleteBtn.addEventListener('click', deleteTask)
          todoList.appendChild(todoDiv)
  
  
          todoInput.value = ""
    })  
}