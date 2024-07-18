import { TodoList, TodoListDocument } from '@db/models/TodoList';
import { TodoListItem, TodoListItemDocument } from '@db/models/TodoListItem';
import { ObjectId } from 'mongodb';

interface getAllParams {
    userId: string;
}

interface getTodoListParams {
    userId: string;
    todoListId: string;
}

interface createTodoListParams {
    userId: string;
}

interface updateTodoListParams {
    userId: string;
}

interface removeTodoListParams {
    userId: string;
}


class TodoListService {
    async getAll({ userId }: getAllParams): Promise<TodoListDocument[]> {
        const todoLists = await TodoList.find({ userId, deletedAt: { $exists: false } }).sort({ createdAt: -1 })
        return todoLists;
    }
 
    async getTodoList({ userId, todoListId }: getTodoListParams) {
        // const todoList = await TodoList.findOne({ _id: todoListId, userId });
        // const todoListItems = await TodoListItem.find({ todoListId });

        // return { todoList, todoListItems };
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