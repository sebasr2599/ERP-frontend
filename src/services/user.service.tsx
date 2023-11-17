import { AxiosERPInstance } from '../Lib/axiosInstance.config';

// List users
export const getUsers = async (): Promise<User[]> => {
  const response = await AxiosERPInstance.get(`/user`);
  return response.data;
};
// Create a single User
export const createUser = async (user: User) => {
  const response = await AxiosERPInstance.post('/user', user);
  return response;
};
// Read a single User
export const getUser = async (id: number): Promise<User> => {
  const response = await AxiosERPInstance.get(`/user/${id}`);
  return response.data;
};
// Update a singe User
export const updateUser = async (id: number, user: User) => {
  const response = await AxiosERPInstance.patch(`/user/${id}`, user);
  return response;
};
// Update User password
export const changePassword = async (id: number, body: { password: string }) => {
  const response = await AxiosERPInstance.patch(`/user/${id}/password`, body);
  return response;
};
// Delete User
export const deleteUser = async (id: number): Promise<User> => {
  const response = await AxiosERPInstance.delete(`/user/${id}`);
  return response.data;
};
