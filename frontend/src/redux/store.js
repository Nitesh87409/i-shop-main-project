import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './slices/UserSlice';
import AdminReducer from "./slices/AdminSlice"
import CartReducer from "./slices/CartSlice"

const makeStore = () => {
    return configureStore({
        reducer: {
            user: UserReducer,
            admin: AdminReducer,
            cart: CartReducer
        }
    });
};

const store = makeStore();

export default store
