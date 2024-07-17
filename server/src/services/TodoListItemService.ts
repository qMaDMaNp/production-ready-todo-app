import { TodoListItem, TodoListItemDocument } from '@db/models/TodoListItem';

class TodoListItemService {
    async getAll(userId: string, todoListId: string): Promise<TodoListItemDocument[]> {
        const todoListItems = await TodoListItem.find({ userId, todoListId, deletedAt: { $exists: false } }).sort({ createdAt: -1 });
        return todoListItems;
    }

    async getTodoListItem(todoListItemId: string) {
        const todoListItem = await TodoListItem.findOne({ _id: todoListItemId });
        return todoListItem;
    }

    async createTodoListItem(name: string, userId: string, color: string): Promise<TodoListItemDocument> {
        const todoList = await TodoListItem.create({ name, userId, color });
        return todoList;
    }

    async updateTodoListItem(todoListItemId: string, name: string, color: string): Promise<TodoListItemDocument> {
        const todoList = await TodoListItem.findOneAndUpdate(
            { _id: todoListItemId },
            { name, color },
            { new: true }
        );

        return todoList;
    }

    async removeTodoListItem(todoListItemId: string): Promise<TodoListItemDocument> {
        const todoList = await TodoListItem.findOneAndUpdate(
            { _id: todoListItemId },
            {
                $set: {
                    changedAt: Date.now(),
                    deletedAt: Date.now()
                }
            },
            { new: true }
        );

        await TodoListItem.updateMany(
            { todoListItemId },
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

export default new TodoListItemService();