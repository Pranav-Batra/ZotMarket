import {React} from 'react'
import {Navigate, useNavigate, useState} from 'react'


function SaveButton({postID}) {
    const [user, setUser] = useState(null)
    const onClickHandler = async () => 
    {
        try
        {
            const response = await fetch(`http://localhost:3000/marketplace/save/${postID}`, {
                method: "POST",
                headers: {"Content-Type": "Application/JSON"},
                credentials: "include",
            })
            if (!response.ok)
            {
                throw new Error("Failed to save post.")
            }
            const data = await response.json()
            console.log("Item saved: ", data)
        }
        catch (err)
        {
            console.error("Error: ", err)
        }
    }
    return (
        <button onClick={onClickHandler}>Save Post</button>
    )
}

export default SaveButton