import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SaveButton from '../components/save_button'
import '../styles/ItemDetailView.css'

function ItemDetailView() {
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/marketplace/${id}/detail/`)
        if (!response.ok) {
          console.log("Error, fetch failed.")
          throw new Error("failed to fetch.")
        }
        const data = await response.json()
        setItem(data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
    fetchItem()
  }, [id])

  if (!item) return <p>Loading item detail...</p>

  return (
    <div className="item-detail-container">
      {/* Left: image */}
      <div className="item-image-container">
        <img
          src="https://placehold.co/600x400"
          alt={item.title}
          className="item-image"
        />
      </div>

      {/* Right: details */}
      <div className="item-info-container">
        <h2 className="item-title">{item.title}</h2>
        <p className="item-price">${item.price}</p>
        <p className="item-description">{item.description}</p>
        <p className="item-date">Posted on {new Date(item.created_at).toLocaleDateString()}</p>
        <SaveButton postID={item.id} />
      </div>
    </div>
  )
}


export default ItemDetailView