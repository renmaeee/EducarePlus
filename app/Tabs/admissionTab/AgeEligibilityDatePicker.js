// AgeEligibilityDatePicker.js
// Handles child birthdate selection and validates age eligibility for enrollment.
// Focused only on date selection and validation logic.
import { useState } from 'react';

export default function AgeEligibilityDatePicker({ onDateChange, minAge = 3, maxAge = 5 }) {
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');

  function validateAge(dateStr) {
    const birth = new Date(dateStr);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    if (age < minAge || age > maxAge) {
      setError(`Child must be between ${minAge} and ${maxAge} years old.`);
      return false;
    }
    setError('');
    return true;
  }

  function handleChange(e) {
    const dateStr = e.target.value;
    setBirthdate(dateStr);
    if (validateAge(dateStr)) {
      onDateChange(dateStr);
    }
  }

  return (
    <div>
      <label>Child's Birthdate:</label>
      <input type="date" value={birthdate} onChange={handleChange} />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
}
