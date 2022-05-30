import { configureStore } from "@reduxjs/toolkit"
import cryptoReducer from '../main/cryptoSlice'


export const store = configureStore({
    reducer: {
        cryptos: cryptoReducer
    }
})
