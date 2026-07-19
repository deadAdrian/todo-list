export interface Todo {
  id: number
  name: string
  isComplete: boolean
}

export interface UpsertTodo {
  id: number
  name?: string
  isComplete?: boolean
}

export interface CreateTodo {
  name: string
  isComplete?: boolean
}
