import { Schema, model, Document, Types } from 'mongoose';

export interface TodoListDocument extends Document {
    userId: Types.ObjectId;
    name: string;
    color: string;
    changedAt: Date;
    createdAt: Date;
    deletedAt: Date;
};

const TodoListSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
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
        collection: 'todoLists'
    }
);

export const TodoList = model<TodoListDocument>('TodoList', TodoListSchema);