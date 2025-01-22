import { configureStore } from "@reduxjs/toolkit";
import lawyersReducer from "./slices/lawyerSlices";

const store = configureStore({
  reducer: {
    lawyers: lawyersReducer,
  },
});

export default store;