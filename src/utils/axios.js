import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN_KEY = import.meta.env.VITE_TMDB_TOKEN_KEY;

const headers = {
    Authorization: "bearer " + TMDB_TOKEN_KEY,
}

const fetchDataFromApi = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, {
        headers: headers,
        params: params,
        })

        return data;
    } catch (error) {
        console.log("Some Error Caught During Axios Call" + error)
    }
}


export default fetchDataFromApi;


