import React, { useState } from 'react';

// Helper for INR formatting
const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

function RecurringInvestment() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [futureValue, setFutureValue] = useState(null);
  const [totalInvested, setTotalInvested] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [error, setError] = useState('');

  const calculate = (e) => {
    e.preventDefault();
    setError('');
    setFutureValue(null);
    setTotalInvested(null);
    setTotalInterest(null);

    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(rate) / 100 / 12; // Monthly rate
    const n = parseFloat(years) * 12; // Total number of months

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r < 0 || n <= 0) {
      setError("Please enter valid positive numbers for all fields.");
      return;
    }

    // SIP Formula: FV = P * [ ( (1 + r)^n - 1 ) / r ] * (1 + r)
    const FV = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const invested = P * n;
    const interest = FV - invested;

    setFutureValue(FV.toFixed(2));
    setTotalInvested(invested.toFixed(2));
    setTotalInterest(interest.toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h2>Recurring Investment Calculator (SIP/RD)</h2>
      <form onSubmit={calculate}>
        <div className="input-group">
          <label>Monthly Investment (₹)</label>
          <input
            type="number"
            value={monthlyInvestment}
            onChange={e => setMonthlyInvestment(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="input-group">
          <label>Expected Annual Return Rate (%)</label>
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
          <label>Investment Period (years)</label>
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
      {futureValue && (
        <div className="results-container">
          <h3>Results</h3>
          <p>
            <strong>Future Value:</strong> {formatINR(futureValue)}
          </p>
          <p>
            <strong>Total Invested:</strong> {formatINR(totalInvested)}
          </p>
          <p>
            <strong>Total Interest Earned:</strong> {formatINR(totalInterest)}
          </p>
        </div>
      )}
    </div>
  );
}

export default RecurringInvestment;