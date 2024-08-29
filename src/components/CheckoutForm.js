import React, { useState } from 'react';

const CheckoutForm = () => {
  const [amount, setAmount] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate payment processing
    if (amount <= 0) {
      setPaymentError('Please enter a valid amount.');
      setPaymentSuccess('');
      return;
    }

    // Simulate a successful payment response
    setPaymentSuccess(`Payment of $${amount} was successful!`);
    setPaymentError('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount ($)</label>
        <input
          type="number"
          className="form-control"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Pay
      </button>
      {paymentError && <div className="text-danger mt-2">{paymentError}</div>}
      {paymentSuccess && <div className="text-success mt-2">{paymentSuccess}</div>}
    </form>
  );
};

export default CheckoutForm;
