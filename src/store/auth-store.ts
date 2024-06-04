import { createStore } from 'zustand/vanilla';

interface Person {
  firstName: string | undefined;
  lastName: string | undefined;
  role: string | undefined;
}

type AuthStore = {
  accessToken: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  role: string | undefined;

  actions: {
    setAccessToken: (accessToken: string | undefined) => void;
    setUserInformation: (user: Person | undefined) => void;
  };
};

const authStore = createStore<AuthStore>()((set) => ({
  accessToken: undefined,
  refreshToken: undefined,
  firstName: undefined,
  lastName: undefined,
  role: undefined,

  actions: {
    setAccessToken: (accessToken: string | undefined) => set({ accessToken }),
    setUserInformation: (user: Person | undefined) => set({ ...user }),
  },
}));

// Selectors to get states.
export type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

// selectors
const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions;
const selectAccessToken = (state: ExtractState<typeof authStore>) => state.accessToken;
const selectFirstName = (state: ExtractState<typeof authStore>) => state.firstName;
const selectLastName = (state: ExtractState<typeof authStore>) => state.lastName;
const selectRole = (state: ExtractState<typeof authStore>) => state.role;

// getters
export const getActions = () => actionsSelector(authStore.getState());
export const getAccessToken = () => selectAccessToken(authStore.getState());
export const getFirstName = () => selectFirstName(authStore.getState());
export const getLastName = () => selectLastName(authStore.getState());
export const getRole = () => selectRole(authStore.getState());

export { authStore, selectAccessToken, selectFirstName, selectLastName, selectRole };
