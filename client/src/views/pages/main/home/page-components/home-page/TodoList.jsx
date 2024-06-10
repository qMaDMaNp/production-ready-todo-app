import { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Checkbox,
    Input
} from '@mui/material';

import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Save as SaveIcon
} from '@mui/icons-material/';


export default function TodoList() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [currentTask, setCurrentTask] = useState('');

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask('');
        }
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const toggleTaskCompletion = (index) => {
        const newTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    const editTask = (index) => {
        setIsEditing(index);
        setCurrentTask(tasks[index].text);
    };

    const saveTask = (index) => {
        const newTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: currentTask } : task
        );
        setTasks(newTasks);
        setIsEditing(null);
        setCurrentTask('');
    };

    return (
        <Box>
            <h1>To-Do List</h1>

            <TextField
                label="New Task"
                variant="outlined"
                fullWidth
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />

            <Button variant="contained" color="primary" fullWidth onClick={addTask} style={{ marginTop: 10 }}>
                Add Task
            </Button>

            <List>
                {tasks.map((task, index) => (
                    <ListItem key={index} dense>
                        <Checkbox
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(index)}
                        />
                        {isEditing === index ? (
                            <Input
                                fullWidth
                                value={currentTask}
                                onChange={(e) => setCurrentTask(e.target.value)}
                                onBlur={() => saveTask(index)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        saveTask(index);
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <ListItemText
                                primary={task.text}
                                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                            />
                        )}

                        <IconButton sx={{ mr: 1 }} edge="end" aria-label="edit" onClick={() => editTask(index)}>
                            <EditIcon />
                        </IconButton>

                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(index)}>
                            <DeleteIcon />
                        </IconButton>

                        {isEditing === index && (
                            <IconButton sx={{ ml: 1 }} edge="end" aria-label="save" onClick={() => saveTask(index)}>
                                <SaveIcon />
                            </IconButton>
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}