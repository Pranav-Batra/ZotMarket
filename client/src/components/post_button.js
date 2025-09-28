import {React} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import NewPost from '../forms/new_item'
import "../styles/Navbar.css"

function PostButton() {
    const navigate = useNavigate();
    return (
        <button className="nav-button login" onClick={() => navigate('/marketplace/new')}>Create New Listing</button>
    )
}

export default PostButton