const express = require('express');
const router = new express.Router();
const User = require('../models/user');

// Get all Users
router.get('/admin/users/all', async (req,res)=>{ 
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})
// Get all user email and type
// router.get('/users', auth, async (req,res)=>{ 
//     try {
//         const users = await User.find({})
//         const filterUsers = users.map((user) => { return {email: user.email, type: user.user_type} })
//         res.status(200).send(filterUsers)
//     } catch (e) {
//         res.status(400).send({error: e.message})
//     }
// })

module.exports = router;