// src/store/slices/currencySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  coins: number;
  gems: number; // Optional second currency
}

const initialState: CurrencyState = {
  coins: 0,
  gems: 0,
};



const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    earnCoins: (state, action: PayloadAction<number>) => {
      state.coins += action.payload;
    },
    spendCoins: (state, action: PayloadAction<number>) => {
      if (state.coins >= action.payload) {
        state.coins -= action.payload;
      }
    },
    earnGems: (state, action: PayloadAction<number>) => {
      state.gems += action.payload;
    },
    spendGems: (state, action: PayloadAction<number>) => {
      if (state.gems >= action.payload) {
        state.gems -= action.payload;
      }
    },
    resetCurrency: () => initialState,
  },
});

export const {
  earnCoins,
  spendCoins,
  earnGems,
  spendGems,
  resetCurrency,
} = currencySlice.actions;

export default currencySlice.reducer;
