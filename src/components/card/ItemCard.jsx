import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import apiConfig from '../../api/apiConfig';
import { truncateString } from '../../utils/functions';
import NoImage from "../../assets/No-image.png"

const ItemCard = (props) => {
  return (
    <div className='card'>
        <Link to={`/${props.media_type}/${props.id}`} className="card-link">
            <div className="card__img-wrap">
                {/* if no poster path or backdrop path, use 'NoImage' */}
                <img className='card-img' src={props.poster_path ? apiConfig.w500Img(props.poster_path || props.backdrop_path) : NoImage} alt={props.title} />
                <div className="rating flex">
                    <AiFillStar className='rating-icon'/>
                    <p>{Math.round(props.vote_average * 10 )/10}</p>
                </div>
            </div>

            <div className="card-body">
                <span className="card-body__title">
                    {props.media_type === "movie" ? (
                        <h3>{truncateString(props.title, 18) || truncateString(props.original_title, 20)}</h3>
                    ): ""}
                    {props.media_type === "tv" ? (
                        <h3>{truncateString(props.name, 18) || truncateString(props.original_name, 20)}</h3>
                    ): ""}
                </span>
                <span className="card-body__date">
                    <h4>{(props.release_date) || props.first_air_date}</h4>
                </span>
            </div>
        </Link>
    </div>
  )
}

export default ItemCard