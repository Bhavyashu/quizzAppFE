import React from 'react';

function InputField({ label, type, id, placeholder, value, onChange }) {
  const labelStyle = {
    textAlign: 'left',
    display: 'block',
    marginBottom: '5px',
    // Add other styles as needed
  };

  return (
    <div className="form-group">
      <label htmlFor={id} style={labelStyle}>
        {label}:
      </label>
      <input
        type={type}
        id={id}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default InputField;
