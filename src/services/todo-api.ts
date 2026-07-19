import type { CreateTodo, Todo, UpsertTodo } from '@/types/todo'

const rawUrl =
  ((import.meta.env.VITE_API_BASE_URL as string | undefined) ||
    process.env.API_BASE_URL) ??
  ''

const baseApiUrl =
  rawUrl.startsWith('http://') || rawUrl.startsWith('https://')
    ? rawUrl
    : `http://${rawUrl}`

export const todoApi = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await fetch(`${baseApiUrl}/TodoItems`)
    if (!response.ok)
      throw new Error(
        "It wasn't possible to get your to-do items, try again later.",
      )
    return response.json()
  },
  getTodo: async (id: string): Promise<Todo> => {
    const response = await fetch(`${baseApiUrl}/TodoItems/${id}`)
    if (!response.ok)
      throw new Error(
        "It wasn't possible to get your to-do item, try again later.",
      )
    return response.json()
  },
  createTodo: async (body: CreateTodo): Promise<Todo> => {
    const response = await fetch(`${baseApiUrl}/TodoItems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!response.ok)
      throw new Error(
        "It wasn't possible to create your to-do item, try again later.",
      )
    return response.json()
  },
  updateTodo: async (body: UpsertTodo): Promise<unknown> => {
    const response = await fetch(`${baseApiUrl}/TodoItems/${body.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!response.ok)
      throw new Error(
        "It wasn't possible to update your to-do item, try again later.",
      )
    if (response.status === 204) return null
    const text = await response.text()
    return text ? JSON.parse(text) : null
  },
  deleteTodo: async (id: number): Promise<unknown> => {
    const response = await fetch(`${baseApiUrl}/TodoItems/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok)
      throw new Error(
        "It wasn't possible to delete your to-do item, try again later.",
      )
    if (response.status === 204) return null
    const text = await response.text()
    return text ? JSON.parse(text) : null
  },
}
