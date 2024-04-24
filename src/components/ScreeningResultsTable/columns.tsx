import { ColumnDef } from "@tanstack/react-table"
import { genericResult } from "./ScreeningResultsTable"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

function camelCaseToTitle(s: string) {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export const columns: ColumnDef<genericResult>[] = Object.keys({ // gets and array with the keys of the instance of given type|interface
    businessName: "",
    address: "",
    ineligibilityPeriod: "",
    grounds: "",
    programs: ""
} as genericResult).map(key => {
    return {
        accessorKey: key,
        header: ({column}) => {
            return <Button variant="ghost" onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc")
            }}>
                {camelCaseToTitle(key)}
                <ArrowUpDown/>
            </Button>
        }
    }
})