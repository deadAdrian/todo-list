import { Edit, Trash } from 'lucide-react'
import { Button } from '../ui/pixelact-ui/button'
import { Card } from '../ui/pixelact-ui/card'
import { Checkbox } from '../ui/pixelact-ui/checkbox'
import { Label } from '../ui/pixelact-ui/label'
import { CreateUpdateTodoItemDialog } from './create-update-todo-item-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '@/services/todo-api'
import { todoQueryOptions } from '@/services/todo-queries'

interface Props {
  id: number
  name: string
  isComplete: boolean
}

export function TodoItem(props: Props) {
  const queryClient = useQueryClient()

  const updateTodoMutation = useMutation({
    mutationFn: ({
      id,
      mutateIsComplete,
    }: {
      id: number
      mutateIsComplete?: boolean
    }) =>
      todoApi.updateTodo({
        id,
        isComplete: mutateIsComplete,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryOptions.queryKey })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => todoApi.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryOptions.queryKey })
    },
  })

  return (
    <Card
      key={props.id}
      className="flex-row items-center p-5 cursor-pointer flex-none"
      onClick={() => {
        updateTodoMutation.mutate({
          id: props.id,
          mutateIsComplete: !props.isComplete,
        })
      }}
    >
      <Checkbox
        id={`checkbox-${props.id}`}
        className="cursor-pointer"
        checked={props.isComplete}
      />
      <Label
        htmlFor={`checkbox-${props.id}`}
        className="mb-0 w-full cursor-pointer text-xs"
        style={{
          marginTop: '3px',
        }}
      >
        {props.name}
      </Label>
      <div className="flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
        <CreateUpdateTodoItemDialog
          todo={{
            id: props.id,
            name: props.name,
            isComplete: props.isComplete,
          }}
        >
          <Button>
            <Edit />
          </Button>
        </CreateUpdateTodoItemDialog>

        <Button
          onClick={(e) => {
            deleteTodoMutation.mutate(props.id)
          }}
        >
          <Trash />
        </Button>
      </div>
    </Card>
  )
}
