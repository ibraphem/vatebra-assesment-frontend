import { configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import combinedSlices from "./slices";


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const persistedSlices = persistReducer(persistConfig, combinedSlices);

const initStore = () => {
  let store = configureStore({
    reducer: persistedSlices,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  });
  let persistor = persistStore(store)
  return { store, persistor }
};

export default initStore();