import React, { useEffect, useState } from 'react';
import AdForm from './AdForm';
import PaymentForm from './PaymentForm';
import axios from 'axios';

const UserDashboard = ({ isLoggedIn }) => {
  const [view, setView] = useState('viewPosts'); 
  const [userAds, setUserAds] = useState([]); // State for storing user ads
  const [loading, setLoading] = useState(false); // State for loading indicator
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  // Fetch user's ads when the component mounts or when view changes to 'viewPosts'
  useEffect(() => {
    if (view === 'viewPosts' && isLoggedIn) {
      const fetchUserAds = async () => {
        setLoading(true); // Set loading state
        try {
          const response = await axios.get('https://classified-ads-backend-production.up.railway.app/api/ads/user-ads', {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in the headers for authentication
            },
          });
          setUserAds(response.data); // Set the fetched ads to state
        } catch (error) {
          console.error('Error fetching user ads:', error);
        } finally {
          setLoading(false); // Reset loading state
        }
      };

      fetchUserAds();
    }
  }, [view, isLoggedIn, token]); // Re-run effect when view changes or user login status changes

  return (
    <div className="container mt-4">
      <h2>User Dashboard</h2>
      <div className="mb-4">
        <button className="btn btn-primary me-2" onClick={() => setView('addPost')}>
          Add Post
        </button>
        <button className="btn btn-secondary me-2" onClick={() => setView('viewPosts')}>
          View Posts
        </button>
        <button className="btn btn-success" onClick={() => setView('payment')}>
          Payment Integration
        </button>
      </div>

      {view === 'addPost' && isLoggedIn && <AdForm />}
      {view === 'viewPosts' && (
        <div>
          {loading ? ( // Loading state
            <p>Loading your ads...</p>
          ) : (
            <div>
              {userAds.length === 0 ? ( // No ads available message
                <p>You have not posted any ads yet.</p>
              ) : (
                <ul className="list-group">
                  {userAds.map(ad => (
                    <li key={ad._id} className="list-group-item">
                      <h5>{ad.title}</h5>
                      <p>{ad.description}</p>
                      <p>Price: ${ad.price}</p>
                      {/* Additional actions like edit/delete can go here */}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
      {view === 'payment' && <PaymentForm />}
    </div>
  );
};

export default UserDashboard;
