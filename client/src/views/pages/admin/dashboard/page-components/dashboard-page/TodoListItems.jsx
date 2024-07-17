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
    Edit as EditIcon,
    Delete as DeleteIcon,
    Save as SaveIcon
} from '@mui/icons-material/';

import {
    getTodoListItems,
    createTodoListItem,
    removeTodoListItem
} from '@api/todo';


export default function TodoListItems({ selectedTodoList }) {
    const [todoListItemName, setTodoListItemName] = useState('');
    const [todoListItems, setTodoListItems] = useState([]);
    const [requestInProgress, setRequestInProgress] = useState(false);

    useEffect(() => {
        const handleGetTodoListItems = async () => {
            try {
                const res = await getTodoListItems();
                setTodoListItems(res.data);
            }
            catch (err) {
                console.error('Error getting todo lists', err);
            }
            finally {
            }
        };

        handleGetTodoListItems();
    }, []);

        const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const data = new FormData(e.currentTarget);

        if (!data.get('name').length) return;

        const name = data.get('name').trim();

        setRequestInProgress(true);

        try {
            const res = await createTodoListItem({ name });
            setTodoListItems(prevVal => [res.data, ...prevVal]);
            setTodoListItemName('');
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
            const res = await removeTodoListItem(listId);
            setTodoListItems(prevVal => prevVal.filter(x => x._id !== listId));
        }
        catch (err) {
            console.error('Error removing todo lists', err);
        }
        finally {
        }
    };

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit}>
                <TextField
                    value={todoListItemName}
                    onChange={e => setTodoListItemName(e.target.value)}
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
                {todoListItems.map((listItem, index) => {
                    const listItemId = `list-${listItem._id}`;

                    return (
                        <ListItem
                            key={listItemId}
                            disablePadding
                            secondaryAction={
                                <IconButton onClick={() => handleRemoveList(listItem._id)} color="error">
                                    <DeleteTwoToneIcon />
                                </IconButton>
                            }
                        >
                            <ListItemButton>
                                <ListItemText id={listItemId} primary={listItem.name} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
                {!todoListItems.length &&
                    <Typography mt={1} variant="body1" textAlign="center">
                        No lists found
                    </Typography>
                }
            </List>
        </>
    );
}