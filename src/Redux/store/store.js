import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../rootReducer/rootReducer";

export const store = configureStore({
    reducer : rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

})
export const { dispatch } = store;
