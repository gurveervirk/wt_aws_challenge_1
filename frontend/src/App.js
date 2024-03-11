import React from 'react';
import './App.css';
import DisplayComponents from './DisplayComponents';
import { BrowserRouter, Routes, Route} from 'react-router-dom'; // Import BrowserRouter
import MyForm from './MyForm';
import AjaxAxiosGetDB from './AjaxAxiosGetDB';

function App() {
  return (
    <div className="App"> 
    <BrowserRouter>  {/* Wrap the app with BrowserRouter */}
        <DisplayComponents />
        <Routes>
          <Route path="/register" element={<MyForm />} />
          <Route path="/getData" element={<AjaxAxiosGetDB />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
