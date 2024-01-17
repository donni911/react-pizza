import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza } from './cartSlice';
import { RootState } from '../store';

export interface PizzasSliceState {
    items: Pizza[];
    status: string;
};
export type FetchPizzasArgs = Record<string, string>;

export enum Status {
    LOADING = 'loading',
    COMPLETED = 'completed',
    ERROR = 'error'
}

const initialState: PizzasSliceState = {
    items: [],
    status: Status.LOADING,
};

export const fetchPizzaz = createAsyncThunk<Pizza[], FetchPizzasArgs>(
    'pizza/fetchPizzazStatus',
    async (params) => {
        const { data } = await axios.get<Pizza[]>(
            `https://657c4add853beeefdb991d87.mockapi.io/items`,
            {
                params: params
            }
        );

        return data;
    }
);

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizzaz.pending, (state) => {
            state.status = Status.LOADING;
        });
        builder.addCase(fetchPizzaz.fulfilled, (state, action) => {
            state.status = Status.COMPLETED;
            state.items = action.payload;
        });
        builder.addCase(fetchPizzaz.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
});

export const findById = (id: number) => (state: RootState) => {
    return state.pizza.items.find(el => el.id == id);
};

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;