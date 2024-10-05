import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { LuListTodo } from 'react-icons/lu'
import { FaTrashAlt } from 'react-icons/fa'

import { todoApi } from 'src/Service/todo.services'
import { queryClient } from 'src/main'
import { AddTaskRequest } from 'src/Types/todo.type'

import './Todo.scss'
import '../../Scss/Checked.scss'

interface TodoType {
  id: string
  task: string
  isCompleted: boolean
}

const formSchema = z.object({
  task: z.string().min(1, { message: 'Task is required' }),
  isCompleted: z.boolean().default(false)
})

type FormValue = z.infer<typeof formSchema>

const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: '',
      isCompleted: false
    }
  })

  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getAllTasks
  })

  useEffect(() => {
    if (data) {
      setTodos(data.data.reverse())
    }
  }, [data])

  const addTaskMutation = useMutation({
    mutationFn: (body: AddTaskRequest) => todoApi.addTask(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Add task successfully')
      reset()
    }
  })

  const deleteTaskMutation = useMutation({
    mutationFn: todoApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Delete task successfully')
    }
  })

  const updateTaskMutation = useMutation({
    mutationFn: (body: AddTaskRequest) => todoApi.updateTask(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Update task successfully')
    }
  })

  const onSubmit = (data: FormValue) => {
    const body: AddTaskRequest = { ...data, id: new Date().getTime().toString() }
    addTaskMutation.mutate(body)
  }

  const handleDeleteTask = useCallback(
    (id: string) => {
      if (window.confirm('Are you sure you want to delete this task?')) {
        deleteTaskMutation.mutate(id)
      }
    },
    [deleteTaskMutation]
  )

  const handleUpdateTask = (id: string) => {
    const todo = todos.find((todo) => todo.id === id)
    if (todo) {
      const body: AddTaskRequest = { ...todo, isCompleted: !todo.isCompleted }
      updateTaskMutation.mutate(body)
    }
  }

  const filteredTodos = useMemo(() => {
    return todos.filter((todo: TodoType) => {
      if (filter === 'all') return true
      if (filter === 'completed') return todo.isCompleted
      if (filter === 'incomplete') return !todo.isCompleted
      return true
    })
  }, [todos, filter])

  return (
    <div className='todo'>
      <div className='todo__main'>
        <div className='todo__main__title'>
          <LuListTodo size={35} />
          <span>Todo List</span>
        </div>
        <div className='todo__main__form'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('task')} className='todo__main__form__input' type='text' placeholder='Add a task' />
            <button type='submit' className='todo__main__form__button'>
              Add
            </button>
          </form>
          {errors.task && <span className='todo__main__error'>{errors.task.message}</span>}
        </div>
        <div className='todo__main__filter'>
          <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
            <option value='all'>All</option>
            <option value='completed'>Completed</option>
            <option value='incomplete'>Incomplete</option>
          </select>
        </div>
        <div className='todo__main__list-tasks'>
          {isLoading ? (
            <div>Loading...</div>
          ) : filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <div key={todo.id} className='todo__main__list-tasks__detail'>
                <div className='todo__main__list-tasks__detail__left'>
                  <label className='checkbox-cus'>
                    <input onChange={() => handleUpdateTask(todo.id)} type='checkbox' checked={todo.isCompleted} />
                    <div className='checkmark-cus'></div>
                  </label>
                  <span style={todo.isCompleted ? { textDecoration: 'line-through' } : {}}>{todo.task}</span>
                </div>
                <div className='todo__main__list-tasks__detail__right'>
                  <FaTrashAlt cursor='pointer' onClick={() => handleDeleteTask(todo.id)} />
                </div>
              </div>
            ))
          ) : (
            <div className='todo__main__list-tasks__empty'>Add tasks now!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Todo
