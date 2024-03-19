import React, { useState } from 'react';
import '../../css/AdminHomePage.css'
import Header from '../Header/Header';

const SupervisorHomepage = () => {
  const [cardData] = useState([
    { title: 'Card 1', content: 'Content for card 1' },
    { title: 'Card 2', content: 'Content for Card 2' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 4', content: 'Content for Card 4' },
  ]);
  
  return(
    <div>
      <Header/>
      <section className='admin-section'>
        <div className='admin-dashboard-title'><h1>Supervisor Dashboard</h1></div>
        <div className='admin-dashboard-container'>
          <div className='admin-dashboard-cards'>
          {cardData.map((card, index) => (
              <div key={index} className="admin-card">
                <h2>{card.title}</h2>
                <p>{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupervisorHomepage;