import { React } from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ItemDetailView()
{
    const {id} = useParams()
    const [item, setItem] = useState(null)

    useEffect(() => {
        const fetchItem = async () => {
            try
            {
                const response = await fetch(`/marketplace/${id}/detail/`)
                if (!response.ok)
                {
                    console.log("Error, fetch failed.")
                    throw new Error("failed ot fetch.")
                }
                const data = await response.json()
                console.log(data)
                setItem(data)
            }
            catch (err)
            {
                console.log("Error: ", err)
            }
        }
        fetchItem()
    }, [id])

    if (!item) return <p>Loading item detail...</p>;

    return (
        <div key={item.id}>
            <h2>{item.title}</h2>
            <h2>{item.image_url}</h2>
            <h2>{item.detail}</h2>
            <h2>{item.created_at}</h2>
        </div>
    )
}

export default ItemDetailView