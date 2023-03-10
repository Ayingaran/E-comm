const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20
    },
    userName: {
        type: String,
        require: true,
        trim: true,
        unique:true,
        index:true,
        lowercase: true
    },
    email:{
        type: String,
        require: true,
        trim: true,
        unique:true,
        lowercase: true
    },
    hash_password:{
        type: String,
        require: true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default: 'admin'
    }
}, { timestamps:true });

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compare(password, this.hash_password)
    }
}
module.export = mongoose.model('User',userSchema);

