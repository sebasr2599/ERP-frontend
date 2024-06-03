import { AxiosERPInstance } from '../Lib/axiosInstance.config';

// List all Categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await AxiosERPInstance.get(`/category`);
  return response.data;
};

// Create Category
export const createCategory = async (category: Category): Promise<Category> => {
  const response = await AxiosERPInstance.post(`/category`, category);
  return response.data;
};

// Read Category
export const readCategory = async (id: number): Promise<Category> => {
  const response = await AxiosERPInstance.get(`/category/${id}`);
  return response.data;
};

// Update Category
export const updateCategory = async (category: Category): Promise<Category> => {
  const id = category.id;
  const response = await AxiosERPInstance.patch(`/category/${id}`, category);
  return response.data;
};

//Delete Category
export const deleteCategory = async (category: Category): Promise<Category> => {
  const response = await AxiosERPInstance.delete(`/category/${category.id}`);
  return response.data;
};
