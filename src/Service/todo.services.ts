import { GetAllTodoResponse, UpdateTaskRequest } from 'src/Types/todo.type'
import axiosInstance from 'src/Utils'

export const todoApi = {
  getAllTasks() {
    return axiosInstance.get<GetAllTodoResponse[]>('/')
  },
  addTask(payload: GetAllTodoResponse) {
    return axiosInstance.post<unknown>('/', payload)
  },
  deleteTask(id: string) {
    return axiosInstance.delete<unknown>(`/${id}`)
  },
  updateTask(payload: UpdateTaskRequest) {
    return axiosInstance.put<unknown>(`/${payload.id}`, payload)
  }
}
