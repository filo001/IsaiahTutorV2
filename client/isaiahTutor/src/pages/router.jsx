import { RouterProvider, createBrowserRouter, Outlet} from "react-router-dom"
import Home from "./home"

function Router() {
    // add layout?

    const BrowserRoutes = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        }
    ])

    return (
        <RouterProvider router={BrowserRoutes}/>
    )
}

export default Router