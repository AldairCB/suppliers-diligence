import { SupplierModel } from "@/models/SupplierModel";

// THIS IS TEMPORARY, NEED TO FETCH THE TOKEN AND STORE IT IN A .env
const bearerToken = "Bearer CfDJ8F3jQ2YFD-tKl-cFvTVF5YMKsgAweZ3HCC_F_H9sgaMdK-OR9saFTH0Xn8FqQltYhRGrVcHs_fNPs1AZpvj2Yh2bOfksnPtj97sSUMQPtF_XKkjcWqJyt3jdqMBjQkqwfLqRci7d6Aj-fMvIfACIGplX95MQsEnj8LI4NzuTn6QkisYHquA8VME8DwNr1m1O61y4w-oVGX3HwJB37B7G83T5dBkHhKtdPS1PE6G5ktEdk5pSaOV1m6AT5nUNSARUUUfTAf7Age0An39fRSQMwRk79sN28ebkFTtcKnfSd3HGtgUuoOYzM6UazsHQd-2QJu9HMBQjBIU2aRkXzOpBKF5HGl2WVxMd2tkkKYGX0ZcO0pnsaHh27xqOU1N86VLW8mpIqkfh5zLHjPevMbaE_sWapwUO0M6bAcXg5uzrUHWhsnbumcyKF7O3NFpwJk7N0qHQmdVYmsQtA37rg9J6n4dOwYbAzgpZ2fkVKYWZAq5AlzdaV3y-dGviYi1dqNNNakh306BaSw4cZN2SwQFLIFcpl-oCj9g0J9y0xxSlLlNBXzDcKP4mVizMb465O4q_ZAIhQ9Mnb2ukDd-tHPhn7mKCnOa8KFSQhhXINhKAc4D3W7d4du40Hg_TD6nfIL0OyOLFB14NxCDUR2VZwADrdO2lOtIQH_ZkRZN9BuKcWB2CY4SYFcFChr3ncUFZ5viEGw"

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