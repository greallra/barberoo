const mongoose = require('mongoose');
const Messages = require('./message')
//const validator = require('validator');

const conversationsSchema = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {
    timestamps: true
})

const Conversations = mongoose.model('Conversation', conversationsSchema)

module.exports = Conversations;




//delete user tasks when user is removed
// conversationsSchema.pre('remove', async function(next){
//     const user = this;
//     await Messages.deleteMany({conversation_id: user._id});
//     next();
// })


// conversationsSchema.pre('save', async function() {
//     const task = this;
//     console.log("conversationsSchema MIDDLEWARE RAN", task);
// })

// Conversations.update(
//     { _id: "5fe7139d1e36841d50608030" }, 
//     { $push: { _id: friend } },
//     done
// );

// let c1 = new Conversations({
//     users: ["5fe7139d1e36841d50608030", "5fe713d9d1a9071d64c16c62"]
// })
// c1.save(function(e, s) {
//     console.log(e);
//     console.log(s);
// })

// let callback = function(e, s){
//     console.log(e);
//     console.log(s);
// }
// let me = await Users.findOne({username: req.body.username})
// console.log("me._id", typeof me._id);
//Conversations.find( { users: "5fd0aa68afd780ce6a9dbf03"} , callback);

// res.status(201).send({user, token})

// Conversations.findOne({_id: "5fd778682aab6830e543c670"})
//   .populate('users')
//   .exec(function (err, users) {
//     if (err) return handleError(err);
//     console.log('The author is %s', users);
//     // prints "The author is Ian Fleming"
//   });