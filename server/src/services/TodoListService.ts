import { TodoList, TodoListDocument } from '@db/models/TodoList';
import { TodoListItem, TodoListItemDocument } from '@db/models/TodoListItem';


interface getAllParams {
  userId: string;
}

interface getOneParams {
  userId: string;
  todoListId: string;
}

interface createParams {
  userId: string;
  name: string;
  color: string;
}

interface updateParams {
  userId: string;
  todoListId: string;
  name: string;
  color: string;
}

interface removeParams {
  userId: string;
  todoListId: string;
}

class TodoListService {
  async getAll({ userId }: getAllParams): Promise<TodoListDocument[]> {
    const todoLists = await TodoList.find({ userId, deletedAt: { $exists: false } }).sort({ createdAt: -1 })
    return todoLists;
  }

  async getOne({ userId, todoListId }: getOneParams): Promise<TodoListDocument> {
    const todoList = await TodoList.findOne({ _id: todoListId, userId });
    return todoList
  }

  async create({ userId, name, color }: createParams): Promise<TodoListDocument> {
    const todoList = await TodoList.create({ userId, name, color });
    return todoList;
  }

  async update({ userId, todoListId, name, color }: updateParams): Promise<TodoListDocument> {
    const todoList = await TodoList.findOne({ _id: todoListId, userId });

    Object.assign(todoList, {
      name,
      color
    });

    await todoList.save();

    return todoList;
  }

  async remove({ userId, todoListId }: removeParams): Promise<number> {
    //TODO: when deleting a list remove all its items as well
    //and  that should be a transaction
    const todoList = await TodoList.findOne({
      _id: todoListId,
      userId,
      deletedAt: { $exists: false }
    });

    if (!todoList || todoList.deletedAt) throw 'Already removed';

    Object.assign(todoList, {
      changedAt: Date.now(),
      deletedAt: Date.now()
    });

    await todoList.save();

    return 1;
  }
}

export default new TodoListService();