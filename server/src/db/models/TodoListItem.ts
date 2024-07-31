import { Schema, model, Document, Types } from 'mongoose';

export interface TodoListItemDocument extends Document {
    todoListId: Types.ObjectId;
    name: string;
    description: string;
    changedAt: Date;
    createdAt: Date;
    deletedAt: Date | null;
};

const TodoListItemSchema = new Schema(
    {
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
            type: String,
            default: ''
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
            type: Date,
            default: null
        },
    },
    {
        collection: 'todoListItems'
    }
);

TodoListItemSchema.index({ todoListId: 1 });

export const TodoListItem = model<TodoListItemDocument>('TodoListItem', TodoListItemSchema);