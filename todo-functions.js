'use strict'

//Fetch Existing Todos
const getSavedTodos = () => {
    const savedTodos = localStorage.getItem('todos')
    try{
        return savedTodos? JSON.parse(savedTodos): []
    }catch(e){
        return []
    }
}
//Remove Todo
const removeTodo = (id) => {
    const todoId = todos.findIndex((todo) => id === todo.id)
    if(todoId > -1){
        todos.splice(todoId, 1)
    }
}
//Check That a Todo is Done/UnDone
const checkTodo = (id, statue) => {
    const todo = todos.find((todo) => id === todo.id)
    if(todo){
        todo.completed = statue
    }
}
//Save Todos
const saveTodos = (todosList) => {
    localStorage.setItem('todos' , JSON.stringify(todosList))
}
//Generate Summary
const generateSummaryDOM = (todos) => {
    const notCompletedItems = todos.filter((item) => !item.completed)
    const summaryHeader = document.createElement('h2')
    if(notCompletedItems.length === 1){
        summaryHeader.textContent = `You Have ${notCompletedItems.length} Todo`
    }else {
        summaryHeader.textContent = `You Have ${notCompletedItems.length} Todos`
    }
    summaryHeader.classList.add('list-title')
    return summaryHeader
}
//Generate Todo DOM
const generateTodoDOM = (item) => {
    const todo = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoCheckbox = document.createElement('input')
    const todoText = document.createElement('span')
    const todoButton = document.createElement('button')

    //Done Checkbox
    todoCheckbox.setAttribute('type','checkbox')
    todoCheckbox.checked = item.completed
    todoCheckbox.addEventListener('change',(e) => {
        checkTodo(item.id, e.target.checked)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
    containerEl.appendChild(todoCheckbox)
    
    //Text
    todoText.textContent = item.text
    containerEl.appendChild(todoText)
   
    //Container
    todo.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todo.appendChild(containerEl)

    //Remove Button
    todoButton.textContent = 'remove'
    todoButton.classList.add('button', 'button--text')
    todo.appendChild(todoButton)
    todoButton.addEventListener('click',() => {
        removeTodo(item.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
    
    return todo
}
//Render application todos based on filters
const renderTodos = (todos, filters) => {
    const todosEl = document.querySelector('#todos')
    todosEl.innerHTML = ''
    todosEl.appendChild(generateSummaryDOM(todos))
    if(todos.length > 0){
        const filterdTodos = todos.filter((item) => {
            const searchTextMatch = item.text.toLowerCase().includes(filters.searchText.toLowerCase())
            const hideCompletedMatch = !filters.hideCompleted || !item.completed

            return searchTextMatch && hideCompletedMatch
        })
        filterdTodos.forEach((item) => {
            document.querySelector('#todos').appendChild(generateTodoDOM(item))
        })
    }else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No Todo to show'
        todosEl.appendChild(emptyMessage)
    }
    
}