import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from './Todo'
import { todoApi } from 'src/Service/todo.services'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios'
jest.mock('src/Service/todo.services')

const mockedTodoApi = todoApi as jest.Mocked<typeof todoApi>
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

function createAxiosResponse<T>(data: T): AxiosResponse<T> {
  const config: InternalAxiosRequestConfig<any> = {
    headers: {} as AxiosRequestHeaders,
    method: 'get' as Method,
    url: '',
    data: undefined
  }

  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
    request: {}
  }
}

describe('Component Todo', () => {
  test('Hiển thị danh sách tasks', async () => {
    const queryClient = createTestQueryClient()
    mockedTodoApi.getAllTasks.mockResolvedValueOnce(
      createAxiosResponse([
        { id: '1', task: 'Task 1', isCompleted: false },
        { id: '2', task: 'Task 2', isCompleted: true }
      ])
    )

    render(
      <QueryClientProvider client={queryClient}>
        <Todo />
      </QueryClientProvider>
    )
    expect(await screen.findByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })
  test('Thêm một task mới', async () => {
    const queryClient = createTestQueryClient()

    mockedTodoApi.getAllTasks.mockResolvedValueOnce(createAxiosResponse([]))
    mockedTodoApi.addTask.mockResolvedValueOnce(createAxiosResponse({ id: '3', task: 'New Task', isCompleted: false }))
    mockedTodoApi.getAllTasks.mockResolvedValueOnce(
      createAxiosResponse([{ id: '3', task: 'New Task', isCompleted: false }])
    )
    render(
      <QueryClientProvider client={queryClient}>
        <Todo />
      </QueryClientProvider>
    )
    const input = screen.getByPlaceholderText('Add a task')
    const addButton = screen.getByText('Add')
    fireEvent.change(input, { target: { value: 'New Task' } })
    fireEvent.click(addButton)
    expect(await screen.findByText('New Task')).toBeInTheDocument()
  })

  test('Xóa một task', async () => {
    const queryClient = createTestQueryClient()
    mockedTodoApi.getAllTasks.mockResolvedValueOnce(
      createAxiosResponse([{ id: '1', task: 'Task to delete', isCompleted: false }])
    )
    mockedTodoApi.deleteTask.mockResolvedValueOnce(createAxiosResponse({}))
    mockedTodoApi.getAllTasks.mockResolvedValueOnce(createAxiosResponse([]))
    render(
      <QueryClientProvider client={queryClient}>
        <Todo />
      </QueryClientProvider>
    )
    expect(await screen.findByText('Task to delete')).toBeInTheDocument()
    const deleteButton = screen.getByTestId('delete-button-1')
    fireEvent.click(deleteButton)
    await waitFor(() => expect(screen.queryByText('Task to delete')).not.toBeInTheDocument())
  })
})
