import React, { useState } from 'react';
import MyForm from './MyForm';
import AjaxAxiosGetDB from './AjaxAxiosGetDB';

function DisplayComponents(props) {
  const [showMyForm, setShowMyForm] = useState(false);
  const [showData, setShowData] = useState(false);

  const handleRegisterClick = () => {
    setShowMyForm(true);
    setShowData(false);
  };

  const handleGetDataClick = () => {
    // Activate only if it's not already active
    setShowData((prevShowData) => !prevShowData);
    setShowMyForm(false);
  };

  return (
    <div>
      <button onClick={handleRegisterClick}>Register</button>
      <span style={{ margin: '0 10px' }}></span>
      <button onClick={handleGetDataClick}>GetData</button>
      {showMyForm ? <MyForm /> : null}
      {showData ? <AjaxAxiosGetDB /> : null}
    </div>
  );
}

export default DisplayComponents;
