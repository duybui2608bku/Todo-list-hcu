export interface GetAllTodoResponse {
  id: string
  task: string
  isCompleted: boolean
}

export type AddTaskRequest = GetAllTodoResponse

export type UpdateTaskRequest = GetAllTodoResponse
