import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from "./loginreducers";
import uiFiltersSlice from "./uiFiltersReducer";

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
    app: loginSlice,
    uiFilters: uiFiltersSlice,
});

// Create a special "root" reducer that resets all state to initial values on logout
const rootReducerWithLogout = (state, action) => {
  if (action.type === 'user/logout') { // Change 'user/logout' to match your logout action type
    state = undefined;
  }
  return rootReducer(state, action);
};

export default rootReducerWithLogout;