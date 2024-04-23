import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
    BrowserRouter,
    createBrowserRouter,
} from "react-router-dom";

import ErrorPage from './ErrorPage.tsx';
import { NewSupplierForm } from './components/NewSupplierForm/NewSupplierForm.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import SuppliersBrowsing from './components/SuppliersBrowsing/SuppliersBrowsing.tsx';
import { EditSupplierForm } from './components/EditSupplierForm/EditSupplierForm.tsx';
import { Login } from './components/Login/Login.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/suppliers",
                element: <SuppliersBrowsing/>
            },
            {
                path: "/new-supplier",
                element: <NewSupplierForm/>
            },
            {
                path: "/edit-supplier",
                element: <EditSupplierForm/>
            },
        ],
    },
    {
        path: "/login",
        element: <Login/>
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <App/>
            </BrowserRouter>
            {/* <RouterProvider router={router} /> */}
        </ThemeProvider>
    </React.StrictMode>,
)
