import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Pizza } from '../../components/PizzaBlock';
import axios from 'axios';

export type PizzasState = {
    items: Pizza[];
    status: string;
};

const initialState: PizzasState = {
    items: [],
    status: '',
};

export const fetchPizzaz = createAsyncThunk(
    'pizza/fetchPizzazStatus',
    async (params, thunkApi) => {
        const { data } = await axios.get(
            `https://657c4add853beeefdb991d87.mockapi.io/items?limit=4`,
            {
                params: params
            }
        );

        if (data.length === 0) {
            return thunkApi.rejectWithValue('PIzza is empty');
        }

        return thunkApi.fulfillWithValue(data);
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
            state.status = 'pending';
        });
        builder.addCase(fetchPizzaz.fulfilled, (state, action) => {
            console.log(action);
            state.status = 'success';
            state.items = action.payload;
        });
        builder.addCase(fetchPizzaz.rejected, (state, action) => {
            console.log(action);
            state.status = 'error';
            state.items = [];
        });
    }
});

export const findById = id => state => {
    return state.pizza.items.find(el => el.id == id);
};

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;