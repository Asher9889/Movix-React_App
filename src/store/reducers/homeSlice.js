import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    info: null,
    genres: null,
    video: null,
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
        },
        getGenresData: (state, action) =>{
            state.genres = action.payload;
        },
        getVideoData: (state, action) =>{
            state.video = action.payload;
        }


    }
})

export const {getApiData, removeApiData, getGenresData, getVideoData} = homeSlice.actions;
export default homeSlice.reducer;