import { Schema, model, Document, Types } from 'mongoose';

export interface TodoListDocument extends Document {
    userId: Types.ObjectId;
    name: string;
    color: string;
    changedAt: Date;
    createdAt: Date;
    deletedAt: Date | null;
};

const TodoListSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        color: {
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
        collection: 'todoLists'
    }
);

TodoListSchema.index({ userId: 1 });

export const TodoList = model<TodoListDocument>('TodoList', TodoListSchema);