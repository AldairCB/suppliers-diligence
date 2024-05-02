import { signal } from '@preact/signals-react'
import { DataTable } from '@/components/DataTable/DataTable'
import { getColumns, selectedSupplier } from './columns'
import SuppliersDiligenceApi from '@/services/SuppliersDiligenceApi'
import { Button } from '@/components/ui/button'
import { Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSignals } from '@preact/signals-react/runtime'
import { SupplierModel } from '@/models/SupplierModel'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from "@/components/ui/dialog"
import { ScreeningDialog } from '@/components/ScreeningDialog/ScreeningDialog'
import { LogOut } from 'lucide-react'
import { isEditing } from '../SupplierDetailsView/SupplierDetailsView'
import { SyncLoader } from 'react-spinners'

// signal that able to be globally available for all the components when exporting them
export const suppliers = signal<SupplierModel[]>([])

export default function SuppliersBrowsing() {
    // in preact v2 we need to add this to the component in order to be able to use global signals() inside a component
    useSignals()
    const { user, logout } = useAuth()
    if(!user) { logout() }

    const suppliersDiligenceApi = SuppliersDiligenceApi.getInstance(user.accessToken);

    const [isLoading, setIsLoading] = useState(true)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showScreeningDialog, setShowScreeningDialog] = useState(false)
    const navigate = useNavigate()

    async function fetchSuppliers(){
        try{
            suppliers.value = await suppliersDiligenceApi.getAllSuppliers()
            setIsLoading(false)
        } catch (error) {
            // accessToken expired, no refresh implemented so we just logout the user for now sad sad asdas dasdsad asd asd as 
            logout()
        }
    }

    // Use effect is called on the 3 life cycle phases of a component: mount, update, and unmount.
    // it takes the first parameters, the callback function, and optionally an array of dependencies.
    // if we provide an empty array as dependency, it will only be called for the mount phase.
    useEffect(() => {
        fetchSuppliers()
    }, [])

    return isLoading ? <>
        <SyncLoader color="white" />
    </> : <>
        <Box className="flex justify-between mb-6">
            <Button className="align-middle" variant="destructive" onClick={() => logout()}>
                <LogOut className="mr-2 align-middle"/>
                Logout
            </Button>
            <Link to={"/new-supplier"}>
                <Button className="align-middle" variant="default">
                    Add Supplier
                </Button>
            </Link>
        </Box>
        <DataTable columns={getColumns({
            handleView: () => {
                isEditing.value = false
                navigate("/supplier-details", { state: { supplier: selectedSupplier.value } })
            },
            handleEdit: () => {
                isEditing.value = true
                navigate("/supplier-details", { state: { supplier: selectedSupplier.value } })
            },
            handleDelete: () => { setShowDeleteDialog(true) },
            handleScreen: () => { setShowScreeningDialog(true) }
        })} data={suppliers.value}/>

        <Dialog open={showDeleteDialog} onOpenChange={
            (open) => setShowDeleteDialog(open)
        }>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the selected supplier.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="destructive" onClick={() => {
                            suppliersDiligenceApi.deleteSupplier(selectedSupplier.value.id!).then(() => {
                                fetchSuppliers()
                            })
                        }}>
                            Yes, delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <ScreeningDialog open={showScreeningDialog} onOpenChange={(open) => setShowScreeningDialog(open)}/>
    </>
}