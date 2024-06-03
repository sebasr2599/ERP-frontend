import { AxiosERPInstance } from '../Lib/axiosInstance.config';

// List all products
export const getProducts = async (product: string, categoryId: number | undefined): Promise<Product[]> => {
  // const response;
  const response = await AxiosERPInstance.get(`/product?search=${product}&categoryId=${categoryId}`);
  return response.data;

  // return response.data;
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
// Update product
export const updateProduct = async (product: Product): Promise<Product> => {
  const id = product.id;
  delete product.category;
  delete product.unit;
  const response = await AxiosERPInstance.patch(`/product/${id}`, product);
  return response.data;
};
// Delete product
export const deleteProduct = async (product: Product): Promise<Product> => {
  const response = await AxiosERPInstance.delete(`/product/${product.id}`);
  return response.data;
};
