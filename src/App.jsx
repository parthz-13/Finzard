// App.js
import { useState } from "react";
import "./App.css";
import SimpleInterest from "./components/SimpleInterest.jsx";
import CompoundInterest from "./components/CompoundInterest.jsx";
import StockInvestment from "./components/StockInvestment.jsx";
import FinancialGoal from "./components/FinancialGoal.jsx";
import EMIcalculator from "./components/EMIcalculator.jsx";

const calculators = [
  { id: "emi", name: "Loan Calculator" },
  { id: "simple", name: "Simple Interest" },
  { id: "compound", name: "Compound Interest" },
  { id: "stock", name: "Stock Investment" },
  { id: "goal", name: "Financial Goal" },
];

function App() {
  const [activeCalculator, setActiveCalculator] = useState("emi");

  return (
    <div className="app">
      <header>
        <h1>Finzard
          <span style={{ fontSize: "1.2rem" }}>Your Personal Finance Assistant</span>
        </h1>
      </header>
      
      <nav className="calculator-nav">
        {calculators.map((calc) => (
          <button
            key={calc.id}
            className={activeCalculator === calc.id ? "active" : ""}
            onClick={() => setActiveCalculator(calc.id)}
          >
            {calc.name}
          </button>
        ))}
      </nav>

      <main>
        {activeCalculator === "emi" && <EMIcalculator />}
        {activeCalculator === "simple" && <SimpleInterest />}
        {activeCalculator === "compound" && <CompoundInterest />}
        {activeCalculator === "stock" && <StockInvestment />}
        {activeCalculator === "goal" && <FinancialGoal />}
      </main>
      <footer className="footer">
  Made With <span style={{color: 'rgb(191, 64, 191)', fontWeight: 'bold'}}>♥</span> by Parth Kumar Singh
</footer>
    </div>
  );
}

export default App;
