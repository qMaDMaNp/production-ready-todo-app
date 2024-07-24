import { TodoList } from '@db/models/TodoList';
import { TodoListItem, TodoListItemDocument } from '@db/models/TodoListItem';


interface getAllParams {
	userId: string;
	todoListId: string;
}

interface getOneParams {
	userId: string;
	todoListItemId: string;
}

interface createParams {
	userId: string;
	todoListId: string;
	name: string;
}

interface updateParams {
	userId: string;
	todoListItemId: string;
	name: string;
}

interface removeParams {
	userId: string;
	todoListItemId: string;
}

class TodoListItemService {
	async verifyOwner(userId: string, todoListId: string) {
		try {
			const todoList = await TodoList.findOne({ _id: todoListId, userId });

			if (!todoList) throw 'List does not exist';
			if (!todoList.userId.equals(userId)) throw 'Access denied';
		}
		catch (e) {
			throw e.message || e;
		}
	}

	async getAll({ userId, todoListId }: getAllParams): Promise<TodoListItemDocument[]> {
		await this.verifyOwner(userId, todoListId);

		const todoListItems = await TodoListItem
			.find({
				todoListId,
				deletedAt: { $exists: false }
			})
			.sort({ createdAt: -1 });


		return todoListItems;
	}

	async getOne({ userId, todoListItemId }: getOneParams) {
		const todoListItem = await TodoListItem.findOne({ _id: todoListItemId });
		await this.verifyOwner(userId, todoListItem.todoListId.toString());

		return todoListItem;
	}

	async create({ userId, todoListId, name }: createParams): Promise<TodoListItemDocument> {
		await this.verifyOwner(userId, todoListId);
		const todoList = await TodoListItem.create({ todoListId, name });
		return todoList;
	}

	async update({ userId, todoListItemId, name }: updateParams): Promise<TodoListItemDocument> {
		const todoListItem = await TodoListItem.findOne({ _id: todoListItemId });
		await this.verifyOwner(userId, todoListItem.todoListId.toString());

		Object.assign(todoListItem, {
			name
		});

		await todoListItem.save();

		return todoListItem;
	}

	async remove({ userId, todoListItemId }: removeParams): Promise<number> {
		const todoListItem = await TodoListItem.findOne({
			_id: todoListItemId,
			deletedAt: { $exists: false }
		});

		if (!todoListItem || todoListItem.deletedAt) throw 'Already removed';

		await this.verifyOwner(userId, todoListItem.todoListId.toString());

		Object.assign(todoListItem, {
			changedAt: Date.now(),
			deletedAt: Date.now()
		});

		await todoListItem.save();

		return 1;
	}
}

export default new TodoListItemService();