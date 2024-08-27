import React, {useEffect, useState} from 'react'
import fetchDataFromApi from '../utils/axios'

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getDataFromApi = async () =>{
      try{
        setData(null)
        setLoading(true)
        const res = await fetchDataFromApi(url)
        // console.log(res)
        setData(res)
        setLoading(false);
      }catch (err) {
        setError(err)
        console.log("Some Error Found During Fetch Hook Call", err)
      }
      finally{
        return {data, loading, error}
      } 
    }
    
    useEffect(()=>{
      getDataFromApi()
    },[url])

    return {data, loading, error}
 
}

export default useFetch
