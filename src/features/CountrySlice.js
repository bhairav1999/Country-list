import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchData: []
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addSearch: (state, action) => {
            console.log(action.payload)
            state.searchData = action.payload
        }
    }
})

export const { addSearch } = counterSlice.actions

export default counterSlice.reducer
