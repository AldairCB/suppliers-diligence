import { signal } from '@preact/signals-react'
import { DataTable } from '../DataTable/DataTable'
import { columns } from './columns'
import SuppliersDiligenceApi from '@/services/SuppliersDiligenceApi'
import { Button } from '../ui/button'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSignals } from '@preact/signals-react/runtime'
import { SupplierModel } from '@/models/SupplierModel'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'

// signal that able to be globally available for all the components when exporting them
export const suppliers = signal<SupplierModel[]>([])
// export const api = signal<SuppliersDiligenceApi>(new SuppliersDiligenceApi())

export default function SuppliersBrowsing() {
    // in preact v2 we need to add this to the component in order to be able to use global signals() inside a component
    useSignals()
    const suppliersDiligenceApi = SuppliersDiligenceApi.getInstance();

    // signal for local use
    const [isLoading, setIsLoading] = useState(true)
    const { logout } = useAuth()

    async function fetchSuppliers(){
        suppliers.value = await suppliersDiligenceApi.getAllSuppliers()
    }

    useEffect(() => {
        try {
            fetchSuppliers().then(() => setIsLoading(false))
        } catch (error) {
            // Thros error when accessToken expires, no refresh implemented so we just logout the user for now
            logout()
        }
    }, [])

    return isLoading ? <Box>
        <Typography variant="h5">Loading...</Typography>
    </Box> : <Box>
        <Box className="mb-4 text-right">
            <Button variant="default">
                <Link to={"/new-supplier"}>Add Supplier</Link>
            </Button>
        </Box>
        <DataTable columns={columns} data={suppliers.value}/>
    </Box>
}