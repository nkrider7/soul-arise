import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import questReducer from './slices/questSlice';
import currencyReducer from './slices/currencySlice'
import habitCounterReducer from './slices/habitCounterSlice'; 
import inventoryReducer from './slices/inventorySlice';
import authReducer from './slices/authSlice';

const persistedHabitCounterReducer = persistReducer({ key: 'habitCounter', storage: AsyncStorage },habitCounterReducer);
const inventoryPersistConfig = persistReducer({ key: 'inventory', storage: AsyncStorage },inventoryReducer);
const persistedQuestReducer = persistReducer({ key: 'quest', storage: AsyncStorage }, questReducer);
const persistedCurrencyReducer = persistReducer({ key: 'currency', storage: AsyncStorage }, currencyReducer);
const persistedPlayerReducer = persistReducer({key: 'player',storage: AsyncStorage,}, playerReducer);
const persistedAuthReducer = persistReducer({ key: 'auth', storage: AsyncStorage }, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    inventory: inventoryPersistConfig ,
    player: persistedPlayerReducer,
    quest: persistedQuestReducer,
    currency: persistedCurrencyReducer,
    habitCounter: persistedHabitCounterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
