import '../styles/rewards.css';
import partnersData from '../partners.json';
import { useEffect, useState } from 'react';

export const Rewards = () => {
  const [partners, setPartners] = useState(partnersData.partners);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');



  useEffect (() => {
    let newPartnersList = [...partnersData.partners];
    //function to filter partners based on filter value
    if (filter.length > 0) {
      newPartnersList = newPartnersList.filter((partner) => 
        partner.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  
    //function to sort list based on sort options
    const order = (sortOrder === 'asc') ? 1 : -1;
    newPartnersList.sort((a, b) => {
      if (sortBy === "points") {
        return (b[sortBy] - a[sortBy]) * order;
      }
      return (
          a[sortBy].localeCompare(b[sortBy]) * order
        );
    });
    //new list to be displayed after filter/sort above
    setPartners(newPartnersList);

  }, [filter, sortBy, sortOrder]);

  useEffect (() => {
    console.log(partners);
  }, [partners]);
  
  return (
    <article className='rewards-container'>
      <h1>List of Partners and Rewards</h1>
        <div>
          {/* filter input */}
          <input
            type='text'
            placeholder='Filter by name'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {/* sort by Name/points */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value='name'>Name</option>
            <option value='points'>Points</option>
            <option value='industry'>Industry</option>
          </select>
          {/* sort by Asc/Desc */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
        <section className='partners-container'>
            {partners.map((data) => (
                <div 
                key={data.id}
                className='partner-card-container'
                >
                    <h2>{data.name}</h2>
                    <img src={data.logo} alt={data.name}/>
                    <h3>{data.industry}</h3>
                    <h4>Points needed: {data.points}</h4>
                    <p>Reward: {data.reward}</p>
                    <button>Exchange Points</button>
                </div>
            ))}
        </section>
    </article>
  )
}
