import React from 'react';

const AdList = ({ ads }) => {
  return (
    <div className="mt-4">
      <h1 className="mb-4">Classified Ads</h1>
      <ul className="list-group">
        {ads.length === 0 ? (
          <li className="list-group-item">No advertisements found.</li>
        ) : (
          ads.map(ad => (
            <li className="list-group-item" key={ad._id}>
              <h2>{ad.title}</h2>
              <p>{ad.description}</p>
              <p className="text-success">${ad.price}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdList;
