import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/marketplace_home'
import Navbar from './components/navbar';
import ItemDetailView from './pages/item_detail_view'

function App() {
  return (
  <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/marketplace/:id/detail' element={<ItemDetailView />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
