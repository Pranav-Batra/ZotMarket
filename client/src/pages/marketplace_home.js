import { React } from 'react'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import FilterForm from '../forms/filter_form'
import '../styles/Home.css'

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

//TODO: ADD FILTERING SYSTEM AND EMBED IT IN LEFT OF PAGE

export function Item({item}) 
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
    const [itemsByCategory, setItemsByCategory] = useState([])

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

                
                setItemsByCategory(groupedItems)

            }
            catch (err)
            {
                console.error("Error: ", err)
            }
        }
    fetchData()
    }, [])

    const handleFilter = (filteredItems) => {
        setItems(filteredItems)
    }

    const groupedItems = items.reduce((acc, item) => {
        const category = item.category
        if (!acc[category])
        {
            acc[category] = []
        }
        acc[category].push(item)
        return acc
    }, {})

    const categoryOrder = [
        "clothing",
        "shoes",
        "furniture",
        "vehicles",
        "electronics",
        "books",
        "appliances",
        "services",
        "houseware",
        "art",
        "collectors",
        "beauty",
        "meal-swipes",
        "other",
      ];
    
      return (
        <div className="home-container">
  {/* Sidebar */}
  <aside className="filter-sidebar">
    <h2>Filters</h2>
    <FilterForm onFilter={handleFilter} />
  </aside>

  {/* Main content */}
  <main className="items-section">
    <h1 className="home-title">Marketplace</h1>

    {items.length === 0 ? (
      <p>Loading items...</p>
    ) : (
      categoryOrder.map((category) => {
        const categoryItems = groupedItems[category] || [];
        if (categoryItems.length === 0) return null; // skip empty categories

        return (
          <div key={category} className="category-section">
            <h2 className="category-title">{capitalizeFirstLetter(category)}</h2>
            <div className="items-grid">
              {categoryItems.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </div>
          </div>
        );
      })
    )}
  </main>
</div>
      );

      
}

export default Home