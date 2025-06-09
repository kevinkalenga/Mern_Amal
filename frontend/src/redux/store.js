import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './user/userSlice.js'

// Combiner les reducers
const rootReducer = combineReducers({user: userReducer});

// config de persist
const persistConfig = {
    key: 'root',
    storage,
    version: 1
}
// https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
// persiste reducers 
const persistedReducer = persistReducer(persistConfig, rootReducer) 




export const store = configureStore({
     reducer: persistedReducer,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
     })
})

export const persistor = persistStore(store)