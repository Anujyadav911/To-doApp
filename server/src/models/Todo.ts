import { Schema, model, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    // Remap _id → id and strip __v so the client never has to know about Mongo internals
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, unknown>) => {
        ret['id'] = String(ret['_id']);
        const { _id: _removed1, __v: _removed2, ...rest } = ret;
        void _removed1;
        void _removed2;
        return rest;
      },
    },
  }
);

export default model<ITodo>('Todo', TodoSchema);
