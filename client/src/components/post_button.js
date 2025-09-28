import {React} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import NewPost from '../forms/new_item'

function PostButton() {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate('/marketplace/new')}>Create New Listing</button>
    )
}

export default PostButton