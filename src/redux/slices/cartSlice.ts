import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Pizza = {
    id: string | number;
    imageUrl: string;
    title: string;
    types: (string | number)[];
    sizes: number[];
    price: number;
    category?: number;
    count: number;
    rating?: number;
};

export interface CartSliceState {
    totalPrice: number,
    items: Pizza[];
};

const initialState: CartSliceState = {
    totalPrice: 0,
    items: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        calculateTotalPrice(state) {
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum,
                0);
        },

        addItem(state, action: PayloadAction<Pizza>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }

            cartSlice.caseReducers.calculateTotalPrice(state);
        },

        removeItem(state, action: PayloadAction<string | number>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);

            if (findItem) {
                findItem.count--;
            } else {
                state.items.slice(findItem, 1);
            }
            cartSlice.caseReducers.calculateTotalPrice(state);
        },

        deleteItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id);

            cartSlice.caseReducers.calculateTotalPrice(state);
        },

        clearItems(state) {
            state.items = [];
            cartSlice.caseReducers.calculateTotalPrice(state);
        },
    },
});

export const selectCart = (state: RootState) => state.cart;

export const selectCartItem = (id: string | number) => (state: RootState) => state.cart.items.find(obj => obj.id === id);

export const { addItem, removeItem, clearItems, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;