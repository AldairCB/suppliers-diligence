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

interface ScreeningDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

export function ScreeningDialog({
    open,
    onOpenChange
}: ScreeningDialogProps) {
    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Entity Screening</DialogTitle>
                <DialogDescription>
                    Select the sources for the screening
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