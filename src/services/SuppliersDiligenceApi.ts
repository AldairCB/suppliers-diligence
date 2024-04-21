export class SuppliersDiligenceApi {
    readonly baseUrl: string = "http://localhost:5284";

    async getSuppliers() {
        const response = await fetch(`${this.baseUrl}/api/suppliers`);
        const suppliers = await response.json();
        return suppliers;
    }
}