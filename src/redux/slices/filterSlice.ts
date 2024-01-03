import { createSlice } from '@reduxjs/toolkit';

export type FilterState = {
  currentPage: number,
  categoryId: number,
  searchValue: string,
  sort: { sortProperty: string; name: string; };
};

const initialState: FilterState = {
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
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    }
  },
});

export const selectSort = state => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;