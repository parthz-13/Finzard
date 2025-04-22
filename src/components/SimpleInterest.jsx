import React, { useState } from 'react';

// Helper for INR formatting
const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

function SimpleInterest() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [interest, setInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [error, setError] = useState('');

  const calculate = (e) => {
    e.preventDefault();
    setError('');
    setInterest(null);
    setTotalAmount(null);

    const P = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(years);

    if (isNaN(P) || isNaN(r) || isNaN(t) || P <= 0 || r < 0 || t <= 0) {
      setError("Please enter valid positive numbers for all fields.");
      return;
    }

    // Simple Interest Formula: SI = (P * R * T) / 100
    const SI = (P * r * t) / 100;
    setInterest(SI.toFixed(2));
    setTotalAmount((P + SI).toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h2>Simple Interest Calculator</h2>
      <form onSubmit={calculate}>
        <div className="input-group">
          <label>Principal Amount (₹)</label>
          <input
            type="number"
            value={principal}
            onChange={e => setPrincipal(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="input-group">
          <label>Annual Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={e => setRate(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="input-group">
          <label>Time Period (years)</label>
          <input
            type="number"
            value={years}
            onChange={e => setYears(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {interest && (
        <div className="results-container">
          <h3>Results</h3>
          <p>
            <strong>Simple Interest:</strong> {formatINR(interest)}
          </p>
          <p>
            <strong>Total Amount:</strong> {formatINR(totalAmount)}
          </p>
        </div>
      )}
    </div>
  );
}

export default SimpleInterest;