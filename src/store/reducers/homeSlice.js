import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    info: null,
}

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        getApiData: (state, action) => {
            state.info = action.payload;
        },

        removeApiData: (state, action) => {
            state.info = "";
        }


    }
})

export const {getApiData, removeApiData} = homeSlice.actions;
export default homeSlice.reducer;