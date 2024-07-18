import { TodoListItem, TodoListItemDocument } from '@db/models/TodoListItem';
import { ObjectId } from 'mongodb';

class TodoListItemService {
    async getAll(userId: string, todoListId: string): Promise<TodoListItemDocument[]> {
        console.log(userId, todoListId);
        const todoListItems = await TodoListItem.find({ todoListId, deletedAt: { $exists: false } })
            .sort({ createdAt: -1 })
            .populate('todoListId', 'userId');

        if (todoListItems.length && !todoListItems[0].todoListId.userId.equals(userId)) {
            throw 'Access denied';
        }

        return todoListItems;
    }

    async getTodoListItem(todoListItemId: string) {
        const todoListItem = await TodoListItem.findOne({ _id: todoListItemId });
        return todoListItem;
    }

    async createTodoListItem(todoListId: string, name: string, userId: string, color: string): Promise<TodoListItemDocument> {
        const todoList = await TodoListItem.create({ todoListId, name, userId, color });
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