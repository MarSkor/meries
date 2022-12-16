import axios from 'axios';
import { useEffect, useState } from 'react';
import apiConfig from '../api/apiConfig';


const useReviews = (type = 'movie', id) => {
    const [reviews, setReviews] = useState({ reviews: []});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `${apiConfig.baseUrl}${type}/${id}/reviews?api_key=${apiConfig.apiKey}&language=en-US`
                );

                setReviews(data);
                setError(false);
                setLoading(false);
                
            } catch (err) {
                console.log(err);

                setLoading(false);
                setError(true);
            }
        };

        fetchReviews();

        return () => {
            setReviews({ reviews: [] });
            setLoading(true);
            setError(false);
        };
    }, [type, id]);

    return {
        reviews: reviews.results,
        error,
        loading
     };
};

export default useReviews;