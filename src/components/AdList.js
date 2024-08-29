import React from 'react';
import './HomePage.css';

const AdList = ({ ads }) => {
  return (
    <div className="mt-4">
      <div className="row">
        {ads.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-warning">No advertisements found.</div>
          </div>
        ) : (
          ads.map(ad => (
            <div className="col-md-4 mb-4" key={ad._id}>
              <div className="card h-100">
                <img src={ad.imageUrl || '/images/default-image.jpg'} alt={ad.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{ad.title}</h5>
                  <p className="card-text">{ad.description}</p>
                  <p className="text-success fw-bold">${ad.price}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-success">View Details</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdList;
