'use strict'

const todos = getSavedTodos()
const filters = {
    searchText: '',
    hideCompleted: false
}
renderTodos(todos,filters)
document.querySelector('#filter-todo').addEventListener('input' ,(e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})
document.querySelector('#new-todo').addEventListener('submit' ,(e) => {
    e.preventDefault()
    let name = e.target.elements.itemContent.value
    name = name.trim()
    if(name.length > 0){
        todos.push({
            text: name,
            completed: false,
            id: uuidv4()
        })
        saveTodos(todos)
        renderTodos(todos, filters)
        e.target.elements.itemContent.value = ''
    }
    
})
document.querySelector('#hide-completed').addEventListener('change',(e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos,filters)
})