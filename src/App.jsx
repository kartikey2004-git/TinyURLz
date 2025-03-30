import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layouts/App.layout"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import Auth from "./pages/Auth"
import Link from "./pages/Link"
import RedirectLinkPage from "./pages/RedirectLinkPage"

import RequireAuth from "./components/Require-auth"
import UrlProvider from "./Context"

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:"/dashboard",
        element:<RequireAuth>
          <Dashboard/>
        </RequireAuth>
      },
      {
        path:"/auth",
        element:<Auth/>
      },
      {
        path:"/link/:id",
        element:<RequireAuth>
          <Link/>
        </RequireAuth>
      },
      {
        path:"/:id",
        element:<RedirectLinkPage/>
      }
    ]
  }
])

const App = () => {
  return (
    <UrlProvider>
      <RouterProvider router={router}/>
    </UrlProvider>
  )
}

export default App