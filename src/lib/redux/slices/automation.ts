import { duplicateValidation } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AutomationState = {
  trigger?: {
    type?: "COMMENT" | "DM";
    keywords?: string[];
    keyword?: string;
    types?: string[];
  };
};
const initialState: AutomationState = {
  trigger: {
    type: undefined,
    keywords: [],
    keyword: undefined,
    types: [],
  },
};

export const AUTOMATION = createSlice({
  name: "automation",
  initialState,
  reducers: {
    TRIGGER: (state, action: PayloadAction<AutomationState>) => {
      state.trigger!.types = duplicateValidation({
        arr: state.trigger!.types!,
        el: action.payload.trigger?.type!,
      });
      return state;
    },
  },
});

export const { TRIGGER } = AUTOMATION.actions;

export default AUTOMATION.reducer;