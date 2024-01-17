import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SortItem = {
  sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price',
  name: string;
};

export interface FilterSliceState {
  currentPage: number,
  categoryId: number,
  searchValue: string,
  sort: SortItem,
};

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sort: {
    sortProperty: 'rating',
    name: "популярності (asc)",
  }
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = +action.payload.currentPage;
      state.categoryId = +action.payload.categoryId;
      state.sort = action.payload.sort;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    }
  },
});

export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;