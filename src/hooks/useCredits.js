import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../api/apiConfig';

const useCredits = (type = 'movie', id) => {
    const [credits, setCredits] = useState({ cast: [], crew: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `${apiConfig.baseUrl}${type}/${id}/credits?api_key=${apiConfig.apiKey}&language=en-US`
                );

                setCredits(data);
                setError(false);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchCredits();
        
        return () => {
            setCredits({ cast: [], crew: [] });
            setLoading(true);
            setError(false);
        };
    }, [id, type]);

    return { cast: credits.cast, crew: credits.crew, loading, error };
};

export default useCredits;