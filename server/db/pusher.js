const mongoose = require('mongoose');
const db = require('./mongoose')
const Messages = require('../models/message');
const User = require('../models/user');
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});
  
db.once('open', () => {
    console.log("db connected");
    //the collection string name must match in atlas exactly
    const msgCollection = db.collection('messages')
    //listen to change of collection
    const changeStream = msgCollection.watch();
    //trigger an event
    changeStream.on('change', (change) => {
        console.log("change", change.operationType);

        if(change.operationType === 'insert') {
            const newMessage = change.fullDocument;
            // 1. channel name 2. event name 3. data
            console.log(newMessage);
            User.findOne(newMessage.sender, function(e, user) {
                if(e) return console.log(e)
                console.log("user", user);
                const msg = {
                    ...newMessage,
                    sender: user
                }
                try {
                    pusher.trigger('barberoo-channel', 'new-message', msg)
                } catch (e) {
                    console.log("pusher error", e);
                }
                
            })
           
        } else {
     
        }
        if(change.operationType === 'update') {
            const updates = change.updateDescription.updatedFields;
            const message_id = change.documentKey._id
            const data = {
                ...updates,
                message_id: message_id
            }
            // 1. channel name 2. event name 3. data
            pusher.trigger('my-channel', 'updated-message', data)
        } else {

        }
    })  

})
