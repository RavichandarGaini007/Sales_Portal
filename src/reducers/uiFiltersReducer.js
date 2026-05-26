import { createSlice } from '@reduxjs/toolkit';

/**
 * UI Filters Slice - Replaces RequestContext
 * Manages global UI state for filters (division, month, year)
 * This centralizes filter state in Redux for consistency with auth state
 */

const initialState = {
  selectedDivisions: [],
  selectedMonth: new Date().getMonth() + 1,
  selectedYear: new Date().getFullYear(),
  isLoading: false,
};

export const uiFiltersSlice = createSlice({
  name: 'uiFilters',
  initialState,
  reducers: {
    /**
     * Set selected divisions
     * @param {Array} divisions - Array of division objects with { label, value }
     */
    setSelectedDivisions: (state, action) => {
      state.selectedDivisions = action.payload;
    },

    /**
     * Set selected month
     * @param {Number} month - Month number (1-12)
     */
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },

    /**
     * Set selected year
     * @param {Number} year - Year number
     */
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },

    /**
     * Set loading state
     */
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    /**
     * Reset all filters to initial state
     */
    resetFilters: (state) => {
      state.selectedDivisions = [];
      state.selectedMonth = new Date().getMonth() + 1;
      state.selectedYear = new Date().getFullYear();
    },

    /**
     * Update all filters at once (useful for batch updates)
     */
    updateAllFilters: (state, action) => {
      const { divisions, month, year } = action.payload;
      if (divisions !== undefined) state.selectedDivisions = divisions;
      if (month !== undefined) state.selectedMonth = month;
      if (year !== undefined) state.selectedYear = year;
    },
  },
});

export const {
  setSelectedDivisions,
  setSelectedMonth,
  setSelectedYear,
  setLoading,
  resetFilters,
  updateAllFilters,
} = uiFiltersSlice.actions;

export default uiFiltersSlice.reducer;
