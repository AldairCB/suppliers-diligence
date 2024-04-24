import { Box } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { DataTable } from "@/components/DataTable/DataTable"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"

export type genericResult = {
    businessName: string
    address: string
    ineligibilityPeriod: string
    grounds: string
    programs: string
}
export function ScreeningResultsTable() {
    const navigate = useNavigate()
    const location = useLocation()
    const { screeningResults } = location.state

    const ofacResults = screeningResults.ofacResults.map((ofacRes: any) => {
        return {
            businessName: ofacRes.name,
            address: ofacRes.address,
            ineligibilityPeriod: "",
            grounds: "",
            programs: ofacRes.programs[0]
        } as genericResult
    })
    const worldBankResults = screeningResults.worldBankResults.map((wbRes: any) => {
        return {
            businessName: wbRes.firmName,
            address: wbRes.address,
            ineligibilityPeriod: `${wbRes.ineligibilityFromDate} - ${!wbRes.ineligibilityToDate ? wbRes.ineligibilityStatus : wbRes.ineligibilityToDate}`,
            grounds: wbRes.grounds[0],
            programs: ""
        } as genericResult
    })

    const data: genericResult[] = ofacResults.concat(worldBankResults)

    return <Box>
        <DataTable columns={columns} data={data}></DataTable>
        <Button variant="outline" onClick={() => navigate(-1)}>Go back</Button>
    </Box>
}