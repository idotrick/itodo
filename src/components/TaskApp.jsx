import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, dueDate }]);
      setNewTask('');
      setDueDate('');
    }
  };

  const handleEditTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
            Task Management App
        </Typography>
        <TextField
            label="Enter task"
            variant="outlined"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            margin="normal"
        />
        <TextField
            label="Due Date"
            type="date"
            fullWidth
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            margin="normal"
            InputLabelProps={{
            shrink: true,
            }}
        />
        <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            fullWidth
        >
            Add Task
        </Button>

        <List>
            {tasks.map((task) => (
            <ListItem key={task.id}>
                <ListItemText>
                <TextField
                    fullWidth
                    value={task.text}
                    onChange={(e) => handleEditTask(task.id, e.target.value)}
                    variant="outlined"
                />
                <Typography variant="body2" color="textSecondary">
                    Due Date: {task.dueDate}
                </Typography>
                </ListItemText>
                <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTask(task.id)}
                >
                    <DeleteIcon />
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            ))}
        </List>
    </Container>
  );
};

export default TaskApp;
