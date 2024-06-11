import { RouterProvider, createBrowserRouter, Outlet} from "react-router-dom"

function Router() {
    // add layout?

    const BrowserRoutes = createBrowserRouter([
        {
            path: '/',
            element: <></>
        }
    ])
}

export default Router