import { useState } from 'react';
import AgeEligibilityDatePicker from './AgeEligibilityDatePicker';

export default function PreRegistrationForm() {
  const [birthdate, setBirthdate] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Add submission logic here
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pre-Registration Form</h2>
      <div>
        <label>Child's Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <AgeEligibilityDatePicker onDateChange={setBirthdate} />
      <button type="submit" disabled={!birthdate || !name}>Submit</button>
      {submitted && <p>Form submitted! We will contact you soon.</p>}
    </form>
  );
}
