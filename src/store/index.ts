import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import questReducer from './slices/questSlice';


const playerPersistConfig = {
  key: 'player',
  storage: AsyncStorage,
};

const persistedQuestReducer = persistReducer({ key: 'quest', storage: AsyncStorage }, questReducer);
const persistedPlayerReducer = persistReducer(playerPersistConfig, playerReducer);

export const store = configureStore({
  reducer: {
    player: persistedPlayerReducer,
    quest: persistedQuestReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
