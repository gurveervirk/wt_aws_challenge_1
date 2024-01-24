import React, { useState } from 'react';
import axios from 'axios';

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    rno: '',
  });
  const [confirmation, setConfirmation] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to the Express server
    axios.post('http://localhost:8086/submitdata', formData)
    .then(response => {
        console.log(response.data);
        // Handle success, reset form, update UI, etc.
      // Show confirmation message
      setConfirmation(`Thank you Mr./Mrs. ${formData.name},Your Data submitted successfully!`);
        
      // Reset the form
      setFormData({
        name: '',
        branch: '',
        rno: '',
      });
    })
    .catch(error => {
        setConfirmation(`Error submitting data. Please try again. Mr./Mrs. ${formData.name}`);
        console.error('Error submitting form data:', error);
      });
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Branch:
        <input type="text" name="branch" value={formData.branch} onChange={handleChange} />
      </label>
      <br />
      <label>
        Roll Number:
        <input type="text" name="rno" value={formData.rno} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    {confirmation && <p>{confirmation}</p>}
    
    </div>
  );
}

export default MyForm;
