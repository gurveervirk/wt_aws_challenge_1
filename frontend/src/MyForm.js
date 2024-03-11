import React, { useState } from 'react';
import axios from 'axios';

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    branch: 'CSE', // Set a default value for the branch
    rno: '',
    image: null,
  });
  const [confirmation, setConfirmation] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('branch', formData.branch);
    formDataToSend.append('rno', formData.rno);
    formDataToSend.append('image', formData.image);

    axios.post('http://localhost:8086/submitdata', formDataToSend)
      .then(response => {
        console.log(response.data);
        setConfirmation(`Thank you Mr./Mrs. ${formData.name}, Your Data submitted successfully!`);
        setFormData({
          name: '',
          branch: 'CSE',
          rno: '',
          image: null,
        });
      })
      .catch(error => {
        setConfirmation(`Error submitting data. Please try again. Mr./Mrs. ${formData.name}`);
        console.error('Error submitting form data:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="branch" className="form-label">Branch</label>
          <select className="form-control" id="branch" name="branch" value={formData.branch} onChange={handleChange} required>
            <option value="CSE">CSE</option>
            <option value="CSD">CSD</option>
            <option value="CSM">CSM</option>
            <option value="IT">IT</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="rno" className="form-label">Roll Number</label>
          <input type="text" className="form-control" id="rno" name="rno" value={formData.rno} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="image" className="form-label">Profile Picture</label>
          <input type="file" className="form-control" id="image" name="image" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {confirmation && <p className="mt-3 text-success">{confirmation}</p>}
    </div>
  );
}

export default MyForm;
