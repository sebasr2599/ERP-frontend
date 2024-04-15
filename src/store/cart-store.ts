import { create } from 'zustand';

// TODO: remove location
// TODO: change name to client

interface cartStoreState {
  order: Order;
}
interface cartStoreActions {
  createNewOrder: (name: string, location: string, wholesale: boolean) => void;
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
  // TODO: not used anymore, remove
  // TODO: Create func to change the client

  createNewOrder: (name: string, location: string, wholesale: boolean) => {
    set((state) => ({
      order: {
        ...state.order,
        name: name,
        location: location,
        wholesale: wholesale,
        status: 'STARTED',
      },
    }));
  },
  addOrderDetail: (orderDetail: OrderDetail) => {
    set((state) => ({
      order: {
        ...state.order,
        orderDetails: [...state.order.orderDetails, orderDetail],
        total: state.order.total + orderDetail.price * orderDetail.quantity,
        // TODO: change status
        // if oderDetail > 1 set it to started
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
