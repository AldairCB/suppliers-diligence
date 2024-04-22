import './App.css'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import SuppliersBrowsing from './components/SuppliersBrowsing/SuppliersBrowsing'
import { Login } from './components/Login/Login'
import { NewSupplierForm } from './components/NewSupplierForm/NewSupplierForm'
import { EditSupplierForm } from './components/EditSupplierForm/EditSupplierForm'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

function App() {
    return (
        <Box className="container py-10 px-20 mx-auto">
            <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route element={<AuthOutlet fallbackPath='/login' />}>
                    <Route path="/" element={<SuppliersBrowsing />} />
                    <Route path="/new-supplier" element={<NewSupplierForm />} />
                    <Route path="/edit-supplier" element={<EditSupplierForm />} />
                </Route>
            </Routes>
        </Box>
    )
}

export default App
