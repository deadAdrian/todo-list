import { todoQueryOptions } from '#/services/todo-queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ListTodo, Plus } from 'lucide-react'
import { Button } from '../ui/pixelact-ui/button'
import { Card } from '../ui/pixelact-ui/card'
import { CreateUpdateTodoItemDialog } from './create-update-todo-item-dialog'
import { TodoItem } from './todo-item'

export function TodoListContainer() {
  const { data: todos } = useSuspenseQuery(todoQueryOptions)
  return (
    <section
      style={{
        maxWidth: '600px',
      }}
      className="flex flex-col justify-center w-full h-full min-h-0"
    >
      <div className="flex flex-col gap-3 overflow-auto min-h-0 relative py-3 px-3 custom-scrollbar scroll-fade-edges">
        {todos.length === 0 ? (
          <Card className="flex-col items-center justify-center p-8 text-center gap-3 my-auto">
            <ListTodo className="w-8 h-8 text-primary" />
            <h3 className="text-xs sm:text-sm font-bold">No tasks yet!</h3>
            <p className="text-xs text-muted-foreground max-w-xs">
              Your todo list is currently empty. Click the plus button below to
              add your first task!
            </p>
          </Card>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              name={todo.name}
              isComplete={todo.isComplete}
            />
          ))
        )}
      </div>
      <div className="flex justify-center py-2 flex-none">
        <CreateUpdateTodoItemDialog>
          <Button>
            <Plus />
          </Button>
        </CreateUpdateTodoItemDialog>
      </div>
    </section>
  )
}
