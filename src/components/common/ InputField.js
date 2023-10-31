/**
 * InputField is a reusable React component for rendering an input field in a form.
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.type - The type of input field (e.g., 'text', 'password', 'number').
 * @param {string} props.id - The unique identifier for the input field.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - A callback function to handle changes in the input field value.
 *
 * @returns {JSX.Element} The rendered input field component.
 */


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
