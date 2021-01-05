const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth'); //middleware
const multer = require('multer');
const sharp = require('sharp');
const { findOneAndDelete } = require('../models/user');
// const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account');

//SIGNUP 
router.post('/users', async (req, res)=>{
    //create new user instance 
    const user = new User(req.body);
    try {
        //save user
        await user.save();
        //sendWelcomeEmail(user.email, user.name);
        //send the user back and a token that will be stored in their localstorage
        const token = await user.generateAuthToken();
        res.status(201).send({user, token})
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.message})
    }
})
//DELETE USER
router.delete('/users/me', auth, async (req, res) => {
    try {
        await User.findOneAndDelete({_id: req.user._id})
        res.send("user deleted")
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})
//LOGIN
router.post('/users/login', async (req, res)=>{
    try {
        //custom middleware -- static middleware function because we use it on Model - User
        const user = await User.findByCredentials(req.body.email, req.body.password);
        
        //creating a custom middleware -- method middleware function because we use it on instance - user
        //send token
        const token = await user.generateAuthToken();
        
        //save token(s) to db
        user.tokens = user.tokens.concat({token: token});
        await user.save();
        
        // send back user and token to client- if error isnt thrown above this below line will run
        //toJSON is a model method function that runs on model to filter what we send back to user
        res.send({user, token});
    } catch (e) {
        console.log("my error", e.message);
        res.status(400).send({error: e.message});
    }
})
// Get Profile
router.get('/users/me', auth, async (req,res)=>{
    //auth was already done
    res.send(req.user)
})
// Get all Barbers
router.get('/users/barbers', auth, async (req,res)=>{ 
    try {
        const babers = await User.find({user_type: 'BARBER'})
        res.status(200).send(babers)
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})
// Get all user email and type
router.get('/users', auth, async (req,res)=>{ 
    try {
        const users = await User.find({})
        const filterUsers = users.map((user) => { return {email: user.email, type: user.user_type} })
        res.status(200).send(filterUsers)
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})

router.patch('/users/me', auth, async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email','password','age'];
    //check the properties to update are allowed
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    /*
    const options = {
        new: true, //return the updated user
        runValidators: true
    }
    */
    try {
        //changed findByIdAndUpdate to findById because pre.save(middleware) wont work on former
        const user = req.user;
        //then dynamically update user 
        updates.forEach((update)=>{
            user[update] = req.body[update]
        })
        //now middleware will run
        await user.save();
        res.status(200).send(user);
    } catch (e) {
        console.log("e catch",e);
        //could be 2 types of erros, 1: server, 2: validation
        //2: validation
        res.status(400).send(e);
    }
})

//AVATAR
const upload = multer({
    //by removing dest, the data is passed into the function (route below: req.file)
    // dest: 'avatars',
    limits: {
        //1mb = one million
        fileSize: 1000000,  
    },
    // filter certain files
    fileFilter(req, file, cb) {
        //to throw error cb(new Error('file must be pdf'))
        //success = cb(undefined, true)
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            return cb(new Error('images only'))
        }
        cb(undefined, true)
    }
})

//'upload' needs to match key in postman
//2 middlewares is possible
router.post('/users/me/avatars', auth, upload.single('avatar') , async (req, res)=>{
    const _id = req.user._id;
 
    //using sharp here
    //convert to png (all images will be png) + resize
    const buffer = await sharp(req.file.buffer).resize({width:250, height: 250}).png().toBuffer()
    //because middleware is in place, req may not even get here below
    //all images checking has been done in middleware
    // req.user.avatar = buffer;
    User.findByIdAndUpdate({_id}, { avatar: buffer }, function(e, s){
        //if(e) return res.status(400).send({error: e.message});
        console.log(e, s);
    })
    //await req.user.save()
    res.send("avatar uploaded successfully");
    //redner html src="data:images;base64,[data]"
    //this 4th param handles an error that is throw
}, (error, req, res, next)=>{
    console.log(error);
    //will receive an error thrown in a middleware function

    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatars', auth, async(req, res)=>{
    req.user.avatar = undefined; 
    const user = await req.user.save();
    res.send(user);
}, (error, req, res, next)=>{
    //will receive an error thrown in a middleware function

    res.status(400).send({error: error.message})
})

//url to paste in browser http://localhost:3000/users/5f1ea7b14888f3644abe20e5/avatar
router.get('/users/:id/avatar', async(req, res)=>{
    
    try {
        const user = await User.findById(req.params.id);
        // if(!user || !user.avatar) {
        //     throw new Error();
        // }
        //set a response header
        //its automatically set to application/json
        //here we seding images
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        console.log("e",e);
        res.status(404).send({error: e.message});
    }
})
// Add work photos config
const uploadMany = multer({
    //by removing dest, the data is passed into the function (route below: req.file)
    // dest: 'avatars',
    limits: {
        //1mb = one million
        fileSize: 1000000,  
    },
    // filter certain files
    fileFilter(req, files, cb) {
        console.log("files", files);
        //to throw error cb(new Error('file must be pdf'))
        //success = cb(undefined, true)
        // if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
        //     return cb(new Error('images only'))
        // }
        cb(undefined, true)
    }
})
// Add work photos
router.post('/users/me/work_photos', auth, uploadMany.array('photos', 12), async (req, res) => {
    let _id = req.user._id;
    let results = []
    for(let count = 0; count < req.files.length; count ++) {
        const buffer = await sharp(req.files[count].buffer).resize({width:250, height: 250}).png().toBuffer() 
        results.push({
            ...req.files[count],
            buffer
        })
    }
    User.update(
        {_id}, 
        // { $push: { work_photos: { title: "test", image: b}  } }, 
        {$push: {work_photos: {$each: results} }}, {upsert:true},
        function(e, s){
            if(e) return res.send({error: e})
            return res.send(200)
    })
})

// View work photo
router.get('/users/:user_id/:photo_id/work_photos', async(req, res)=>{  
    try {
        const user = await User.findById(req.params.user_id);
        const photo = user.work_photos.find( photo => photo._id == req.params.photo_id);
        res.set('Content-Type', 'image/png');
        res.send(photo.buffer);
    } catch (e) {
        console.log("e",e);
        res.status(404).send({error: e.message});
    }
})
// Delete work photo
router.delete('/users/me/work_photos/:photo_id', auth, async(req, res)=>{
    const photo_id = req.params.photo_id
    
    const filteredOutPhotos = req.user.work_photos.filter( photoObject => photoObject._id != photo_id )
    req.user.work_photos = filteredOutPhotos
    const user = await req.user.save();
    res.send(user);
}, (error, req, res, next)=>{
    //will receive an error thrown in a middleware function

    res.status(400).send({error: error.message})
})

// User.deleteMany({}, function (e, s) {
//         console.log(e,s);
// })

module.exports = router;