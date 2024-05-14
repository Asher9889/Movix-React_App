import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    info: null,
    genres: null,
    video: null,
    cast: null,
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
        },

        getCastData: (state, action) =>{
            state.cast = action.payload;
        }
        


    }
})

export const {getApiData, removeApiData, getGenresData, getVideoData, getCastData} = homeSlice.actions;
export default homeSlice.reducer;