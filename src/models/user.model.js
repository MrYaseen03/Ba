import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema  = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim : true,
            index : true
        },          
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim : true
        },
        fullName:{
            type: String,
            required: true,
            trim : true,
            index: true
        },
        avatar:{
            type: String, //Cloudnarry URL
            required: true,

        },
        coverImage:{
            type : String    //Cloudnarry URL
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type : String,
            required : [true,'Password is required']
        },
        refreshToken:{
            type : String
        }
        
    },
    {
        timestamps:true
    }
)

//Automatically Change and Encrypt the password before saving anything 

userSchema.pre("save", async function(next){
    // This line checks wehter the password is modified 
    if(!this.isModified("password")) return next();

    //The below line encrypt the password 
    // THis will run only if upper condition got false 
    this.password =await bcrypt.hash(this.password, 10)
    next()
})

//  This method will check the password comparison after password change
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}



userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY     
        }
    )
}







export const User = mongoose.model("User", userSchema)