import React from 'react';
import useTvShows from '../hooks/useTvShows';
import { ErrorMessage, ItemCard, Loader } from '../components';
import { Button } from '../components';
// import { useForm, Controller } from "react-hook-form";
import { sortTvBy } from '../utils/themoviedb';

const Tv = () => {
  const { shows, loading, error, loadMore } = useTvShows(sortTvBy[1].value);

  if(loading){
    return <Loader/>
  }

  if(error){
    return <ErrorMessage message="An error occured"/>;
  }


  return (
    <div className="tv-wrap page-wrap">
      <main>
        

        <section className='tv-series row'>
            <h2>TV Shows</h2>
            {shows ? (
              <div className='list'>
                {shows && shows.map(show => <ItemCard key={show.id} {...show} media_type="tv" />)}
              </div>
            ) : null }
        </section>

        <div className="btn-wrap">
          <Button 
          title="load more movies" 
          onClick={loadMore}>
          {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      </main>
    </div>
  )
}

export default Tv