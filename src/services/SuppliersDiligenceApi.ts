import { SupplierModel } from "@/models/SupplierModel";
import axios from "axios";

export default class SuppliersDiligenceApi {

    private static instance: SuppliersDiligenceApi;
    readonly baseURL: string = "http://localhost:5284"
    
    public static getInstance(): SuppliersDiligenceApi {
        if (!SuppliersDiligenceApi.instance) {
            SuppliersDiligenceApi.instance = new SuppliersDiligenceApi();
        }
        return SuppliersDiligenceApi.instance;
    }

    constructor() {
        axios.interceptors.response.use((response) => {
            return response
        }, (error) => {
            return Promise.reject(error);
        })
    }

    injectAccessToken(accessToken: string) {
        axios.interceptors.request.use((config) => {
            console.log('Injecting access token...');
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        })
    }

    async authenticate(email: string, password: string) {
        let headers = {
            "Accept": "application/json",
            'Content-Type': 'application/json',
        }
        const response = await axios.post(
            encodeURI(`${this.baseURL}/login`),
            { email, password },
            { headers: headers, withCredentials: true, validateStatus: () => true }
        )
        return response.data
        // const response = await fetch(encodeURI(`${this.baseURL}/login`), {
        //     method: 'POST',
        //     headers: headers,
        //     credentials: 'include',
        //     body: JSON.stringify({ email, password })
        // });
        // return await response.json()
    }

    async getAllSuppliers() {
        let headers = {
            "Accept": "*/*",
            'Content-Type': 'application/json'
        }
        const response = await axios.get(
            encodeURI(`${this.baseURL}/api/suppliers`),
            { headers: headers, validateStatus: () => true }
        )
        return response.data;
    }

    async createSupplier(supplier: SupplierModel) {
        let headers = {
            "Accept": "*/*",
            'Content-Type': 'application/json'
        }
        const response = await axios.post(
            encodeURI(`${this.baseURL}/api/suppliers`),
            supplier,
            { headers: headers, validateStatus: () => true }
        )
        return response.data
    }

    async updateSupplier(supplier: SupplierModel) {
        const id = supplier.id
        
        console.log(supplier)
        delete (supplier as {id?: string}).id;
        console.log(supplier)

        let headers = {
            "Accept": "*/*",
            'Content-Type': 'application/json'
        }
        const response = await axios.put(
            encodeURI(`${this.baseURL}/api/suppliers/${id}`),
            supplier,
            { headers: headers, validateStatus: () => true }
        )
        return response.data
    }

    async deleteSupplier(id: string) {
        let headers = {
            "Accept": "*/*",
            'Content-Type': 'application/json'
        }
        const response = await axios.delete(
            encodeURI(`${this.baseURL}/api/suppliers/${id}`),
            { headers: headers, validateStatus: () => true }
        )
        return response.data
    }

    async screenEntity(entityName: string, ofac: boolean, worldBank: boolean) {
        // Converting entityName to url notation 
        let headers = {
            "Accept": "*/*",
            'Content-Type': 'application/json'
        }
        const response = await axios.get(
            encodeURI(`${this.baseURL}/api/screen?entityName=${entityName}&ofac=${ofac}&worldBank=${worldBank}`),
            { headers: headers, validateStatus: () => true }
        )
        return response.data
    }
}