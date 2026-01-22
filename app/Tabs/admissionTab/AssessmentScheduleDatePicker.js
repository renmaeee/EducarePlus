import { useState } from 'react';

export default function AssessmentScheduleDatePicker({ onSchedule }) {
  const [date, setDate] = useState('');

  function handleChange(e) {
    setDate(e.target.value);
    if (onSchedule) onSchedule(e.target.value);
  }

  return (
    <div>
      <label>Assessment Date:</label>
      <input type="date" value={date} onChange={handleChange} />
    </div>
  );
}
