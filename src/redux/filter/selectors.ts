import { RootState } from "../store"

export const selectCategoryId = (state: RootState) => state.filters.categoryId
export const selectOrder = (state: RootState) => state.filters.order
export const selectSortId = (state: RootState) => state.filters.sortId
export const selectPage = (state: RootState) => state.filters.page
