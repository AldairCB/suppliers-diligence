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

interface ScreeningDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

export function ScreeningDialog({
    open,
    onOpenChange
}: ScreeningDialogProps) {
    const [ofac, setOfac] = useState(false)
    const [worldBank, setWorldBank] = useState(false)
    const [offshoreLeaks, setOffshoreLeaks] = useState(false)

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
                    Select the sources for the screening
                    <Box className="m-3">
                        {
                            sources.map((source) => <Box key={source.id} className="flex items-center gap-2 mb-2">
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
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                    <Button type="button" variant="default" onClick={() => {
                        console.log('Screening...')
                    }}>
                        Start Screening
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}