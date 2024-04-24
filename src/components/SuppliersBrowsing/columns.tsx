import { SupplierModel } from "@/models/SupplierModel"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Delete, MoreHoriz, Security} from "@mui/icons-material"
import { ArrowUpDown, Edit, EyeIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { suppliers } from "./SuppliersBrowsing"
import { signal } from "@preact/signals-react"

export const supplierToDeleteId = signal("")

interface params {
    handleView: () => void,
    handleEdit: () => void,
    handleDelete: () => void,
    handleScreen: () => void
}

export const getColumns = (params: params): ColumnDef<SupplierModel>[] => {
    return [
        {
            accessorKey: "tradeName",
            header: ({column}) => {
                return <Button variant="ghost" onClick={() => {
                    column.toggleSorting(column.getIsSorted() === "asc")
                }}>
                    Trade Name
                    <ArrowUpDown/>
                </Button>
            }
        },
        {
            accessorKey: "lastModificationDate",
            header: ({column}) => {
                return <Button variant="ghost" onClick={()=>{
                    column.toggleSorting(column.getIsSorted() === "asc")
                }}>
                    Last Modification Date
                    <ArrowUpDown/>
                </Button>
            },
            cell: ({row}) => {
                const date = row.getValue('lastModificationDate');
                return <div>
                    {new Date(date as string).toLocaleDateString()}
                </div>
            }
        },
        {
            id: "actions",
            // header: "Actions",
            cell: ({row}) => {
                return <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHoriz className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>

                        <DropdownMenuItem onClick={params.handleView}>  
                            <EyeIcon className="mr-3"/> View
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={params.handleEdit}>
                            <Edit className="mr-3"/><Link to={"/edit-supplier"} state={{supplier: suppliers.value[+row.id]}}>Edit</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={
                            () => {
                                supplierToDeleteId.value = suppliers.value[+row.id].id!
                                params.handleDelete()
                            }
                        }>
                            <Delete className="mr-3"/> Delete
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={params.handleScreen}>
                            <Security className="mr-3"/> Screening
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            }
        }
    ]
}