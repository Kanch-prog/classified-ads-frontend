import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdList = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const response = await axios.get('https://classified-ads-backend-production.up.railway.app/api/ads'); // Update to Railway URL
      setAds(response.data);
    };
    fetchAds();
  }, []);

  return (
    <div>
      <h1>Classified Ads</h1>
      <ul>
        {ads.map(ad => (
          <li key={ad._id}>
            <h2>{ad.title}</h2>
            <p>{ad.description}</p>
            <p>${ad.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdList;
