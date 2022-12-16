import React, { useState } from 'react';
import useMovies from '../hooks/useMovies';
import { ErrorMessage, ItemCard, Loader } from '../components';
import { OutlineButton } from '../components/common/button/Button';
import { sortMovieBy } from '../utils/themoviedb';


const Movies = () => {
  const [sortBy] = useState(sortMovieBy[0].value)
  const { movies, loading, error, loadMore } = useMovies(sortBy);


  if(loading){
    return <Loader/>
  }

  if(error){
    return <ErrorMessage message="An error occured"/>;
  }



  return (
    <div className="homepage-wrap page-wrap">
      <main>
        <section className='trending-movie row'>
            <h2>Movies</h2>
            {movies ? (
              <div className='list'>
                {movies && movies.map(movie => <ItemCard key={movie.id} {...movie} media_type="movie" />)}
              </div>
            ) : null }
        </section>

        <div className="btn-wrap">
          <OutlineButton 
          title="load more movies" 
          className="load-more" 
          onClick={loadMore}>
          {loading ? 'Loading...' : 'Load More'}
          </OutlineButton>
        </div>

      </main>
    </div>
  ) 
}

export default Movies