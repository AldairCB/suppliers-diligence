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
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { SuppliersDiligenceApi } from "@/services/SuppliersDiligenceApi"


const formSchema = z.object({
    email: z.string(),
    password: z.string(),
})

interface IUserData {
    email: string;
    id: string;
};

export function Login() {
    const navigate = useNavigate()
    const signIn = useSignIn<IUserData>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const suppliersDiligenceApi = new SuppliersDiligenceApi();
        try {
            const response = await suppliersDiligenceApi.authenticate(values.email, values.password)
            if(signIn({
                auth: {
                    token: response.accessToken,
                    type: "Bearer",
                },
                // refresh: response.refreshToken,
                userState: {
                    email: values.email,
                    id: "1"
                }
            })){
                console.log(response.accessToken)
                navigate('/')
            } else {
                console.log('error in auth')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Box className="container my-10 mx-auto px-4 max-w-md">   
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </Box>
    )
}