import React from 'react';
import { Link } from 'react-router-dom';

const CastingItem = (props) => {

  return (
    <div className='casting-item'>
        <div className="casting__content">
           <Link to={`/${props.media_type}/${props.id}`} className="link flex alignCenter">
                <h4>{props.title || props.name || props.original_title || props.original_name}</h4>
                {props.episode_count && (<p>{props.episode_count} ep as {props.character}</p>) }
                {props.media_type === "movie" ? (
                    <p>as {props.character}</p>
                ) : ""}
           </Link>
        </div>
    </div>
  )
}

export default CastingItem