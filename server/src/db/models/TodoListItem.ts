import { Schema, model, Document, Types } from 'mongoose';

export interface TodoListItemDocument extends Document {
    userId: Types.ObjectId;
    todoListId: Types.ObjectId;
    name: string;
    description: string;
    changedAt: Date;
    createdAt: Date;
    deletedAt: Date;
};

const TodoListItemSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            required: true,
            ref: 'User'
        },
        todoListId: {
            type: Types.ObjectId,
            required: true,
            ref: 'TodoList'
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        changedAt: {
            type: Date,
            default: Date.now
        },
        deletedAt: {
            type: Date
        },
    },
    {
        collection: 'todoListItems'
    }
);

TodoListItemSchema.index({ todoListId: 1, _id: 1 }, { unique: true });

export const TodoListItem = model<TodoListItemDocument>('TodoListItem', TodoListItemSchema);