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

import { Delete, MoreHoriz, ScreenLockLandscape, Security, SecuritySharp, Verified } from "@mui/icons-material";
import { Edit, Edit2, Edit3, EyeIcon } from "lucide-react";

export const columns: ColumnDef<SupplierModel>[] = [
    {
        accessorKey: "tradeName",
        header: "Trade Name"
    },
    {
        accessorKey: "lastModificationDate",
        header: "Last Modified",
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
                    <DropdownMenuItem onClick={() => {}}>
                        <Edit className="mr-3"/> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {}}>
                        <Delete className="mr-3"/> Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {}}>
                        <Security className="mr-3"/> Screening
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        }
    }
]