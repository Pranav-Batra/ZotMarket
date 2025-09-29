import {React} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import NewPost from '../forms/new_item'
import "../styles/Navbar.css"

function ViewSavedPosts() {
    const navigate = useNavigate();
    return (
        <button className="nav-button saved" onClick={() => navigate('/marketplace/saved')}>View Saved Items</button>
    )
}

export default ViewSavedPosts