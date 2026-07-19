import { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/pixelact-ui/dialog'
import { Input } from '../ui/pixelact-ui/input'
import { Checkbox } from '../ui/pixelact-ui/checkbox'
import { Label } from '../ui/pixelact-ui/label'
import { Button } from '../ui/pixelact-ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '@/services/todo-api'
import { todoQueryOptions } from '@/services/todo-queries'
import type { Todo } from '@/types/todo'
import gsap from 'gsap'

interface CreateUpdateTodoItemDialogProps {
  children?: React.ReactNode
  todo?: Todo
}

export function CreateUpdateTodoItemDialog({
  children,
  todo,
}: CreateUpdateTodoItemDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(todo?.name ?? '')
  const [isComplete, setIsComplete] = useState(todo?.isComplete ?? false)
  const contentRef = useRef<HTMLDivElement>(null)

  const isEditing = !!todo

  useEffect(() => {
    if (open) {
      setName(todo?.name ?? '')
      setIsComplete(todo?.isComplete ?? false)

      requestAnimationFrame(() => {
        if (!contentRef.current) return

        gsap.fromTo(
          contentRef.current,
          {
            y: -100,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
        )
      })
    }
  }, [open, todo])

  const queryClient = useQueryClient()

  const createTodoMutation = useMutation({
    mutationFn: ({
      mutateName,
      mutateIsComplete,
    }: {
      mutateName: string
      mutateIsComplete: boolean
    }) =>
      todoApi.createTodo({
        name: mutateName,
        isComplete: mutateIsComplete,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryOptions.queryKey })
      setOpen(false)
      setName('')
      setIsComplete(false)
    },
  })

  const updateTodoMutation = useMutation({
    mutationFn: ({
      id,
      mutateName,
      mutateIsComplete,
    }: {
      id: number
      mutateName: string
      mutateIsComplete: boolean
    }) =>
      todoApi.updateTodo({
        id,
        name: mutateName,
        isComplete: mutateIsComplete,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryOptions.queryKey })
      setOpen(false)
    },
  })

  const isPending = createTodoMutation.isPending || updateTodoMutation.isPending

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    if (todo) {
      updateTodoMutation.mutate({
        id: todo.id,
        mutateName: name,
        mutateIsComplete: isComplete,
      })
    } else {
      createTodoMutation.mutate({
        mutateName: name,
        mutateIsComplete: isComplete,
      })
    }
  }

  const checkboxId = todo
    ? `edit-todo-${todo.id}-checkbox`
    : 'create-todo-item-checkbox'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <div ref={contentRef}>
          <DialogHeader className="mt-8 mb-6">
            <DialogTitle className="mb-3">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Update the details of your pixel todo item.'
                : 'Add a new item to your pixel todo list.'}
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <Input
              placeholder="task"
              value={name}
              onChange={(v) => setName(v.target.value)}
            />
            <div className="flex items-center gap-3">
              <Checkbox
                id={checkboxId}
                onClick={() => setIsComplete(!isComplete)}
                checked={isComplete}
                className="cursor-pointer"
              />
              <Label
                htmlFor={checkboxId}
                className="mb-0 cursor-pointer"
                style={{ marginTop: '2px' }}
              >
                Is completed
              </Label>
            </div>
            <DialogFooter className="mt-6">
              <Button className="w-full" type="submit" disabled={isPending}>
                {isEditing
                  ? isPending
                    ? 'Saving...'
                    : 'Save changes'
                  : isPending
                    ? 'Creating...'
                    : 'Create new task'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
