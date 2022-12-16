import axios from 'axios';
import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';


const usePerson = () => {
    const [person, setPerson] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0);


    const API_URL = `${apiConfig.baseUrl}person/popular?api_key=${apiConfig.apiKey}&language=en-US`

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(API_URL);
                    
                setPerson(data.results);
                setTotalPage(data.total_pages);

                setError(false);
                setLoading(false);

            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchPeople();


        return () => {
            setPerson({ person: [] });
            setLoading(true);
            setError(false);
        };
    }, []);

    
    const loadMore = async() =>{
        const params = {
            page: page + 1
        }

        if(page < totalPage ){
            const { data } = await axios.get(API_URL,{params});
            setPerson(shows => [...shows, ...data.results ])
            setPage(page + 1)
        } else{
             return null;
           }
    }

    return {
        person,
        error,
        loading,
        loadMore,
     };
};

export default usePerson;