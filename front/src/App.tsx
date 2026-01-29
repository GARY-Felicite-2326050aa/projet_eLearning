import {type RouteObject, useRoutes} from 'react-router-dom'
import routes from 'virtual:generated-pages-react'
import RootLayout from './features/layout/components/_layout'

function withLayout(routes: RouteObject[]) {
  return [
    {
      element: <RootLayout />,
      children: routes,
    },
  ]
}

export default function App() {
  return useRoutes(withLayout(routes))
}