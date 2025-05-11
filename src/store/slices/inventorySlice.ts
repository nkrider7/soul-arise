import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../index'; // Adjust the path if needed
import { earnCoins, earnGems } from './currencySlice'; // Import actions to add coins/gems

interface Item {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'consumable';
  icon?: string;
  price?: number; // ADD this field if not yet (price of selling)
  currencyType?: 'coins' | 'gems'; // Whether it sells for coins or gems
}

interface InventoryState {
  items: Item[];
}

const initialState: InventoryState = {
  items: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

// Thunk for selling an item
export const sellItem = (itemId: string) => (dispatch: AppDispatch, getState: () => any) => {
  const { inventory } = getState();

  const item = inventory.items.find((i: Item) => i.id === itemId);
  if (item) {
    // Give user currency based on item
    if (item.currencyType === 'gems') {
      dispatch(earnGems(item.price || 0));
    } else {
      dispatch(earnCoins(item.price || 0));
    }

    // Remove item from inventory
    dispatch(removeItem(itemId));
  }
};

export const { addItem, removeItem } = inventorySlice.actions;
export default inventorySlice.reducer;
