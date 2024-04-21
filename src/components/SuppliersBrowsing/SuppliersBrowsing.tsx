import React from 'react'
import { DataTable } from '../DataTable/DataTable'
import { suppliers } from './suppliers_temp'
import { columns } from './columns'

const SuppliersBrowsing = () => {
  return (
    <DataTable columns={columns} data={suppliers}/>
  )
}

export default SuppliersBrowsing