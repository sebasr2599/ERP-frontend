import { AxiosERPInstance } from '../Lib/axiosInstance.config';

// List all Clients
export const getClients = async (): Promise<Client[]> => {
  const response = await AxiosERPInstance.get(`/client`);
  return response.data;
};

// Create Clients
export const createClient = async (client: Client): Promise<Client> => {
  const response = await AxiosERPInstance.post(`/client`, client);
  return response.data;
};

// Read Client
export const readClient = async (id: number): Promise<Client> => {
  const response = await AxiosERPInstance.get(`/client/${id}`);
  return response.data;
};

// Update Client
export const updateClient = async (client: Client): Promise<Client> => {
  const id = client.id;
  const response = await AxiosERPInstance.patch(`/client/${id}`, client);
  return response.data;
};

//Delete Client
export const deleteClient = async (id: number): Promise<Client> => {
  const response = await AxiosERPInstance.delete(`/client/${id}`);
  return response.data;
};
