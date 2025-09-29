import React, { useState } from 'react';

function FilterForm({ onFilter }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Build query params
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (date) params.append('uploadedAfter', date);

    try {
      const response = await fetch(`/marketplace?${params.toString()}`);
      if (!response.ok) 
      {
        throw new Error('Failed to fetch filtered items');
      }
      const data = await response.json();
      console.log('Filtered items:', data);

      // Pass filtered items back up to parent (Home page)
      if (onFilter) onFilter(data);
    } catch (err) {
      console.error('Error fetching filtered items:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">-- All --</option>
        <option value="clothing">Clothing</option>
        <option value="shoes">Shoes</option>
        <option value="furniture">Furniture</option>
        <option value="vehicles">Vehicles</option>
        <option value="electronics">Electronics</option>
        <option value="books">Books</option>
        <option value="appliances">Appliances</option>
        <option value="services">Services</option>
        <option value="houseware">Houseware</option>
        <option value="art">Art</option>
        <option value="collectors">Collectors</option>
        <option value="beauty">Beauty</option>
        <option value="meal-swipes">Meal-Swipes</option>
        <option value="other">Other</option>
      </select>

      <label>
        Minimum Price
        <input
          type="number"
          step="1"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </label>

      <label>
        Maximum Price
        <input
          type="number"
          step="1"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </label>

      <label htmlFor="date-filter">
        Uploaded After
        <input
          id="date-filter"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <button type="submit">Apply Filters</button>
    </form>
  );
}

export default FilterForm;
