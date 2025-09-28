const express = require('express')
const db = require('../config/db')
router = express.Router()

router.get('/profiles/:user/saved', async (req, res) => {
    try
    {
        const saved_posts = await db.query('SELECT * FROM saved_items WHERE user_saving_id=$1', [req.user.id])
        res.json(saved_posts)
    }
    catch (err)
    {
        console.error("Error: ", err)
    }
})