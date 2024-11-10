import { http } from "@/http/httpCient";

class ProductsService{
    public getOne(productId:number) {
        
    } 
    public getAll(){
        return http.get('/products.json').then(result=>result)
    }
}

export const productsService = new ProductsService()