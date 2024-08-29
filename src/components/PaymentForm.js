import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; 

// Load your Stripe publishable key
const stripePromise = loadStripe('your-publishable-key-here');

const PaymentForm = () => {
  return (
    <div className="container mt-4">
      <h2>Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentForm;
