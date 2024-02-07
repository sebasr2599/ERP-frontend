import { AxiosERPInstance } from '../Lib/axiosInstance.config';

// List orders
export const getOrders = async (): Promise<Order[]> => {
  const response = await AxiosERPInstance.get(`/order`);
  return response.data;
};
// Create a single User
export const createOrder = async (order: Order) => {
  order.orderDetails.forEach((detail) => {
    delete detail.total;
    delete detail.unitName;
    delete detail.productName;
  });
  const response = await AxiosERPInstance.post('/order', order);
  return response;
};
// Read a single User
export const getOrder = async (id: number): Promise<Order> => {
  const response = await AxiosERPInstance.get(`/order/${id}`);
  return response.data;
};
