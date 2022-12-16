import React from 'react';
import usePerson from '../hooks/usePeople';
import { ErrorMessage, ItemCard, Loader, ItemCardPerson } from '../components';
import { OutlineButton } from '../components/common/button/Button';

const People = () => {

  const { person, loading, error, loadMore } = usePerson();

  if(loading){
    return <Loader/>
  }

  if(error){
    return <ErrorMessage message="An error occured"/>;
  }

  return (
    <div className="homepage-wrap page-wrap">
      <main>
        <section className="row">
          <h1>Popular People</h1>
            {person ? (
              <div className='list'>
                {person.map(p => <ItemCardPerson key={p.id} {...p}/>)}
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

export default People