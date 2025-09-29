import {React} from 'react'
import {Navigate, useNavigate, useState} from 'react'
import '../styles/ItemDetailView.css'


function SaveButton({postID, isSaved}) 
{
    const [user, setUser] = useState(null)
    const [itemSaved, setItemSaved] = useState(isSaved)
    const onClickHandler = async () => 
    {
        try
        {
            const response = await fetch(`http://localhost:3000/marketplace/save/${postID}`, {
                method: itemSaved ? "DELETE" : "POST",
                headers: {"Content-Type": "Application/JSON"},
                credentials: "include",
            })
            if (!response.ok)
            {
                throw new Error("Failed to save post.")
            }
            setItemSaved(!itemSaved)


            const data = await response.json()
            console.log("Item saved: ", data)

        }
        catch (err)
        {
            console.error("Error: ", err)
        }
    }
    return (
        <button onClick={onClickHandler} className="save-button">
            {itemSaved ? "Unsave Post": "Save Post"}
        </button>
    )
}

export default SaveButton