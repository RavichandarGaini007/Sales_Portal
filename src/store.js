import { configureStore } from '@reduxjs/toolkit';
import rootReducerWithLogout from './reducers/rootReducer';

// Configure the Redux store with the root reducer
export const store = configureStore({
  reducer: rootReducerWithLogout,
});

// export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import loginSlice from "./reducers/loginreducers";
// // import loginEmailSlice from "./reducers/homereducers";
// import getDesignationSlice from "./reducers/designationreducers";
// import getEmployeeSlice from "./reducers/employeereducers";
// import rplDataSlice from "./reducers/rpldatareducers";
// export const store = configureStore({
//   reducer: {
//     app: loginSlice,
//     // emailid: loginEmailSlice,
//     designation: getDesignationSlice,
//     empcodes: getEmployeeSlice,
//     rpldata: rplDataSlice
//   },
// });

