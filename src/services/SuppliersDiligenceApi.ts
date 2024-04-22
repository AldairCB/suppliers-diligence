import { SupplierModel } from "@/models/SupplierModel";

const accesToken = "CfDJ8F3jQ2YFD-tKl-cFvTVF5YPImqPy2EH5Og1nnd0gIo_DnX-y4lcz9CeNvp6hP2ZpasOY1_duFLJsneouqzHFa5su22maVo_qwS7lNqgK1OBpLTybpHqFj2VJSW82VFJuxN4DH_r00n8g7096Eji5lY1p6xtoQVJ9XoSYY92LzDoPQBatLwqGtkZPc_dDV_GrZr-cHRikznPN-fyLQRCwwAixEYvBHHi9eiUY1QYi9j-EiZF4z-itS-UTpB3GJ8vvM_ZKFIc7aun0JDCbbAAbjrmZwQq7kGw2NhF9IfroT8Npgwl5eioqjARKytjZw4Y71ljHcaRJxLgoK7X72Qot2IniL3c6_6z34LZ27JjV4svJNrPfjyR6kIbFqhhMeVH07jKt1oBFfulFlR9SZL8OuONLsKXBd90oECxIK10ia1GFe6UeV8VPTzjZghoBgZmKTpPmp2DNhlNCTTUI2jhiJUAoLNcudSeZ38CQU_CydzNmHIWM1eXvLmx6pb8yQpReNJci788QgpdDwx9PJk9LOjuH2YvCcA3e_S4HqwxOlMXvE36IuNkx72ERMIgXrGvKiLznNM7KwUF53pJas9QV5ZzHLLX_RgovgFXErBFs8kyuOcIkdhjk470nDLW3BGaLKZMKfk6bfw2H5TVxAKmO3_QppEetoYYy4BMtJFHgBVz-Jfac3UIflu3fa8iTrohT9Q"

export class SuppliersDiligenceApi {
    readonly baseURL: string = "http://localhost:5284";

    async authenticate(email: string, password: string) {
        let headers = {
            "Accept": "*/*",
            'Content-Type': 'application/json',
        }
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
            "Authorization": `Bearer ${accesToken}`
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
            "Authorization": `Bearer ${accesToken}`
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
            "Authorization": `Bearer ${accesToken}`
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
            "Authorization": `Bearer ${accesToken}`
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
            "Authorization": `Bearer ${accesToken}`
        }
        const response = await fetch(encodeURI(`${this.baseURL}/api/screen?entityName=${entityName}&ofac=${ofac}&worldBank=${worldBank}`), {
            method: 'GET',
            headers: headers
        });
        const res = await response.json();
        return res;
    }
}