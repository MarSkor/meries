import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, ErrorMessage, CastingItem, ProductionItem, Badge } from "../index";
import apiConfig from '../../api/apiConfig';
import { calculateAge } from '../../utils/functions';
import NoImage from "../../assets/No-image.png";
import { FiExternalLink } from "react-icons/fi";
import ScrollToTop from "react-scroll-to-top";





const PersonDetailsCard = () => {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const detailsUrl = `${apiConfig.baseUrl}person/${id}?api_key=${apiConfig.apiKey}&append_to_response=combined_credits,images,tagged_images`

  const fetchDetails = async() => {
    try{
      const res = await fetch(detailsUrl)
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


  //sorting release date by year and pushing them into an array.
  let finalObj = {};
 
  details?.combined_credits?.cast.forEach((item) => {
    //if either of release_date or first_air_date exsists split it by '-' and use the first part aka the year
    if(item.release_date || item.first_air_date){
      const date = item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0];
      if(finalObj[date]){
        finalObj[date].push(item);
      } else{
        finalObj[date] = [item];
      }
    }
  })
 

  const groupArrays = Object.keys(finalObj).map((date) => {
    return{
      date,
      items: finalObj[date]
    };
  });

  //sorting years in descending order
  groupArrays.sort((objA, objB) => Number(objB.date) - Number(objA.date),);
    
  if (loading) {
    return (
       <Loader />
    );
  }

  if(error){
    return <ErrorMessage message="An error occured"/>;
  }

  return (
    <div className='page-wrap'>
      <main className='details-person'>

        <div className="page-nav">
          <a href="#biography">
            <Badge className="badge-link">01. Biography</Badge>
          </a>
          <a className='page-link' href="#photos">
            <Badge className="badge-link">02. Photos</Badge>
          </a>
          <a className='page-link' href="#acting">
            <Badge className="badge-link">03. Acting</Badge>
          </a>
          {details.combined_credits.crew.length > 0 ? (
            <a className='page-link' href="#production">
              <Badge className="badge-link">04. Production</Badge>
            </a>
          ) : ""}
        </div>

        <section className="header-section">
          <div className="profile-poster">
            <img 
            className='profile-img' 
            src={details.profile_path ? apiConfig.w500Img(details.profile_path) : NoImage}  
            alt={details.name}/>
          </div>

          <div className="profile-info">
            <h1>{details.name}</h1>
            <div className="profile-group">
              <div>
                <h4>Known for</h4>
                <p>{details.known_for_department}</p>
              </div>
              <div>
                <h4>Born</h4>
                <p>{details.birthday} ({calculateAge(details.birthday)}) </p>
              </div>
              {details.deathday ? (
                <div>
                  <h4>Died</h4>
                  <p>{details.birthday} ({calculateAge(details.birthday)}) </p>
                </div>
              ) : ("")}
              <div>
                <h4>Place of Birth</h4>
                <p>{details.place_of_birth}</p>
              </div>
            </div>

            {details.also_known_as?.length > 0 ? (
              <div className="profile-group">
              <div>
                <h4>Also Known as</h4>
                {details?.also_known_as.map((name, i) => <p key={i}>{name}</p>)}
              </div>
            </div>
            ) : ""}
            <div>
              <h4>Full bio on IMDb</h4>
              <span>
                <a 
                className='link'
                target="_blank"
                href={`https://www.imdb.com/name/${details.imdb_id}`}>IMDb <FiExternalLink/></a>
              </span>
            </div>
          </div>
        </section>

        <hr className='h-line'/>
        
        <section className='details-section biography-section'>
          <h2 id="biography"><span className='number'>01.</span> Full biography</h2>
          <article className='article-biography'>
           {details?.biography ? (
             <>
             {details?.biography.split('\n').map((paragraph, i) => {return <p key={i}>{paragraph}</p>})}  
             </>
           ) : ("Currently no biography available.")}
          </article>
        </section>

        <hr className='h-line'/>

        <section className='details-section photo-section'>
          <div>
            <h2 id="photos"><span className='number'>02.</span> Photos</h2>
          </div>
          <div className='img-list'>
            {details?.images.profiles.length > 0 ? (
              <>
                {details?.images.profiles.slice(0,5).map((img, i) => (
                <img key={i} src={img ? apiConfig.w500Img(img.file_path) : NoImage}/>
                ))}
              </>
            ) : ("No photos to display.")}
          </div>
        </section>

        <hr className='h-line'/>

        <section className='details-section credits-section'>
          <h2 id="acting"><span className='number'>03.</span> Acting</h2>
          {groupArrays.map((item, i) => {
            return(
            <div className="casting-wrap" key={i}>
              <h3>{item.date}</h3>
              <div className="casting-list">
              {item.items.map((casting, i) =>(
               <CastingItem {...casting} key={i}/>
              ))}
              </div>
            </div>
            )
          })}
        </section>

        {details.combined_credits.crew.length > 0 ? (
        <section className='details-section credits-section'>
          <h2 id="production"><span className='number'>04.</span> Production</h2>
            {details.combined_credits.crew.map((item, i) => (
              <div className="crew-wrap">
                <ProductionItem {...item} key={i}/>
              </div>
            ))}
        </section>
        ) : ""}
        
      </main>
      <ScrollToTop smooth />
    </div>
  )
}

export default PersonDetailsCard
