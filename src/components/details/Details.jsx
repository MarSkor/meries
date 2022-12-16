import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, MovieDetailsCard, TvDetailsCard } from "../index";
import apiConfig from '../../api/apiConfig';

const Details = () => {
    const { id, media  } = useParams();
    const [details, setDetails] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const params = useParams();

    const fetchDetails = async() => {
        try{
          const res = await fetch(`${apiConfig.baseUrl}${media}/${id}?api_key=${apiConfig.apiKey}`)
          if(res.ok){
            const data = await res.json();
            setDetails(data)
            setError(false);
            setLoading(false);
          }
        }catch(error){
          console.error(error)
          setLoading(false)
          setError(true);
        }
    }
  
    useEffect(() => {
        fetchDetails();
    }, [id]);
    
    if (!details) {
        return (
          <Loader />
        );
    }
  
    if(error){
        return "An error occured."
    }
  
    if(loading){
        return <Loader/>
    }


  if(params.media === "movie"){
    return(
        <MovieDetailsCard 
        media={params.media}
        {...details}
        />
    ) 
  } else if(params.media === "tv"){
    return(
        <TvDetailsCard 
        media={params.media}
        {...details}
        />
    )
  } else {
    return null
  }
}

export default Details