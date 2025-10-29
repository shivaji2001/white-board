// Dropdown.jsx
import React from "react";

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div>
      <label>{label}: </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select Width</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
