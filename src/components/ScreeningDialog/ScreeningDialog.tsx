"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Box, Typography } from "@mui/material"
import SuppliersDiligenceApi from "@/services/SuppliersDiligenceApi"
import { selectedSupplier } from "../SuppliersBrowsing/columns"
import { Separator } from "@/components/ui/separator"
import { ScreeningResultsModel } from "@/models/ScreeningResultsModel"
import { useNavigate } from "react-router-dom"

interface ScreeningDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

export function ScreeningDialog({
    open,
    onOpenChange
}: ScreeningDialogProps) {
    const suppliersDiligenceApi = SuppliersDiligenceApi.getInstance();
    const navigate = useNavigate()
    const [ofac, setOfac] = useState(false)
    const [screeningResults, setScreeningResults] = useState<ScreeningResultsModel|null>(null)
    const [worldBank, setWorldBank] = useState(false)
    const [offshoreLeaks, setOffshoreLeaks] = useState(false)
    const [isScreening, setIsScreening] = useState(false)
    
    const sources = [
        {
            id: "ofac",
            name: "OFAC Sanctions List",
            checked: ofac,
            onChange: (checked: boolean) => setOfac(checked)
        },
        {
            id: "worldBank",
            name: "World Bank Listing of Ineligible Firms and Individuals",
            checked: worldBank,
            onChange: (checked: boolean) => setWorldBank(checked)
        },
        {
            id: "offshoreLeaks",
            name: "Offshore Leaks Database",
            checked: offshoreLeaks,
            onChange: (checked: boolean) => setOffshoreLeaks(checked)
        }
    ]

    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Entity Screening</DialogTitle>
                <DialogDescription>
                    {`Select the sources to screen for "${selectedSupplier.value.businessName}"`}
                    <Box className="mx-2 mt-2">
                        {
                            sources.map((source) => <Box key={source.id} className="flex items-center gap-2">
                                <Checkbox 
                                    id={source.id}
                                    checked={source.checked}
                                    onCheckedChange={source.onChange}
                                    disabled={source.id === "offshoreLeaks"}
                                />
                                <Typography variant="caption">{source.name}</Typography>
                            </Box>)
                        }
                    </Box>
                </DialogDescription>
                {/* Results */}
                {!isScreening && screeningResults ? <Box className="text-center">
                    <Separator className="my-2" />
                    <Button variant="link" onClick={() => {
                        navigate("/screening-results", { state: { screeningResults: screeningResults } })
                    }}>{`Found ${screeningResults!.numHits} hits. View details`}</Button>
                </Box> : null}
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                    <Button variant="ghost" disabled={isScreening} onClick={() => {
                        setScreeningResults(null)
                    }}>Cancel</Button>
                </DialogClose>
                <Button
                    type="button"
                    variant="default"
                    disabled={(ofac === false && worldBank === false && offshoreLeaks === false) || isScreening}
                    onClick={async () => {
                        setIsScreening(true)
                        const response = await suppliersDiligenceApi.screenEntity(selectedSupplier.value.businessName, ofac, worldBank)
                        if (response) {
                            setScreeningResults(response)
                            setIsScreening(false)
                        }
                    }}>
                    {isScreening ? "Screening..." : "Start Screening"}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}