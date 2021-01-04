const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//middleware in model is code that runs just before something is saved
//advantage is not to have to do this in every route
//to do this we had to extract the schema

const work_photo_schema = new mongoose.Schema({ 
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    buffer: { type: Buffer },
    size: { type: Number }
});

const userSchema = new mongoose.Schema({
    user_type: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('age must be over 0')
            }
        }
    },
    password : {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if(value.includes('password')) {
                throw new Error('cannot use this password choice')
            }
        }
    },
    short_summary: {
        type: String,
        trim: true
    },
    pricing: {
        basic: {
            type: Number
        },
        special_1: {
            type: Number
        },
    },
    geo: {
        name: {
            type: String
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
    },
    work_photos: [work_photo_schema],
    rating: {
        aggregate_rating: {
            type: String
        },     
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            description: { type: String },
            timestamps: true,
            review_by: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Users'
            } 
        }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    //creates createdAt and updatedAt fields on each entry
    timestamps: true
})
//not stored in db, just allows mongoose to know who owns what and relationship
//allows user to get all tasks onto an instance without saving to db
// userSchema.virtual('tasks', {
//     ref: 'Task', //model name
//     localField: '_id', //where localdata is stored
//     foreignField: 'owner' //name of field on task
// })


//https://stackoverflow.com/questions/39708841/what-is-the-use-of-mongoose-methods-and-statics

//toJSON is a model method function that runs on model to filter what we send back to user
//and allows delete....
userSchema.methods.toJSON = function () {
    const user = this;
    console.log("toJSON ran");
    // console.log("user",user);
    //below is so we can use object methods on it such as delete
    const userObject = user.toObject()
    // console.log("userObject",userObject);

    //delete stuff user doesnt need
    delete userObject.password;
    delete userObject.tokens;
    //we dont need to send this, data too bigm send it on the url specific url  //send if user has an avatar
    userObject.avatar = !!userObject.avatar;
    //send work photos length
    const workPhotoIds = userObject.work_photos.map( photo => {
        return {
            _id: photo._id
        }
    })
    userObject.work_photos = workPhotoIds;
   

    return userObject
}

//token method
//methods - these are used on instances: user (lowercase)
userSchema.methods.generateAuthToken = async function (){
    console.log("generate auth token ran");
    const user = this;
    //generate token : use the users id to sign
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token;
}


//statics - these are used on Models: User
userSchema.statics.findByCredentials = async (email, password)=>{
    console.log("findByCredentials ran");
    //no need for this binding
    //find user by email
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Email doesn\'t exist');
    }
    //if found compare
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Incorrect password');
    }
    //return user if found
    return user;
}

//HASING BEFORE SAVING
//pre runs before something is saved
//must use non arrow function because we need this
userSchema.pre('save', async function(next){
    console.log("pre save ran");
    const user = this;
    //this refers to the document(user passed into save function), ie below example

    //then i can do something to the data before saving to db (like hashing)
    //HASHING
    //only hash if it has been changed
    //true on first password creation and changed
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    
    console.log("MIDDLEWARE: just before saving");
    next();
    //next tells us that async function is done and to move on
    //if we didnt call it programm would hang
})

//delete user tasks when user is removed
// userSchema.pre('remove', async function(next){
//     const user = this;
//     await Task.deleteMany({owner: user._id});
//     next();
// })

const User = mongoose.model('User', userSchema)

const callback = (e,s)=>{
    console.log(s.avatar)
    
}
module.exports = User;
