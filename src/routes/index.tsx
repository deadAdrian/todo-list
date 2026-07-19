import { createFileRoute } from '@tanstack/react-router'
import { todoQueryOptions } from '#/services/todo-queries'
import { TodoListContainer } from '#/components/todo/todo-list-container'
import { CreateUpdateTodoItemDialog } from '#/components/todo/create-update-todo-item-dialog'

export const Route = createFileRoute('/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(todoQueryOptions)
  },
  component: TodoPage,
})

function TodoPage() {
  return (
    <main className="flex flex-col items-center justify-start gap-4 p-4 h-dvh">
      <h1 className="text-xl text-center">The Pixel Art To-do List</h1>
      <TodoListContainer />
      <CreateUpdateTodoItemDialog />
    </main>
  )
}
