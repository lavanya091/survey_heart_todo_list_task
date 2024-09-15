// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Card, Button, TextField, IconButton, Typography, Box, Container } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { fetchTodos, addTodo, deleteTodo, editTodo } from './actions';

// const Todo = () => {
//   const dispatch = useDispatch();
//   const todos = useSelector((state) => state.todos || []);
//   const [todoInput, setTodoInput] = useState('');
//   const [editTodoId, setEditTodoId] = useState(null);
//   const [editTodoValues, setEditTodoValues] = useState({});
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const loadTodos = async () => {
//       try {
//         await dispatch(fetchTodos());
//       } catch (err) {
//         setError('Failed to load todos.');
//       }
//     };
//     loadTodos();
//   }, [dispatch]);

//   const handleAddTodo = async () => {
//     if (todoInput) {
//       const newTodoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1; // Incremental ID logic
//       const newTodo = { id: newTodoId, todo: todoInput };
//       console.log('New todo added', newTodo);
//       try {
//         await dispatch(addTodo(newTodo));
//         setTodoInput('');
//       } catch (err) {
//         setError('Failed to add todo.');
//       }
//     }
//   };
  

//   const handleEditTodo = async (id) => {
//     try {
//       await dispatch(editTodo({ id, todo: editTodoValues[id] }));
//       setEditTodoId(null);
//       setEditTodoValues({ ...editTodoValues, [id]: '' });
//     } catch (err) {
//       setError('Failed to edit todo');
//     }
//   };

//   const handleDeleteTodo = async (id) => {
//     try {
//       await dispatch(deleteTodo(id));
//     } catch (err) {
//       setError('Failed to delete todo.');
//     }
//   };

//   const startEdit = (todo) => {
//     setEditTodoId(todo.id);
//     setEditTodoValues({ ...editTodoValues, [todo.id]: todo.todo });
//   };

//   return (
//     <Container 
//     maxWidth={false} // This makes the container full-width
//     style={{ 
//       marginTop: '50px', 
//       minHeight: '100vh', 
//       display: 'flex', 
//       alignItems: 'center', 
//       justifyContent: 'center',
//       padding: '0px', // Removes padding for the full-width effect
//     }}
//   >
//     <Card 
//       style={{ 
//         padding: '20px', 
//         backgroundColor: '#1e1e2f', 
//         borderRadius: '10px', 
//         width: '100%', // Full width of the container
//       }}
//     >
//       <Typography variant="h4" align="center" gutterBottom style={{ color: '#fff' }}>
//         Todo App
//       </Typography>
  
//       <Box display="flex" gap="10px" alignItems="center" style={{ marginBottom: '20px' }}>
//         <TextField
//           fullWidth
//           value={todoInput}
//           onChange={(e) => setTodoInput(e.target.value)}
//           label="Add something to your list"
//           variant="outlined"
//           style={{ backgroundColor: '#fff', borderRadius: '5px' }}
//         />
//         <Button onClick={handleAddTodo} variant="contained" color="primary" style={{ height: '55px' }}>
//           Add
//         </Button>
//       </Box>
  
//       {error && <div style={{ color: 'red' }}>{error}</div>}
  
//       <ul style={{ listStyleType: 'none', padding: 0 }}>
//         {todos.length > 0 ? (
//           todos.map((todo, index) => (
//             <li key={`${todo.id}-${todo.timestamp}`} style={{ marginBottom: '10px' }}>
//               <Card
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   padding: '10px',
//                   background: 'linear-gradient(45deg, #8a2be2, #4b0082)',
//                   borderRadius: '5px',
//                   color: '#fff',
//                   width: '100%', // Ensure the card stretches the full width
//                   marginLeft:'-10px'
//                 }}
//               >
//                 {/* Wrapper for flex layout */}
//                 <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" marginLeft="10px">
//                   <Typography variant="h6" style={{ flex: 0.1, textAlign: 'left' }}>
//                     {index+1}  {/* Add space before the number */}
//                   </Typography>
//                   <Typography variant="h6" style={{ flex: 1, paddingLeft: '10px' }}>
//                     {todo.todo}
//                   </Typography>
//                   <Box display="flex" justifyContent="flex-end" style={{ gap: '10px' }}>
//                     <IconButton onClick={() => startEdit(todo)} color="inherit">
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton onClick={() => handleDeleteTodo(todo.id)} color="inherit">
//                       <DeleteIcon />
//                     </IconButton>
//                   </Box>
//                 </Box>
//               </Card>
//             </li>
//           ))
//         ) : (
//           <li>No todos available</li>
//         )}
//       </ul>
//     </Card>
//   </Container>
  
  
//   );
// };

// export default Todo;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, TextField, IconButton, Typography, Box, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchTodos, addTodo, deleteTodo, editTodo } from './actions';

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos || []);
  const [todoInput, setTodoInput] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoValue, setEditTodoValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        await dispatch(fetchTodos());
      } catch (err) {
        setError('Failed to load todos.');
      }
    };
    loadTodos();
  }, [dispatch]);

  const handleAddTodo = async () => {
    if (todoInput) {
      const newTodoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1; // Incremental ID logic
      const newTodo = { id: newTodoId, todo: todoInput };
      try {
        await dispatch(addTodo(newTodo));
        setTodoInput('');
      } catch (err) {
        setError('Failed to add todo.');
      }
    }
  };

  const handleEditTodo = async () => {
    if (editTodoValue.trim() !== '') {
      try {
        await dispatch(editTodo({ id: editTodoId, todo: editTodoValue }));
        setEditTodoId(null);
        setEditTodoValue('');
      } catch (err) {
        setError('Failed to edit todo');
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await dispatch(deleteTodo(id));
    } catch (err) {
      setError('Failed to delete todo.');
    }
  };

  const startEdit = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoValue(todo.todo);
  };

  return (
    <Container 
      maxWidth={false}
      style={{ 
        marginTop: '50px', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0px', 
      }}
    >
      <Card 
        style={{ 
          padding: '20px', 
          backgroundColor: '#1e1e2f', 
          borderRadius: '10px', 
          width: '100%', 
        }}
      >
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#fff' }}>
          Todo App
        </Typography>

        <Box display="flex" gap="10px" alignItems="center" style={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            label="Add something to your list"
            variant="outlined"
            style={{ backgroundColor: '#fff', borderRadius: '5px' }}
          />
          <Button onClick={handleAddTodo} variant="contained" color="primary" style={{ height: '55px' }}>
            Add
          </Button>
        </Box>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <li key={${todo.id}-${todo.timestamp}} style={{ marginBottom: '10px' }}>
                <Card
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    background: 'linear-gradient(45deg, #8a2be2, #4b0082)',
                    borderRadius: '5px',
                    color: '#fff',
                    width: '100%',
                    marginLeft: '-10px'
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" marginLeft="10px">
                    <Typography variant="h6" style={{ flex: 0.1, textAlign: 'left' }}>
                      {index + 1}
                    </Typography>
                    {editTodoId === todo.id ? (
                      <TextField
                        value={editTodoValue}
                        onChange={(e) => setEditTodoValue(e.target.value)}
                        variant="outlined"
                        style={{ flex: 1, backgroundColor: '#fff', borderRadius: '5px' , border:'none' , outline:'none' }}
                      />
                    ) : (
                      <Typography variant="h6" style={{ flex: 1, paddingLeft: '10px' }}>
                        {todo.todo}
                      </Typography>
                    )}
                    <Box display="flex" justifyContent="flex-end" style={{ gap: '10px' }}>
                      {editTodoId === todo.id ? (
                        <Button onClick={handleEditTodo} variant="contained" color="primary">
                          Save
                        </Button>
                      ) : (
                        <IconButton onClick={() => startEdit(todo)} color="inherit">
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleDeleteTodo(todo.id)} color="inherit">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </li>
            ))
          ) : (
            <li>No todos available</li>
          )}
        </ul>
      </Card>
    </Container>
  );
};

export default Todo;
