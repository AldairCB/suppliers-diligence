import './App.css'
import { Box } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import SuppliersBrowsing from './components/SuppliersBrowsing/SuppliersBrowsing'
import { Login } from './components/Login/Login'
import { NewSupplierForm } from './components/NewSupplierForm/NewSupplierForm'
import { EditSupplierForm } from './components/EditSupplierForm/EditSupplierForm'
import { useAuth } from './context/useAuth'
import { ReactNode } from 'react'

type ProtectedRouteProps = {
    children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useAuth();
    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};

function App() {
    return (
        <Box className="container py-10 px-20 mx-auto">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><SuppliersBrowsing /></ProtectedRoute>} />
                <Route path="/new-supplier" element={<ProtectedRoute><NewSupplierForm /></ProtectedRoute>} />
                <Route path="/edit-supplier" element={<ProtectedRoute><EditSupplierForm /></ProtectedRoute>} />
            </Routes>
        </Box>
    )
}

export default App
