import { AxiosERPInstance } from '../Lib/axiosInstance.config';

// List all products
export const getProducts = async (): Promise<Product[]> => {
  const response = await AxiosERPInstance.get(`/product`);
  return response.data;
};

// Create a product
export const createProduct = async (product: Product): Promise<Product> => {
  const response = await AxiosERPInstance.post('/product', product);
  return response.data;
};

// Read product
export const readProduct = async (id: number): Promise<Product> => {
  const response = await AxiosERPInstance.get(`/product/${id}/details`);
  return response.data;
};
