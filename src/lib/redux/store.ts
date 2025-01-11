"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AUTOMATION  from "./slices/automation";
import { useSelector, TypedUseSelectorHook } from "react-redux";

const rootReducer = combineReducers({
  automation: AUTOMATION,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;