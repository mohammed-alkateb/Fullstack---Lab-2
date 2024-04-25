import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowEmployeeData from './pages/ShowEmployeeData';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* home route*/}
        <Route path='/' element={<ShowEmployeeData />} />
      </Routes>
    </Router>
  )
}

export default App
