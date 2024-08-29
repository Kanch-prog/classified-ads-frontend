import React, { useEffect, useState } from 'react';
import AdList from './AdList'; 

const UserAds = () => {
  const [userAds, setUserAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAds = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. User is not authenticated.');
        return; // Exit if no token is found
      }
      
      console.log('Fetching user ads with token:', token);
  
      try {
        const response = await fetch('/api/ads/user-ads', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch ads: ' + response.statusText);
        }
  
        const ads = await response.json();
        console.log('Fetched user ads:', ads);
        setUserAds(ads);
      } catch (error) {
        console.error('Error fetching user ads:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserAds();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Ads</h2>
      <AdList ads={userAds} />
    </div>
  );
};

export default UserAds;
