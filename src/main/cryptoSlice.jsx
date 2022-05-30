

import { createSlice, nanoid, createAsyncThunk, current, createSelector } from "@reduxjs/toolkit"
import axios from "axios"

const CRYPTO_URL = 'https://api.coincap.io/v2/markets'

const initialState = {
    cryptos: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 1,
    cryptosPerPage: 10
}

export const fetchCrypto = createAsyncThunk('cryptos/fetchCrypto', async () => {
    const response = await axios.get(CRYPTO_URL)
    const orderedCryptos = response.data.data.slice().sort((a, b) => (b.rank.localeCompare(a.rank)))
    console.log('fetchCrypto shoudnt appear')
    return orderedCryptos
})

const cryptoSlice = createSlice({
    name: 'cryptos',
    initialState,
    reducers: {
        cryptoSort: (state, action) => {
            console.log('action payload:', action.payload.sortOrder)
            //console.log('state.cryptos:', current(state).cryptos)
            console.log('state.cryptos:', current(state).currentCryptos)
            if(action.payload?.sortKey) {

                state.currentCryptos = state.currentCryptos.sort((a, b) => 
                    { return a[action.payload.sortKey] > b[action.payload.sortKey] ? 1 : -1})

                if (action.payload.sortOrder === 'desc') { state.currentCryptos.reverse() }

            }else {
                state.currentCryptos = current(state).currentCryptos.slice().sort((a, b) => (b.rank.localeCompare(a.rank)))
            }

        },
        paginate: (state, action) => {
            console.log('paginate number', state.status)

            state.currentPage = action.payload

            const indexOfLastCrypto = state.currentPage * state.cryptosPerPage
            const indexOfFirstCrypto = indexOfLastCrypto - state.cryptosPerPage
            const currentCryptos = state.cryptos && state.cryptos.slice(indexOfFirstCrypto, indexOfLastCrypto)

            state.currentCryptos = currentCryptos
            state.cryptosLength = state.cryptos.length

        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCrypto.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCrypto.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.cryptos = action.payload
            })
            .addCase(fetchCrypto.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllCryptos = (state) => state.cryptos.cryptos
export const selectCryptosPerPage = (state) => state.cryptos.cryptosPerPage
export const selectCryptosLength = (state) => state.cryptos.cryptosLength

export const selectCurrentCryptos = (state) => state.cryptos.currentCryptos

// Creates memoized selector
export const selectCryptosData = createSelector(
    [selectAllCryptos], (state) => state
)

//console.log('selectCryptosData', selectCryptosData)

export const getCryptoStatus = (state) => state.cryptos.status
export const getCryptoErrors = (state) => state.cryptos.error


export const { cryptoSort, paginate } = cryptoSlice.actions

export default cryptoSlice.reducer











// import { createSlice, nanoid, createAsyncThunk, current, createSelector } from "@reduxjs/toolkit"
// import axios from "axios"

// const CRYPTO_URL = 'https://api.coincap.io/v2/markets'

// const initialState = {
//     cryptos: [],
//     status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null,
//     currentPage: 1,
//     cryptosPerPage: 10
// }

// export const fetchCrypto = createAsyncThunk('cryptos/fetchCrypto', async () => {
//     const response = await axios.get(CRYPTO_URL)
//     const orderedCryptos = response.data.data.slice().sort((a, b) => (b.rank.localeCompare(a.rank)))
//     console.log('fetchCrypto shoudnt appear')
//     return orderedCryptos
// })

// const cryptoSlice = createSlice({
//     name: 'cryptos',
//     initialState,
//     reducers: {
//         cryptoSort: (state, action) => {
//             //console.log('action payload:', action.payload.sortOrder)
//             if(action.payload?.sortKey) {

//                 state.cryptos = state.cryptos.sort((a, b) => { return a[action.payload.sortKey] > b[action.payload.sortKey] ? 1 : -1})

//                 if (action.payload.sortOrder === 'desc') { state.cryptos.reverse() }

//             }else {
//                 state.cryptos = current(state).cryptos.slice().sort((a, b) => (b.rank.localeCompare(a.rank)))
//             }

//         },
//         paginate: (state, action) => {
//             console.log('paginate number', state.status)



//             state.currentPage = action.payload
//             //state.status = 'idle'
//         }
//     },
//     extraReducers(builder) {
//         builder
//             .addCase(fetchCrypto.pending, (state, action) => {
//                 state.status = 'loading'
//             })
//             .addCase(fetchCrypto.fulfilled, (state, action) => {
//                 state.status = 'succeeded'

//                 //console.log('state currentPage',state.currentPage)

//                 const indexOfLastCrypto = state.currentPage * state.cryptosPerPage
//                 const indexOfFirstCrypto = indexOfLastCrypto - state.cryptosPerPage
//                 const currentCrypto = action.payload && action.payload.slice(indexOfFirstCrypto, indexOfLastCrypto)

//                 state.cryptos = currentCrypto
//                 state.cryptosLength = action.payload.length

//                 //console.log('cryptosLength', action.payload.length)

//             })
//             .addCase(fetchCrypto.rejected, (state, action) => {
//                 state.status = 'failed'
//                 state.error = action.error.message
//             })
//     }
// })

// export const selectAllCryptos = (state) => state.cryptos.cryptos
// export const selectCryptosPerPage = (state) => state.cryptos.cryptosPerPage
// export const selectCryptosLength = (state) => state.cryptos.cryptosLength

// // Creates memoized selector
// export const selectCryptosData = createSelector(
//     [selectAllCryptos], (state) => state
// )

// //console.log('selectCryptosData', selectCryptosData)

// export const getCryptoStatus = (state) => state.cryptos.status
// export const getCryptoErrors = (state) => state.cryptos.error


// export const { cryptoSort, paginate } = cryptoSlice.actions

// export default cryptoSlice.reducer