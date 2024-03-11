import axios from 'axios';
import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';

function AjaxAxiosGetDB(props) {
  const [datax, setData] = useState([{ name: 'Prameela', branch: 'CSE', rno: 301, imagePath: null }]);
  const [selectedOption, setSelectedOption] = useState('all');
  const [rollNoInput, setRollNoInput] = useState('');

  const fetchData = async () => {
    try {
      let url = 'http://localhost:8086/showdata';

      if (selectedOption === 'single' && rollNoInput.trim() !== '') {
        // If the selected option is 'single' and a roll number is provided, fetch data for that roll number
        url += `/${rollNoInput.trim()}`;
      }

      const response = await axios.get(url);
      if(response.data instanceof Array) setData(response.data);
      else setData([response.data]);
    } catch (error) {
      console.log(`Error while fetching data from DB: ${error}`);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleRollNoInputChange = (event) => {
    setRollNoInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Data from MongoDB Cluster</h1>

      {/* Radio buttons for selecting the data retrieval option */}
      <form onSubmit={handleSubmit}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="dataOption"
            id="allData"
            value="all"
            checked={selectedOption === 'all'}
            onChange={handleOptionChange}
          />
          <label className="form-check-label" htmlFor="allData">
            Retrieve All Data
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="dataOption"
            id="singleData"
            value="single"
            checked={selectedOption === 'single'}
            onChange={handleOptionChange}
          />
          <label className="form-check-label" htmlFor="singleData">
            Retrieve Single Row by Roll Number
          </label>
        </div>

        {/* Input for entering the roll number (visible only when 'single' option is selected) */}
        {selectedOption === 'single' && (
          <div className="form-group mt-3">
            <label htmlFor="rollNoInput" className="form-label">
              Enter Roll Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="rollNoInput"
              name="rollNoInput"
              value={rollNoInput}
              onChange={handleRollNoInputChange}
            />
          </div>
        )}

        {/* Submit button to trigger data fetching */}
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>

      {/* Table for displaying the data */}
      <table className="table table-bordered mt-4">
        <thead className="thead-dark">
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Roll.No.</th>
            <th>Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          {datax.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.branch}</td>
              <td>{item.rno}</td>
              <td>
                {item.imagePath && (
                  <img
                    src={`${item.imagePath}`}
                    alt="Student Image"
                    className="img-fluid"
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AjaxAxiosGetDB;
