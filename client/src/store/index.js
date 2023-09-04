import {configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit'
import {enableMapSet} from "immer";
import auth from './auth/reducer';
import content from './content/reducer';
import statuses from './statuses/reducer';
import products from './products/reducer';

enableMapSet()
const combinedReducer = combineReducers({
    auth, content, products, statuses
})

const rootReducer = (state, action) => {
    return combinedReducer(state, action)
}

const setupStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: false
        })
    })

    return store
}

export const store = setupStore();



