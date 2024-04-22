import { useEffect, useState } from 'react'
import { DataTable } from '../DataTable/DataTable'
import { columns } from './columns'
import { SuppliersDiligenceApi } from '@/services/SuppliersDiligenceApi'
import { Button } from '../ui/button'
import { Box } from '@mui/material'

const SuppliersBrowsing = () => {

  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {
    const suppliersDiligenceApi = new SuppliersDiligenceApi();
    suppliersDiligenceApi.getAllSuppliers().then(suppliers => {
      setSuppliers(suppliers)
    })
  })

  return (
    <Box className="container py-10 px-20 mx-auto">
      <Box className="mb-4 text-right">
        <Button variant="default">Add Supplier</Button>
      </Box>
      <DataTable columns={columns} data={suppliers}/>
    </Box>
  )
}

export default SuppliersBrowsing