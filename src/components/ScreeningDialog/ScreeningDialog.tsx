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

interface ScreeningDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

export function ScreeningDialog({
    open,
    onOpenChange
}: ScreeningDialogProps) {
    const suppliersDiligenceApi = SuppliersDiligenceApi.getInstance();

    const [ofac, setOfac] = useState(false)
    const [worldBank, setWorldBank] = useState(false)
    const [offshoreLeaks, setOffshoreLeaks] = useState(false)

    type screeningStatus = "screening" | "results" | "noResults"
    const [screeningStatus, setScreeningStatus] = useState<screeningStatus>("noResults")
    
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
                {screeningStatus != "results" ? null : <Box className="text-center">
                    <Separator className="my-2" />
                    <Button variant="link">{`Found ${2} hits. View details`}</Button>
                </Box>}
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button
                    type="button"
                    variant="default"
                    disabled={ofac === false && worldBank === false && offshoreLeaks === false}
                    onClick={async () => {
                        setScreeningStatus("screening")
                        const response = await suppliersDiligenceApi.screenEntity(selectedSupplier.value.businessName, ofac, worldBank)
                        if (response.data) {
                            setScreeningStatus("results")
                        }
                        console.log(response)
                    }}>
                    Start Screening
                </Button>

            </DialogFooter>
        </DialogContent>
    </Dialog>
}