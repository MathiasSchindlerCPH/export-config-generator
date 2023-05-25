import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormComponent from './pages/FormComponent';
import JsonPage from './pages/JsonPage';

const App = () => {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/json" element={<JsonPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;