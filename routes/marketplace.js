const express = require('express')
const db = require('../config/db')
router = express.Router()


router.get('/', async (req, res) => {
    try
    {
        const items = await db.query('SELECT * FROM items')
        console.log(items.rows)
        res.json(items.rows)
    }
    catch (err)
    {
        console.error(err)
        res.status(500).send("DB request failed. ")
    }
    //queries db for all posted items
})

router.get('/:id/detail', async (req, res) => {
    try
    {
        userID = null
        if (req.user)
        {
            userID = req.user.id
        }
        const detailItem = await db.query('SELECT * FROM items WHERE id=$1', [req.params.id])
        const itemID = detailItem.rows[0].id
        let userSavedOrNot = false
        if (Number.isInteger(userID))
        {
            const result = await db.query('SELECT EXISTS (SELECT 1 FROM saved_items WHERE saved_item_id = $1 AND user_saving_id = $2)', [itemID, userID])
            if (result.rows && result.rows.length > 0)
            {
                userSavedOrNot = result.rows[0].exists 
            }
        }
        console.log(`UserSaved: ${userSavedOrNot}`)
            res.json({
                item:
                {
                ...detailItem.rows[0],
                isSaved: userSavedOrNot
                }
            })
    }
        // res.json(detailItem.rows[0])
    catch (err)
    {
        console.error(err)
        res.status(500).send("DB Request Failed.")
    }
})


router.put('/:id', async (req, res) => {
    const id = req.params.id
    const user_who_posted_id = db.query('SELECT user_id FROM items WHERE id=$1', [id])
    if (req.user.id !== user_who_posted_id)
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
    console.log(req)
    const {title, image_url, description, status, price} = req.body
    const userID = req.user.id
    console.log(req.user)
    try
    {
        const inserted_item = await db.query('INSERT INTO items (title, image_url, description, status, price, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
        [title, image_url, description, status, price, userID])
        console.log(inserted_item.rows)
        res.json(inserted_item.rows)
        // res.status(200).send("Successfully created item.")
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
    const user_who_posted_id = db.query('SELECT user_id FROM items WHERE id=$1', [id])
    if (req.user.id !== user_who_posted_id)
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

router.post('/save/:id', async (req, res) => {
    const id = req.params.id
    if (!req.user)
    {
        return res.status(404).send("Invalid permissions.")
    }
    try
    {
        const saved_item = await db.query('INSERT INTO saved_items (saved_item_id, user_saving_id, created_at) VALUES ($1, $2, NOW()) RETURNING *', [id, req.user.id])
        console.log(saved_item.rows)
        res.json(saved_item)
        // res.status(200).send("Successfully saved item.")
    }
    catch (err)
    {
        console.error("Error: ", err)
        res.status(500).send("Internal Server Error.")
    }
})

router.delete('/save/:id', async (req, res) => {
    const id = req.params.id
    if (!req.user)
    {
        return res.status(404).send("Invalid permissions.")
    }
    try
    {
        const deleted_save = await db.query('DELETE FROM saved_items WHERE saved_item_id = $1 and user_saving_id = $2', [id, req.user.id])
        console.log(deleted_save.rows)
        res.json(deleted_save.rows[0])
    }
    catch (error)
    {
        console.error("Error: ", err)
        res.status(500).send("Internal Server Error.")
    }
})

router.get('/saved', async (req, res) => {
    if (!req.user)
    {
        return res.status(404).send("Invalid permissions.")
    }
    try
    {
        const saved_items = await db.query("SELECT * FROM items JOIN saved_items ON items.id = saved_items.saved_item_id WHERE saved_items.user_saving_id = $1", [req.user.id])
        res.json(saved_items.rows)
        console.log(saved_items)
    }
    catch (err)
    {
        console.error("Error: ", err)
        res.status(500).send("Internal Server Error.")
    }
})

module.exports = router;