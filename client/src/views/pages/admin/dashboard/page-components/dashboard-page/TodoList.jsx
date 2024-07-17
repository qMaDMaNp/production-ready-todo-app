import { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    IconButton
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import {
    getTodoLists,
    createTodoList,
    removeTodoList
} from '@api/todo';

import TodoListItems from './TodoListItems';


export default function TodoList() {
    const [selectedTodoList, setSelectedTodoList] = useState(null);
    const [todoListName, setTodoListName] = useState('');
    const [todoLists, setTodoLists] = useState([]);
    const [requestInProgress, setRequestInProgress] = useState(false);

    useEffect(() => {
        const handleGetTodoLists = async () => {
            try {
                const res = await getTodoLists();
                setTodoLists(res.data);
            }
            catch (err) {
                console.error('Error getting todo lists', err);
            }
            finally {
            }
        };

        handleGetTodoLists();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const data = new FormData(e.currentTarget);

        if (!data.get('name').length) return;

        const name = data.get('name').trim();

        setRequestInProgress(true);

        try {
            const res = await createTodoList({ name });
            setTodoLists(prevVal => [res.data, ...prevVal]);
            setTodoListName('');
        }
        catch (err) {
            console.error('Error getting todo lists', err);
        }
        finally {
            setRequestInProgress(false);
        }
    };

    const handleRemoveList = async (listId) => {
        try {
            const res = await removeTodoList(listId);
            setTodoLists(prevVal => prevVal.filter(x => x._id !== listId));
        }
        catch (err) {
            console.error('Error removing todo lists', err);
        }
        finally {
        }
    };

    return (
        <>
            <Grid container justifyContent="space-between">
                <Grid item xs={3}>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <TextField
                            value={todoListName}
                            onChange={e => setTodoListName(e.target.value)}
                            name="name"
                            label="Enter Task Name..."
                            variant="outlined"
                            fullWidth
                        />

                        <LoadingButton
                            sx={{ mt: 1 }}
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            loading={requestInProgress}
                        >
                            Create New List
                        </LoadingButton>
                    </Box>

                    <List sx={{ mt: 1, width: '100%', bgcolor: 'background.paper' }}>
                        {todoLists.map((list, index) => {
                            const listId = `list-${list._id}`;

                            return (
                                <ListItem
                                    key={listId}
                                    secondaryAction={
                                        <IconButton onClick={() => handleRemoveList(list._id)} color="error">
                                            <DeleteTwoToneIcon />
                                        </IconButton>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton onClick={() => setSelectedTodoList(list)}>
                                        <ListItemText id={listId} primary={list.name} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                        {!todoLists.length &&
                            <Typography mt={1} variant="body1" textAlign="center">
                                No lists found
                            </Typography>
                        }
                    </List>
                </Grid>

                {selectedTodoList &&
                    <Grid item xs={6}>
                        <TodoListItems {...{ selectedTodoList }} />
                    </Grid>
                }
            </Grid>
        </>
    );
}
