import { SupplierModel } from "@/models/SupplierModel";
import axios from "axios";


export class SuppliersDiligenceApi {
    readonly baseURL: string = "http://localhost:5284";

    getToken() {
        return localStorage.getItem('token')
    }

    async authenticate(email: string, password: string) {
        let headers = {
            "Accept": "application/json",
            'Content-Type': 'application/json',
        }
        
        // axios.post(
        //     encodeURI(`${this.baseURL}/login`),
        //     JSON.stringify({ email, password }),
        //     {
        //         headers,
        //         withCredentials: true
        //     },
        // ).then(({data}) => {
        //     console.log(`Axios: ${typeof data}`);
        //     return data;
        // })
        
        const response = await fetch(encodeURI(`${this.baseURL}/login`), {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
        return await response.json()
    }

    async getAllSuppliers() {
        let headers = {
            "Accept": "*/*",
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${this.getToken()}`
        }
        const response = await fetch(encodeURI(`${this.baseURL}/api/suppliers`), {
            method: 'GET',
            headers: headers,
        });
        const suppliers = await response.json();
        return suppliers;
    }
    async createSupplier(supplier: SupplierModel) {
        let headers = {
            "Accept": "*/*",
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${this.getToken()}`
        }

        const response = await fetch(encodeURI(`${this.baseURL}/api/suppliers`), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(supplier)
        });
        const suppliers = await response.json();
        return suppliers;
    }
    async updateSupplier(supplier: SupplierModel) {
        const id = supplier.id
        console.log(supplier)
        delete (supplier as {occupation?: string}).occupation;
        console.log(supplier)
        let headers = {
            "Accept": "*/*",
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${this.getToken()}`
        }
        const response = await fetch((encodeURI(`${this.baseURL}/api/suppliers/${id}`)), {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(supplier)
        });
        const res = await response.json();
        return res;
    }

    async deleteSupplier(id: string) {
        
        let headers = {
            "Accept": "*/*",
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${this.getToken()}`
        }
        const response = await fetch(encodeURI(`${this.baseURL}/api/suppliers/${id}`), {
            method: 'DELETE',
            headers: headers
        });
        const res = await response.json();
        return res;
    }


    async screenEntity(entityName: string, ofac: boolean, worldBank: boolean) {
        // Converting entityName to url notation 
        let headers = {
            "Accept": "*/*",
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${this.getToken()}`
        }
        const response = await fetch(encodeURI(`${this.baseURL}/api/screen?entityName=${entityName}&ofac=${ofac}&worldBank=${worldBank}`), {
            method: 'GET',
            headers: headers
        });
        const res = await response.json();
        return res;
    }
}