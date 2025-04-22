import React, { useState } from 'react';

const COMPOUND_OPTIONS = [
  { label: "Annually", value: 1 },
  { label: "Semi-Annually", value: 2 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
  { label: "Daily", value: 365 }
];

function CompoundInterest() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [frequency, setFrequency] = useState(1);
  const [futureValue, setFutureValue] = useState(null);
  const [interestEarned, setInterestEarned] = useState(null);
  const [error, setError] = useState('');

  const calculate = (e) => {
    e.preventDefault();
    setError('');
    setFutureValue(null);
    setInterestEarned(null);

    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseInt(frequency);

    if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || P <= 0 || r < 0 || t <= 0 || n <= 0) {
      setError("Please enter valid positive numbers for all fields.");
      return;
    }

    // Compound Interest Formula: A = P * (1 + r/n)^(nt)
    const A = P * Math.pow(1 + r / n, n * t);
    setFutureValue(A.toFixed(2));
    setInterestEarned((A - P).toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h2>Compound Interest Calculator</h2>
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
        <div className="input-group">
          <label>Compounding Frequency</label>
          <select
            value={frequency}
            onChange={e => setFrequency(e.target.value)}
          >
            {COMPOUND_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <button type="submit">Calculate</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {futureValue && (
        <div className="results-container">
          <h3>Results</h3>
          <p>
            <strong>Future Value:</strong> ₹{futureValue}
          </p>
          <p>
            <strong>Total Interest Earned:</strong> ₹{interestEarned}
          </p>
        </div>
      )}
    </div>
  );
}

export default CompoundInterest;