import { defineStore } from 'pinia'
export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [] as any,
        status: false,
        message: "",
    }),
    actions: {
        async createProduct(payload: any){
            const { baseUrl, apikey } = useAppConfig();
            const {data, error} = await useFetch("/rest/v1/books", {
                baseURL: baseUrl,
                method: "POST",
                headers: {
                    apikey: apikey,
                },
                body: payload,
            })
            
            if(error.value){
                this.status = false;
                this.message = apikey;
            }else if(data){
                this.status = true;
                this.message = "Get Products successfully";
            }
        }, 

        async updateProduct(payload: any, id: number){
            const { baseUrl, apikey } = useAppConfig();
            const {data, error} = await useFetch(`/rest/v1/books?id=eq.${id}&select=*`, {
                baseURL: baseUrl,
                method: "PATCH",
                headers: {
                    apikey: apikey,
                },
                body: payload,
            })
            
            if(error.value){
                this.status = false;
                this.message = apikey;
            }else if(data){
                this.status = true;
                this.message = "Get Products successfully";
            }
        }, 

        async getAllProducts(){
            const { baseUrl, apikey } = useAppConfig();
            const {data, error} = await useFetch("/rest/v1/books", {
                baseURL: baseUrl,
                method: "GET",
                headers: {
                    apikey: apikey,
                },
            });
            
            if(error.value){
                this.status = false;
                this.message = "Get Products Failed !!!";
            }else if(data){
                this.status = true;
                this.message = "Get Products successfully";
                this.products = data.value;
            }
        },

        async getFilterProduct(id : number){
            const { baseUrl, apikey } = useAppConfig();
            const {data, error} = await useFetch(`/rest/v1/books?id=eq.${id}&select=*`, {
                baseURL: baseUrl,
                method: "GET",
                headers: {
                    apikey: apikey,
                },
            });
            
            if(error.value){
                this.status = false;
                this.message = "Get Filtered Product Failed !!!";
            }else if(data){
                this.status = true;
                this.message = "Get Filtered Product successfully";
                this.products = data.value;
                console.log(this.products);
            }
        },

        async deleteProduct(id : number){
            const { baseUrl, apikey } = useAppConfig();
            const {data, error} = await useFetch(`/rest/v1/books?id=eq.${id}&select=*`, {
                baseURL: baseUrl,
                method: "DELETE",
                headers: {
                    apikey: apikey,
                },
            });
            
            if(error.value){
                this.status = false;
                this.message = "Get Filtered Product Failed !!!";
            }else if(data){
                this.status = true;
                this.message = "Get Filtered Product successfully";
                this.products = data.value;
                console.log(this.products);
            }
        },

    }
})