import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/marketplace_home'
import Navbar from './components/navbar';
import ItemDetailView from './pages/item_detail_view'
import NewPost from './forms/new_item';
import {useState, useEffect} from 'react'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try
      {
          const res = await fetch('http://localhost:3000/auth/user', {
          credentials: "include"
        })
        const data = await res.json()
        if (data.loggedIn)
        {
          setUser(data.user)
        }
      }
      catch (err)
      {
        console.error("Error: ", err)
      }
    }
    fetchUser()
  }, [])
  return (
  <div>
    <Router>
      <Navbar user={user}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/marketplace/:id/detail' element={<ItemDetailView />} />
        <Route path='/marketplace/new' element={<NewPost />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
