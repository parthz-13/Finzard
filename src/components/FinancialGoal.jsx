import React, { useState } from 'react';


const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

function FinancialGoal() {
  const [targetAmount, setTargetAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [years, setYears] = useState('');
  const [rate, setRate] = useState('');
  const [requiredMonthly, setRequiredMonthly] = useState(null);
  const [error, setError] = useState('');

  const calculate = (e) => {
    e.preventDefault();
    setError('');
    setRequiredMonthly(null);

    const FV = parseFloat(targetAmount);
    const PV = parseFloat(currentSavings) || 0;
    const t = parseFloat(years);
    const annualRate = parseFloat(rate);

    if (
      isNaN(FV) || isNaN(PV) || isNaN(t) || isNaN(annualRate) ||
      FV <= 0 || PV < 0 || t <= 0 || annualRate < 0
    ) {
      setError("Please enter valid positive numbers for all fields.");
      return;
    }


    const n = t * 12;
    const r = annualRate / 100 / 12;


    const pvGrowth = PV * Math.pow(1 + r, n);
    const numerator = FV - pvGrowth;
    const denominator = (Math.pow(1 + r, n) - 1) / r;

    let pmt;
    if (denominator <= 0) {
      setError("With the given inputs, monthly savings cannot be calculated.");
      return;
    }
    pmt = numerator / denominator;

    if (pmt < 0) {
      setError("Your current savings will exceed your target with the given rate and time.");
      return;
    }

    setRequiredMonthly(pmt.toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h2>Financial Goal Planner</h2>
      <form onSubmit={calculate}>
        <div className="input-group">
          <label>Target Amount (₹)</label>
          <input
            type="number"
            value={targetAmount}
            onChange={e => setTargetAmount(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="input-group">
          <label>Current Savings (₹)</label>
          <input
            type="number"
            value={currentSavings}
            onChange={e => setCurrentSavings(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="input-group">
          <label>Years to Goal</label>
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
          <label>Expected Annual Return (%)</label>
          <input
            type="number"
            value={rate}
            onChange={e => setRate(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {requiredMonthly && (
        <div className="results-container">
          <h3>Results</h3>
          <p>
            <strong>Required Monthly Savings:</strong> {formatINR(requiredMonthly)}
          </p>
        </div>
      )}
    </div>
  );
}

export default FinancialGoal;
