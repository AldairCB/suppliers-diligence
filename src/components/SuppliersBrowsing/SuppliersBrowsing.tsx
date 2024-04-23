import { effect, signal } from '@preact/signals-react'
import { DataTable } from '../DataTable/DataTable'
import { columns } from './columns'
import { SuppliersDiligenceApi } from '@/services/SuppliersDiligenceApi'
import { Button } from '../ui/button'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export const suppliers = signal([])
const isLoading = signal(true)

export default function SuppliersBrowsing() {
    const { user } = useAuth();
    const suppliersDiligenceApi = new SuppliersDiligenceApi(user);

    // every single time a value from a signal isnide an effect changes, this will be called
    effect(() => {
        const getSuppliers = async () => {
            try {
                suppliers.value = await suppliersDiligenceApi.getAllSuppliers()
                console.log(suppliers.value)
                isLoading.value = false
            } catch (error) {
                console.error(`Error while trying to fetch suppliers data: ${error}`)
            }
        }
        getSuppliers()
    })
    
    console.log(`isLoading: ${isLoading.value}`)
    return isLoading.value ? <Box>
        <Typography variant="h5">Loading...</Typography>
    </Box> : 
    <Box>
        <Box className="mb-4 text-right">
            <Button variant="default">
                <Link to={"/new-supplier"}>Add Supplier</Link>
            </Button>
        </Box>
        <DataTable columns={columns} data={suppliers.value}/>
    </Box>
}