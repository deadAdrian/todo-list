import { queryOptions } from '@tanstack/react-query'
import { todoApi } from './todo-api'

export const todoQueryOptions = queryOptions({
  queryKey: ['todos'],
  queryFn: () => todoApi.getTodos(),
})
