import { http } from '@/http/httpCient';
import { Product } from './products.types';

class ProductsService {
  public async getAll() {
    try {
      const result = await http.get('/products.json');
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async getOneWithDetails(productId: number) {
    const result = await http.get('/products.json');
    const products = result.data;
    return products.find((product: Product) => product.id === productId);
  }
  public async getNoDetails(productId: number) {
    try {
      const result = await http.get('/products.json');
      const products = result.data;
      return products.find((product: Product) => product.id === productId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const productsService = new ProductsService();
