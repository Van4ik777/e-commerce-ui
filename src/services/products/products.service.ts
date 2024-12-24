import { http } from '@/http/httpCient';
import { Product } from './products.types';

class ProductsService {
  public async getAll() {
    try {
      const result = await http.get('/products/products/');
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async getOneWithDetails(productId: number) {
    const result = await http.get(`/products/product-details/${productId}`);
    return result.data
  }
  
}

export const productsService = new ProductsService();
