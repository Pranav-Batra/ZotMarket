import { React } from 'react'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import '../styles/Home.css'

function Item({item}) 
{
    const navigate = useNavigate()
    const handleOnClick = () => {
        navigate(`/marketplace/${item.id}/detail`)
    }
    return (
        <div className="item-card" key={item.id}>
            <div className="item-image">
                <img src="https://placehold.co/600x400" alt={item.title}></img>
            </div>
            <div className="item-info">
                <h2 className="item-title">{item.title}</h2>
                <p className="item-price">${item.price}</p>
                <p className="item-date">{new Date(item.created_at).toLocaleDateString()}</p>
                <button className="view-button" onClick={handleOnClick}>
                    View in Detail
                </button>
            </div>
        </div>
    )
}


function Home() 
{
    const [items, setItems] = useState([])
    useEffect(() => 
    {
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
        <div className='home-container'>
            <h1 className="home-title">Markteplace</h1>
            {items.length === 0 ? 
            (<p>Loading items... </p>
            ) : (
            <div className="items-grid">
                {items.map((item) => {
                return <Item item={item} />
            })}
        </div>
    )}
    </div>
    )
}

export default Home