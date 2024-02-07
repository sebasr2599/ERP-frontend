import { create } from 'zustand';

interface cartStoreState {
  order: Order;
}
interface cartStoreActions {
  addOrderDetail: (orderDetail: OrderDetail) => void;
  removeOrderDetail: (index: number) => void;
  reset: () => void;
}
const initialState: cartStoreState = {
  order: {
    name: '',
    location: '',
    wholesale: false,
    status: 'NOT STARTED',
    total: 0,
    orderDetails: [],
  },
};

export const useCartStore = create<cartStoreState & cartStoreActions>((set) => ({
  ...initialState,
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
// interface OrderDetail {
//   id?: number;
//   quantity: number;
//   price: number;
//   unitId: number;
//   productId: number;
//   equivalency?: number;
// }
// interface Order {
//   id?: number;
//   date?: Date;
//   userId?: number;
//   location: string;
//   name: string;
//   wholesale: boolean;
//   status: string;
//   total: number;
//   orderDetails: OrderDetail[];
// }
