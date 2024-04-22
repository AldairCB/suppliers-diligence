import { useEffect, useState } from 'react'
import { DataTable } from '../DataTable/DataTable'
import { columns } from './columns'
import { SuppliersDiligenceApi } from '@/services/SuppliersDiligenceApi'

const SuppliersBrowsing = () => {

  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {
    const suppliersDiligenceApi = new SuppliersDiligenceApi();
    suppliersDiligenceApi.getAllSuppliers().then(suppliers => {
      setSuppliers(suppliers)
    })
  })

  return (
    <DataTable columns={columns} data={suppliers}/>
  )
}

export default SuppliersBrowsing