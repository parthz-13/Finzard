import React, { useState } from 'react';

// Helper for INR formatting
const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

function EMICalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [error, setError] = useState('');

  const calculate = (e) => {
    e.preventDefault();
    setError('');
    setEmi(null);
    setTotalPayment(null);
    setTotalInterest(null);

    const P = parseFloat(principal);
    const r = parseFloat(rate) / 1200; // Monthly interest rate
    const n = parseFloat(years) * 12;  // Total number of payments

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r < 0 || n <= 0) {
      setError("Please enter valid positive numbers for all fields.");
      return;
    }

    // EMI Formula: [P x r x (1+r)^n] / [(1+r)^n-1]
    const emiValue = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiValue * n;
    const totalInt = totalPay - P;

    setEmi(emiValue.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
    setTotalInterest(totalInt.toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h2>Loan/EMI Calculator</h2>
      <form onSubmit={calculate}>
        <div className="input-group">
          <label>Loan Amount (₹)</label>
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
          <label>Loan Tenure (years)</label>
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
      {emi && (
        <div className="results-container">
          <h3>Results</h3>
          <p>
            <strong>Monthly EMI:</strong> {formatINR(emi)}
          </p>
          <p>
            <strong>Total Payment:</strong> {formatINR(totalPayment)}
          </p>
          <p>
            <strong>Total Interest Paid:</strong> {formatINR(totalInterest)}
          </p>
        </div>
      )}
    </div>
  );
}

export default EMICalculator;