import React, { useState } from 'react';
import apiConfig from '../../api/apiConfig';
import useCredits from "../../hooks/useCredits";
import useReviews from "../../hooks/useReviews";
import { AiFillStar } from "react-icons/ai";
import NoBackdropImage from "../../assets/NoBackdrop.jpg"
import NoPoster from "../../assets/No-image.png"
import { Badge, CastList, ReviewList, Button } from "../index"
import { toHoursAndMinutes, toLanguageName } from '../../utils/functions';
import { OutlineBadge } from '../common/badge/Badge';
import ScrollToTop from "react-scroll-to-top";

const MovieDetailsCard = (props) => {
  const [castExpanded, setCastExpanded] = useState(false)
  const [reviewsExpanded, setReviewsExpanded] = useState(false)

  const { cast } = useCredits(props.media, props.id);
  const { reviews } = useReviews(props.media, props.id);

  const castForDisplay = castExpanded ? cast : cast?.slice(0,10)
  const reviewsForDisplay = reviewsExpanded ? reviews : reviews?.slice(0,4)



  return (
    <div className="media-details-wrap page-wrap">
      <section className="media-section">
        
        <div className="media-header">
          {/* FULL HEIGHT BACKGROUND IMAGE */}
          <div className="media-bg">
            <img 
              className='media-bg-img' 
              src={props.backdrop_path ? (apiConfig.ogImage(props.backdrop_path)) : NoBackdropImage } 
              alt={props.title} 
            />
          </div>
          
          
          <div className="media-content">
            <div className="header-info grid-container content-container">
            
              <div className="links">
                <a href="#cast" title='View Cast'><Badge className="badge-link">Cast</Badge></a>
                <a href="#reviews" title='View Reviews'><Badge className="badge-link">Reviews</Badge></a>
              </div>
              
              {/* POSTER */}
              <div className="header-info__poster-wrap first-column">
                <img 
                className='header-info__media-poster'
                src={props.poster_path ? (apiConfig.w500Img(props.poster_path)) : NoPoster }  
                alt={props.title} />          
              </div>

              <div className="header-info__content middle-column">
                <div className="title">
                  <h1>{props.title || props.original_title}</h1>
                  <span>
                    <p>Original Language: {toLanguageName.of(props.original_language)}</p>
                  </span>
                </div>

                <div className="info-group media-stats flex">
                  <div className="alignCenter">
                    <Badge>{(props.media).toUpperCase()}</Badge>
                    <Badge className="alignCenter">
                      <AiFillStar className='rating-icon mr color-brand'/>
                      {Math.round(props.vote_average * 10) / 10}
                    </Badge>
                  </div>
                  <div className="alignCenter">
                    <div className="alignCenter  dot-group">
                      <span className="dot mr"></span>
                      <p className=''>{toHoursAndMinutes(props.runtime)}</p>
                    </div>
                    <div className="alignCenter  dot-group">
                      <span className="dot mr"></span>
                      <p>{props.status} ({props.release_date})</p>
                    </div>
                  </div>
                </div>

                <div className="info-group group-genres flex">
                {props.genres && props.genres.map((genre, i) => (
                  <OutlineBadge key={i}>{genre.name}</OutlineBadge>
                ))}
                </div>

                <div className="overview">
                  <p>{props.overview}</p>
                </div>

              </div>

              <div className="production last-column">
                <div className="column-group">
                  <div className='pd-group'>
                    {props.production_companies.length > 0 ? (
                      <div>
                      <h4>Production Companies</h4>
                      {props.production_companies.map((by) => (
                          <span key={by.name}><p>{by.name}</p></span>
                      ))}
                      </div>
                    ): null}
                  </div>

                  <div className='pd-group'>
                    {props.production_countries.length > 0 ? (
                      <div>
                      <h4>Production Countries</h4>
                      {props.production_countries.map((by) => (
                          <span key={by.name}><p>{by.name}</p></span>
                      ))}
                      </div>
                    ): null}
                  </div>

                  <div className='watch-trailer'>
                      <Button>Watch Trailer</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='media-section'>
        <div className='content-container scroll-to'>
          <div className="flex space-between">
            <h2 id='cast'>Cast</h2>
            {cast.length > 0 ? (
              <span className='viewmore' onClick={() => setCastExpanded(!castExpanded)}>
                {castExpanded ? 'View Less ⭫' : `View All (${cast?.length}) ⭭`} 
              </span>
            ) : ""}
          </div>
          <div className="list row">
            {cast?.length > 0 ? 
            (castForDisplay.map((review, i) => (
            <CastList key={i} {...review}/>
            ))) : (
              <p>Currently No Available Cast</p>
            )}
          </div>
        </div>
      </section>

      <section className='review-section media-section'>
        <div className='content-container scroll-to'>
          <div className="flex space-between">
            <h2 id='reviews'>Reviews</h2>
            {reviews?.length > 0 ? (
              <span className='viewmore' onClick={() => setReviewsExpanded(!reviewsExpanded)}>
                {reviewsExpanded ? `View Less ⭫` : `View All (${reviews?.length}) ⭭`}
              </span>
            ): ""}
          </div>
          <div className="review-list">
                {reviews?.length > 0 ? (reviewsForDisplay.map((review, i) => (
                  <ReviewList key={i} {...review}/>
                ))) : (
                  <p>Currently No Reviews</p>
                )}
          </div>
        </div>
        <ScrollToTop smooth />
      </section>
    </div>
  )
}

export default MovieDetailsCard