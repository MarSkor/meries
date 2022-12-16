import axios from 'axios';
import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';

const useTrending = () => {
    const [trending, setTrending] = useState({ movies:[], tv:[], person:[] })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const movie = axios.get(`${apiConfig.baseUrl}trending/movie/day?api_key=${apiConfig.apiKey}`)
        const tv = axios.get(`${apiConfig.baseUrl}trending/tv/day?api_key=${apiConfig.apiKey}`)
        const person = axios.get(`${apiConfig.baseUrl}trending/person/day?api_key=${apiConfig.apiKey}`) //remove?

        const fetchTrending = async() => {
            try{
                setLoading(true);
                axios.all([movie,tv,person])
                .then(
                    axios.spread((...res) => {
                        const resOne = res[0].data.results;
                        const resTwo = res[1].data.results;
                        const resThree = res[2].data.results;

                        setTrending({ movies: resOne, tv: resTwo, person: resThree})
                    })
                )
                    
                setError(false);
                setLoading(false);

            }catch(error){
                setLoading(false);
                setError(true)
            }
        }
        fetchTrending();

        return () => {
            setTrending({ movies:[], tv:[], person:[] });
            setLoading(false);
            setError(false)
        }
    }, [])

    return {
        trending,
        loading,
        error
    }

  
}

export default useTrending