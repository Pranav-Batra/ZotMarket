import {React, useState, useEffect} from 'react'
import { Item } from './marketplace_home'
import '../styles/Home.css'

function SavedPosts() 
{
    const [items, setItems] = useState([])
    useEffect(() => 
    {
        const fetchData = async () => {
            try
            {
                const response = await fetch('/marketplace/saved')
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
            <h1 className="home-title">Saved Items</h1>
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

export default SavedPosts