import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Recommended Properties!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
           
            <CardItem
              src='images/agent1.png'
              text='Find your best investment'
                path='/services'
            />
          </ul>
        
        </div>
      </div>
    </div>
  );
}

export default Cards;