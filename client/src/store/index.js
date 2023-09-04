import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'

import auth from './auth/reducer';
import content from './content/reducer';
import statuses from './statuses/reducer';
import products from './products/reducer';

import {DispatchHelper} from "../utils/actionCreator";


const combinedReducer = combineReducers({
    auth, content, products, statuses
})

const rootReducer = (state, action) => {
    return combinedReducer(state, action)
}

export const setupStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: false
        })
    })

    DispatchHelper.dispatch = store.dispatch
    return store
}




