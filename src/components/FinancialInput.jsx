import React from "react";

// FinancialInput Component
export const FinancialInput = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  min,
  max,
  step,
  placeholder,
  helpText,
  prefix,
  suffix,
  error,
  fullWidth = false,
}) => {
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`w-full px-3 py-2 bg-background border rounded-md ${
            error ? 'border-destructive' : 'border-input'
          } ${
            prefix ? 'pl-8' : ''
          } ${
            suffix ? 'pr-8' : ''
          }`}
        />
        
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      
      {helpText && !error && (
        <p className="mt-1 text-xs text-muted-foreground">{helpText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
};

// FinancialRangeInput Component
export const FinancialRangeInput = ({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  displayValue,
  helpText,
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="input-label">
          {label}
        </label>
        {displayValue && (
          <span className="text-sm font-medium">{displayValue}</span>
        )}
      </div>
      
      <input
        id={id}
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
      />
      
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      
      {helpText && (
        <p className="mt-1 text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
};

// FinancialSelect Component
export const FinancialSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  helpText,
  error,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 bg-background border rounded-md ${
          error ? 'border-destructive' : 'border-input'
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {helpText && !error && (
        <p className="mt-1 text-xs text-muted-foreground">{helpText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
};

// FinancialResult Component
export const FinancialResult = ({
  label,
  value,
  type = "default",
  helpText,
}) => {
  const typeStyles = {
    default: "text-foreground",
    success: "text-finance-success",
    warning: "text-finance-warning",
    info: "text-finance-info",
  };
  
  return (
    <div className="mb-4 p-4 bg-card rounded-md border">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className={`text-xl font-bold mt-1 ${typeStyles[type]}`}>{value}</div>
      
      {helpText && (
        <p className="mt-1 text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
};

// CalculatorCard Component
export const CalculatorCard = ({
  title,
  children,
  icon,
}) => {
  return (
    <div className="calculator-card p-6">
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-accent">{icon}</div>}
        <h2 className="finance-card-title">{title}</h2>
      </div>
      {children}
    </div>
  );
};