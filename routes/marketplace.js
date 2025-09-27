const express = require('express')
const db = require('../config/db')
router = express.Router()


router.get('/', async (req, res) => {
    console.log("Marketplace GET activated.")
    try
    {
        const items = await db.query('SELECT * FROM items')
        console.log(items.rows)
        res.send(items.rows)
    }
    catch (err)
    {
        console.error(err)
        res.status(500).send("DB request failed. ")
    }
    res.send('items')
    //queries db for all posted items
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    if (req.user.id !== id)
    {
        res.status(404).send("Invalid permissions. ")
        return
    }
    const {title, description, status, price} = req.body
    console.log(`Title: ${title}, body: ${description}, status: ${status}, price: ${price}`)
    try
    {
        const updated_item = await db.query('UPDATE items SET title=$1, description=$2, status=$3, price=$4 WHERE id=$5 RETURNING *', [title, description, status, price, id])
        console.log(updated_item.rows)
        res.status(200).send("Successfully updated item.")
    }
    catch (err)
    {
        console.error("Error: ", err)
        res.status(500).send("Internal Server Error. ")
    }
    //get iitem with given id from db
})

router.post('/new', async (req, res) => {
    const {title, image_url, description, status, price} = req.body
    const userID = req.user.id
    try
    {
        const inserted_item = await db.query('INSERT INTO items (title, image_url, description, status, price, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
        [title, image_url, description, status, price, userID])
        console.log(inserted_item.rows)
        res.status(200).send("Successfully created item.")
    }
    catch (err)
    {
        console.error("Error: ", err)
        res.status(500).send("Internal Server Error.")
    }
    //get item from db ,check if user is authorized to update it
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    if (req.user.id !== id)
    {
        res.status(404).send("Invalid permissions.")
        return
    }
    try
    {
        const deleted_item = await db.query('DELETE FROM items WHERE id=$1 RETURNING *', [id])
        console.log(deleted_item.rows)
        res.status(200).send("Successfully deleted item.")
    }
    catch (err)
    {
        console.error("Error: ", err)
        res.status(500).send("Internal Server Error. ")
    }
    //get item from db, check if user is authorized, delete if they are
})

module.exports = router;