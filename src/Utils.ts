import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://670131c8b52042b542d7097f.mockapi.io/todolist-hcu/todolist',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance
