import { createSlice } from '@reduxjs/toolkit';
import { Pizza } from '../../components/PizzaBlock';

export type CartState = {
    totalPrice: number,
    items: Pizza[];
};

const initialState: CartState = {
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

        addItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }

            cartSlice.caseReducers.calculateTotalPrice(state);
        },

        removeItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if (findItem) {
                findItem.count--;
            } else {
                state.items.slice(findItem, 1);
            }
            cartSlice.caseReducers.calculateTotalPrice(state);
        },

        deleteItem(state, action) {
            console.log(action);

            state.items = state.items.filter(obj => obj.id !== action.payload.id);

            cartSlice.caseReducers.calculateTotalPrice(state);
        },

        clearItems(state) {
            state.items = [];
            cartSlice.caseReducers.calculateTotalPrice(state);
        },
    },
});


export const selectCart = (state) => state.cart;

export const selectCartItem = (id) => (state) => state.cart.items.find(obj => obj.id === id);

export const { addItem, removeItem, clearItems, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;