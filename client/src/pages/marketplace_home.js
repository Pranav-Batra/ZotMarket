import { React } from 'react'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Item({item}) 
{
    const navigate = useNavigate()
    const handleOnClick = () => {
        navigate(`/marketplace/${item.id}/detail`)
    }
    return (
        <div key={item.id}>
            <h2>{item.title}</h2>
            <h2>{item.price}</h2>
            <h3>{item.created_at}</h3>
            <button onClick={handleOnClick}>View in Detail</button>
        </div>
    )
}


function Home() 
{
    const [items, setItems] = useState([])
    useEffect(() => 
    {
        console.log("Effect started.")
        const fetchData = async () => {
            try
            {
                const response = await fetch('/marketplace/')
                if (!response.ok)
                {
                    throw new Error("Failed to fetch.")
                }
                const data = await response.json()
                console.log(data)
                setItems(data)
            }
            catch (err)
            {
                console.error("Error: ", err)
            }
        }
    fetchData()
    }, [])
    return (
        <div>
            <h1>Home Page</h1>
            {items.length === 0 ? 
            (<p>Loading items... </p>) : 
            (items.map((item) => {
                return <Item item={item} />
            }))}
        </div>
    )
}

export default Home