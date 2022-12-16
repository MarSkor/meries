import React from 'react'
import NoImage from "../../assets/No-image.png";
import apiConfig from '../../api/apiConfig';
import { Link } from 'react-router-dom';
import { truncateString } from '../../utils/functions';

const CastList = (props) => {
  // console.log("people", props)

  return (
    <div className='person card'>
    <Link className="card-link" to={`/person/${props.id}`}>
        <div className="person__image">
            <img 
            className='card-img'
            src={props.profile_path ? (apiConfig.w500Img(props.profile_path)) : NoImage } 
            alt={props.name} />
        </div>
        <div className="card-body">
            <span className="card-body__title">
              <h3>{truncateString(props.character, 20) || "Unavailable"}</h3>
            </span>
            <span className="card-body__name">
              
              <h4>{truncateString(props.name, 20) || truncateString(props.original_name, 20)}</h4>
            </span>
        </div>
    </Link>
    </div>
  )
}

export default CastList