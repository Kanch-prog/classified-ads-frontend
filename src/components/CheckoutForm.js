import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      try {
        const { id } = paymentMethod;
        // Include any necessary tokens or session info if required
        const response = await axios.post('https://your-backend-url/api/payment', {
          id,
          // Optionally add an auth token if needed
          // token: localStorage.getItem('token'),
        });

        if (response.data.success) {
          setPaymentSuccess('Payment successful!');
          setPaymentError(null);
        } else {
          setPaymentError('Payment failed.');
          setPaymentSuccess(null);
        }
      } catch (error) {
        setPaymentError('Payment failed. Please try again.');
        setPaymentSuccess(null);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe} className="btn btn-primary mt-4">
        Pay
      </button>
      {paymentError && <div className="text-danger mt-2">{paymentError}</div>}
      {paymentSuccess && <div className="text-success mt-2">{paymentSuccess}</div>}
    </form>
  );
};

export default CheckoutForm;
