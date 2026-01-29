import { useRoutes } from 'react-router-dom'
import routes from 'virtual:generated-pages-react'

export default function App() {
  return useRoutes(routes)
}