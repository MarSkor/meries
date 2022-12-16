import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../api/apiConfig';


const useSearch = (query, which) => {
    const API_URL = `${apiConfig.baseUrl}search/multi?api_key=${apiConfig.apiKey}&page=1&language=en-US&query=${query}`

    const [search, setSearch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const fetchSearch = async() => {
            try{
                setLoading(true);
                const { data } = await axios.get(API_URL)

                setSearch(data.results);
                setTotalPage(data.total_pages);

                console.log("data", data)

                setError(false);
                setLoading(false);
            } catch(error){
                // if (error.response) {
                    // // console.log(error.response.data);
                    // console.log(error.response.status);
                    // // console.log(error.response.headers);
                //   }
                if(error.response.status)
                setLoading(false)
                setError(true)
            }
        }
        fetchSearch()
        

        return () => {
            setSearch([]);
            setLoading(true);
            setError(false);
        }
    }, [query, which])


    const loadMore = async() =>{
        const params = {
            page: page + 1
        }

        if(page < totalPage ){
            const { data } = await axios.get(API_URL,{params});
            setSearch(items => [...items, ...data.results ])
            setPage(page + 1)
        } else{
             return null;
           }
    }

    return { search, loading, error, loadMore };
}

export default useSearch