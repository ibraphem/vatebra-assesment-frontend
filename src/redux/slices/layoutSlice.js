import {createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: true,
}

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleLayout: (state, {payload}) => {
            state.open = payload
        },
    }
})

export default layoutSlice.reducer
export const {toggleLayout} = layoutSlice.actions
