import { create } from 'zustand';

// TODO: remove location
// TODO: change name to client

interface cartStoreState {
  order: Order;
}
interface cartStoreActions {
  // createNewOrder: (name: string, location: string, wholesale: boolean) => void;
  setStatus: (status: OrderStatus) => void;
  setClient: (clientId: number) => void;
  addOrderDetail: (orderDetail: OrderDetail) => void;
  removeOrderDetail: (index: number) => void;
  reset: () => void;
}
const initialState: cartStoreState = {
  order: {
    status: 'NOT STARTED',
    total: 0,
    clientId: 1,
    orderDetails: [],
  },
};

export const useCartStore = create<cartStoreState & cartStoreActions>((set) => ({
  ...initialState,
  setStatus: (status: OrderStatus) => {
    set((state) => ({ ...state, status }));
  },
  setClient: (clientId: number) => {
    set((state) => ({ ...state, clientId }));
  },
  addOrderDetail: (orderDetail: OrderDetail) => {
    set((state) => ({
      order: {
        ...state.order,
        orderDetails: [...state.order.orderDetails, orderDetail],
        total: state.order.total + orderDetail.price * orderDetail.quantity,
      },
    }));
  },
  removeOrderDetail: (index: number) => {
    set((state) => ({
      order: {
        ...state.order,
        orderDetails: state.order.orderDetails.filter((_, i) => i !== index),
        total: state.order.total - state.order.orderDetails[index].price * state.order.orderDetails[index].quantity,
      },
    }));
  },
  reset: () => {
    set(initialState);
  },
}));
