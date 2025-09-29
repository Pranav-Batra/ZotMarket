import {React} from 'react'
import {useState} from 'react' 
import { useNavigate } from 'react-router-dom'
import '../styles/ItemDetailView.css'


function DeleteButton({postID, className}) 
{
    const navigate = useNavigate()
    const onClickHandler = async () => 
    {
        try
        {
            const response = await fetch(`http://localhost:3000/marketplace/${postID}`, {
                method: "DELETE",
                headers: {"Content-Type": "Application/JSON"},
                credentials: "include",
            })
            if (!response.ok)
            {
                throw new Error("Failed to delete post.")
            }

            const data = await response.json()
            console.log("Item deleted: ", data)
            alert("Deleted item.")

        }
        catch (err)
        {
            console.error("Error: ", err)
        }
        finally
        {
            navigate('/')
        }
    }
    return (
        <button className={className} onClick={onClickHandler}>
            Delete Post
        </button>
    )
}

export default DeleteButton