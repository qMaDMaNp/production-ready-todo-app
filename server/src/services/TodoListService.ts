import { TodoList, TodoListDocument } from '@db/models/TodoList';
import { TodoListItem, TodoListItemDocument } from '@db/models/TodoListItem';

class TodoListService {
    async getAll(userId: string): Promise<TodoListDocument[]> {
        const todoLists = await TodoList.find({ userId, deletedAt: { $exists: false } }).sort({ createdAt: -1 });
        return todoLists;
    }

    async getTodoList(todoListId: string) {
        const todoList = await TodoList.findOne({ _id: todoListId });
        const todoListItems = await TodoListItem.find({ todoListId });

        return { todoList, todoListItems };
    }

    async createTodoList(name: string, userId: string, color: string): Promise<TodoListDocument> {
        const todoList = await TodoList.create({ name, userId, color });
        return todoList;
    }

    async updateTodoList(todoListId: string, name: string, color: string): Promise<TodoListDocument> {
        const todoList = await TodoList.findOneAndUpdate(
            { _id: todoListId },
            { name, color },
            { new: true }
        );

        return todoList;
    }

    async updateOrCreateTodoListItems(todoListId, symbolId, actionName): Promise<TodoListItemDocument> {
        let todoListItem = null;

        const actions = {
            add: async () => {
                todoListItem = await TodoListItem.findOneAndUpdate(
                    { todoListId, symbolId },
                    {
                        $set: {
                            changedAt: Date.now(),
                            deletedAt: null
                        }
                    },
                    { upsert: true, new: true }
                );

                return todoListItem;
            },
            remove: async () => {
                todoListItem = await TodoListItem.updateOne(
                    { todoListId, symbolId },
                    {
                        $set: {
                            changedAt: Date.now(),
                            deletedAt: Date.now()
                        }
                    },
                    { new: true }
                );

                return todoListItem;
            }
        }

        if (!actions[actionName]) return todoListItem;

        await actions[actionName]();

        return todoListItem;
    }

    async removeTodoList(todoListId: string): Promise<TodoListDocument> {
        const todoList = await TodoList.findOneAndUpdate(
            { _id: todoListId },
            {
                $set: {
                    changedAt: Date.now(),
                    deletedAt: Date.now()
                }
            },
            { new: true }
        );

        await TodoListItem.updateMany(
            { todoListId },
            {
                $set: {
                    changedAt: Date.now(),
                    deletedAt: Date.now()
                }
            },
            { new: true }
        );

        return todoList;
    }
}

export default new TodoListService();