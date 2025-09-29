import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NewItem.css';

function NewPost() {
    const navigator = useNavigate()
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/marketplace/new/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    title,
                    image_url: imageUrl,
                    description,
                    status: "Available",
                    price,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to post item.");
            }
            const data = await response.json();
            console.log("Item created: ", data);
        } catch (err) {
            console.log("Error: ", err);
        }
        navigator('/')
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Image URL
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </label>
            <label>
                Description
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Price
                <input type="number" step="1" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <input type="submit" value="Post Item" />
        </form>
    );
}

export default NewPost;
