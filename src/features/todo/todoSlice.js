import { createSlice, nanoid } from '@reduxjs/toolkit';

const loadTodosFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('todos');
        return serializedState ? JSON.parse(serializedState) : [];
    } catch (e) {
        console.warn("Could not load todos from local storage", e);
        return [];
    }
};

const saveTodosToLocalStorage = (todos) => {
    try {
        const serializedState = JSON.stringify(todos);
        localStorage.setItem('todos', serializedState);
    } catch (e) {
        console.warn("Could not save todos to local storage", e);
    }
};

const initialState = {
    todos: loadTodosFromLocalStorage()
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo);
            saveTodosToLocalStorage(state.todos);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            saveTodosToLocalStorage(state.todos);
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.text = text;
                saveTodosToLocalStorage(state.todos);
            }
        }
    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;
