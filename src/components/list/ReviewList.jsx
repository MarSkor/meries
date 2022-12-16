import React from 'react';
import { truncateString, formatDate } from '../../utils/functions';

const ReviewList = (props) => {

  return (
    <div className='review-card'>
        <div className="author-info">
            <h4>{props.author_details?.name || props.author_details?.username}</h4>
            <h5>Rating: <span>{props.author_details?.rating || "Not given"}</span></h5>
            <p>Updated: {formatDate(new Date(props.updated_at))}</p>
        </div>
        <div className="review-content">
          <p>{truncateString(props.content,380)}</p>
        </div>
        <div className="review-footer">
          <a 
          className='link' 
          href={props.url} 
          target="_blank">
            Read full review at: themoviedb.org
          </a>
          
        </div>

    </div>
  )
}

export default ReviewList