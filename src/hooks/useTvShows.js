import axios from 'axios';
import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';


const useTvShows = (  sortBy ) => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0);


    const API_URL = `${apiConfig.baseUrl}discover/tv?api_key=${apiConfig.apiKey}&language=en-US&sort_by=${sortBy}`

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(API_URL);
                    
                setShows(data.results);
                setTotalPage(data.total_pages);

                setError(false);
                setLoading(false);

            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchSeries();


        return () => {
            setShows({ tv: [] });
            setLoading(true);
            setError(false);
        };
    }, [sortBy]);

    
    const loadMore = async() =>{
        const params = {
            page: page + 1
        }

        if(page < totalPage ){
            const { data } = await axios.get(API_URL,{params});
            setShows(shows => [...shows, ...data.results ])
            setPage(page + 1)
        } else{
             return null;
           }
    }

    return {
        shows,
        error,
        loading,
        loadMore,
     };
};

export default useTvShows;