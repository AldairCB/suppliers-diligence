import { effect, signal } from '@preact/signals-react'
import { DataTable } from '../DataTable/DataTable'
import { columns } from './columns'
import { SuppliersDiligenceApi } from '@/services/SuppliersDiligenceApi'
import { Button } from '../ui/button'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

const suppliersDiligenceApi = new SuppliersDiligenceApi();
export const suppliers = signal([])

effect(async () => {
    suppliers.value = await suppliersDiligenceApi.getAllSuppliers()
})

const SuppliersBrowsing = () => {
    return (
        <Box>
            <Box className="mb-4 text-right">
                <Button variant="default">
                    <Link to={"/new-supplier"}>Add Supplier</Link>
                </Button>
            </Box>
            <DataTable columns={columns} data={suppliers.value}/>
        </Box>
    )
}

export default SuppliersBrowsing