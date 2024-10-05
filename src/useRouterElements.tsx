import { useRoutes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout/MainLayout'
import Todo from 'src/Pages/Todo/Todo'

const useRouterElements = () => {
  const routeElemnts = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <Todo />
        </MainLayout>
      )
    }
  ])
  return routeElemnts
}

export default useRouterElements
