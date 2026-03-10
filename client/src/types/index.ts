export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTodoDto {
  title: string;
  description: string;
  completed?: boolean;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
}
