import axios from 'axios';

// Action Types
export const FETCH_TODOS = 'FETCH_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO= 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await axios.get('https://dummyjson.com/todos');
    console.log(response.data);
    dispatch({ type: FETCH_TODOS, payload: response.data.todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    dispatch({ type: FETCH_TODOS, payload: [] });
  }
};

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

// Corrected editTodo function
export const editTodo = (todo) => async (dispatch) => {
  try {
    // Use JSONPlaceholder's API for PUT requests
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: EDIT_TODO,
      payload: response.data,  // Updated todo data from the API
    });
  } catch (error) {
    console.error('Error editing todo:', error);
  }
};


export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://dummyjson.com/todos/${id}`);
    dispatch({ type: DELETE_TODO, payload: id });
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};
