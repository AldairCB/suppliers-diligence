import { SupplierModel } from "@/models/SupplierModel";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Delete, MoreHoriz, Security} from "@mui/icons-material";
import { ArrowUpDown, Edit, EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { signal } from "@preact/signals-react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { SuppliersDiligenceApi } from "@/services/SuppliersDiligenceApi";
import { suppliers } from "./SuppliersBrowsing";
  
const suppliersDiligenceApi = new SuppliersDiligenceApi();
export const selectedRow = signal("")

export const columns: ColumnDef<SupplierModel>[] = [
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
                    <DropdownMenuItem onClick={() => {}}>  
                        <EyeIcon className="mr-3"/> View
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                        selectedRow.value = row.id
                    }}>
                        <Edit className="mr-3"/><Link to={"/edit-supplier"}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Dialog>
                        <DialogTrigger><Delete className="mr-3"/> Delete</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-end">
                                <DialogClose asChild>
                                <Button type="button" variant="destructive" onClick={() => suppliersDiligenceApi.deleteSupplier(suppliers.value[row.id].id)}>
                                    Delete
                                </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {}}>
                        <Security className="mr-3"/> Screening
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        }
    }
]