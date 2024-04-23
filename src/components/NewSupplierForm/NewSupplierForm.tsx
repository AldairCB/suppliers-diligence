"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Box, Grid } from "@mui/material"
import { SuppliersDiligenceApi } from "@/services/SuppliersDiligenceApi"
import { SupplierModel } from "@/models/SupplierModel";
import { useNavigate } from "react-router-dom"


const formSchema = z.object({
    businessName: z.string().min(2, {
        message: "Business Name must be at least 2 characters.",
    }),
    tradeName: z.string().min(2, {
        message: "Trade Name must be at least 2 characters.",
    }),
    ruc: z.string().min(11, {
        message: "RUC must be at 11 characters long.",
    }).max(11),
    phoneNumber: z.string().min(9, {
        message: "Phone number must be 9 characters long.",
    }).max(9),
    email: z.string().min(0).max(50),
    website: z.string().min(0).max(100),
    physicalAddress: z.string().min(0).max(255),
    country: z.string().min(0).max(50),
    annualReportInUSD: z.string()
})

export function NewSupplierForm() {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessName: "",
            tradeName: "",
            ruc: "",
            phoneNumber: "",
            email: "",
            website: "",
            physicalAddress: "",
            country: "",
            annualReportInUSD: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        const supplier: SupplierModel = {
            businessName: values.businessName,
            tradeName: values.tradeName,
            ruc: values.ruc,
            phoneNumber: values.phoneNumber,
            email: values.email,
            website: values.website,
            physicalAddress: values.physicalAddress,
            country: values.country,
            annualReportInUSD: +values.annualReportInUSD //this converts to number
        }
        const suppliersDiligenceApi = new SuppliersDiligenceApi();
        suppliersDiligenceApi.createSupplier(supplier).then(
            () => navigate(-1)
        )
        
    }

    return (
        <Box>   
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                    {/* MAX xs = 12 */}
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <FormField control={form.control} name="tradeName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Trade Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </Grid>
                        <Grid item xs={3}>
                            <FormField control={form.control} name="annualReportInUSD" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Annual Report In USD</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </Grid>
                        <Grid item xs={9}>
                            <FormField control={form.control} name="businessName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </Grid>
                        <Grid item xs={3}>
                            <FormField control={form.control} name="ruc" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>RUC</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </Grid>
                        <Grid item xs={2}>
                            <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </Grid>
                        <Grid item xs={5}>
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </Grid>
                        <Grid item xs={5}>
                            <FormField control={form.control} name="website" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </Grid>
                        <Grid item xs={7}>
                            <FormField control={form.control} name="physicalAddress" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Physical Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </Grid>
                        <Grid item xs={5}>
                            <FormField control={form.control} name="country" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input type="country" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </Grid>
                    </Grid>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </Box>                    
    )
}
