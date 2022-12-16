import axios from 'axios';
import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';


const useMovies = ( sortBy ) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0);


    const API_URL = `${apiConfig.baseUrl}discover/movie?api_key=${apiConfig.apiKey}&language=en-US&sort_by=${sortBy}`

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(API_URL);
                    
                setMovies(data.results);
                setTotalPage(data.total_pages);

                setError(false);
                setLoading(false);

            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchMovies();


        return () => {
            setMovies({ movies: [] });
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
            setMovies(movies => [...movies, ...data.results ])
            setPage(page + 1)
        } else{
             return null;
           }
    }

    return {
        movies,
        error,
        loading,
        loadMore,
     };
};

export default useMovies;