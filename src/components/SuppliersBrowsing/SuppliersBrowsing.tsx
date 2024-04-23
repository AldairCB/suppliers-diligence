import { effect, signal, useSignal } from '@preact/signals-react'
import { DataTable } from '../DataTable/DataTable'
import { columns } from './columns'
import { SuppliersDiligenceApi } from '@/services/SuppliersDiligenceApi'
import { Button } from '../ui/button'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useSignals } from '@preact/signals-react/runtime'
import { SupplierModel } from '@/models/SupplierModel'

// signal that able to be globally available for all the components when exporting them
export const suppliers = signal<SupplierModel[]>([])

export default function SuppliersBrowsing() {
    // in preact v2 we need to add this to the component in order to be able to use global signals() inside a component
    useSignals();
    const { user } = useAuth();
    const suppliersDiligenceApi = new SuppliersDiligenceApi(user);

    // signal for local use
    const isLoading = useSignal(false)

    // every single time a value from a signal isnide an effect changes, this will be called
    effect(() => {
        if(suppliers.value.length === 0){
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
        }
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