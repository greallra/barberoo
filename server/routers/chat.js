const express = require('express');
const router = new express.Router();
const Conversations = require('../models/conversations');
const User = require('../models/user')
const auth = require('../middleware/auth')
const Messages = require('../models/message')

//CREATE CONVERSTATION 
router.post('/chat/create', async (req, res)=>{
    try {
        // Need the two ids
        const client_id = req.body.client_id;
        const barber_id = req.body.barber_id;
        //create conversation
        const c1 = new Conversations({
            users: [client_id, barber_id]
        })
        const admin_id = "5fe79d3a1163cc3704696bc1"
        const saveConversation = await c1.save()
        const conversation_id = saveConversation._id;
        const m1 = new Messages({
            conversation_id,
            text: 'conversation intiated',
            sender: admin_id
        })
        const savedMessages =  await m1.save()
        

        res.status(200).send([savedMessages])
        //     res.status(201).send(activeMessages)
    
       
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.message})
    }
})
//GET ACTIVE MESSAGES
router.post('/chat/messages', auth,  async (req, res) => {
    try {
        const activeMessages = await Messages.find({conversation_id: req.body.conversation_id}).populate('sender')
        res.status(200).send(activeMessages)
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})
//CREATE MESSAGE
router.post('/chat/message', auth,  async (req, res) => {
    try {
        const m1 = new Messages({
            conversation_id: req.body.conversation_id,
            text: req.body.text,
            sender: req.user._id
        })
        const savedMessage = await m1.save() 
        res.status(200).send()
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})

//GET MY CONVERSATIONS
router.get('/chat/conversations', auth,  async (req, res) => {
    try {
        //find me
        //get all conversations arrays im in and populate them with the users
        Conversations.find({ users: req.user._id })
            .populate('users')
            .exec(function (e, conversations) {
                console.log("test", conversations);
                if (e) return res.status(400).send({error: e.message})
                //filter me
                res.status(201).send({ me: req.user, conversations })
            });
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.message})
    }
})

//delete Conversation
router.delete('/chat/conversations/:id', auth,  async (req, res) => {
    try {
        //find me
        //get all conversations arrays im in and populate them with the users
        const deletedConversation = await Conversations.findOneAndDelete({_id: req.params.id})
        //will need to delete associated messages eventually
        //const deletedMessages = await Conversations.deleteMany({conversation_id: deletedConversation._id})

        res.send(deletedConversation);
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.message})
    }
})

module.exports = router;