import { SupplierModel } from "@/models/SupplierModel";

// THIS IS TEMPORARY, NEED TO FETCH THE TOKEN AND STORE IT IN A .env
const bearerToken = "Bearer CfDJ8F3jQ2YFD-tKl-cFvTVF5YOC8kDEwYnwwlIPNdQ7tm9nIf3aEnqubFiXv2CTwLns9p3B1fWCSxl7jJ9bwUzUDvRAh3iTeRkj2xGhE2JOKiH59jLarT9DjpzuiKNnXS9rd29BjOXajI8QfqLPX28m_o7t0WX7IYQd13n_FM3dDFPWJ5KC98hB8SaK8pOzAnlNsaK9Gyid0D_dYfVHXt8kuyrKx_aiLKCNUu-AbvycWf04vSvuOUoASC73XH7X6ln2aALAzTkdMZMgOEBjrsahakdnsDNDGNTam8tKPSR4JkYEkqBO7P1e_s3PoWDMg_U-E1qR6SwRzwjN9wmGqjb4PlJOhsGHRwFgHsIzTOZ1hsF84jyLSnpHb5Hipw2ESpeQIx9vk6Xj5LKqKOx33EBFOgFoJ6jR9uOFXIg_1q4KCjmp-F0X-OQxPjpk13UpxWAE9o5QNJDGrLW9jOci12mSlkCl4eLue1cXTJdmngrXKMPfVVCeKJK0_Z4UqISu331sWoSykOXcY5OndYIGJkU9zg-5clwgJM-JUekQ3aV9WD9Tg0ipRswscw19vVQA7j2HZD2sJfFKMEfm03U50hz5m-xZsk4pwqGc8NPWwxd4gpMkBnflU-bUIJ1Ry565BhqmOAExZj_CJAUevTEneS8hUITdUQn0xu3JGgKykb9AZJPsIhargkRvhAwx3r3tLhp-8Q"

export class SuppliersDiligenceApi {
    readonly baseUrl: string = "http://localhost:5284";

    async getAllSuppliers() {
        let headers = {
            "Accept": "*/*",
            "Authorization": bearerToken //TODO: Save token in local storage and retrieve it from there
        }
        const response = await fetch(`${this.baseUrl}/api/suppliers`, {
            method: 'GET',
            headers: headers
        });
        const suppliers = await response.json();
        return suppliers;
    }
    async createSupplier(supplier: SupplierModel) {
        let headers = {
            "Accept": "*/*",
            "Authorization": bearerToken //TODO: Save token in local storage and retrieve it from there
        }
        const response = await fetch(`${this.baseUrl}/api/suppliers`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(supplier)
        });
        const suppliers = await response.json();
        return suppliers;
    }
}