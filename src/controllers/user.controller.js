import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";



const registerUser = asyncHandler(async (req, res)=>{
    // Get users Detail from FrontEnd
    // validation - not empty
    // check if user already exits: username, email
    // check from images , check for avatar
    // Uplaod them to cloudinary, Avatar
    // Create user object - create entry in db
    // remove pawssword and refresh token field from response
    // check for user creation
    // return response

    const {fullName, email, username, password} = req.body
    console.log(email);

    if(
        [fullName, username, email, password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400, "All fields are required")
    }
    

//    if(fullName===""){
//     throw new ApiError(400, "Full name is required")
//    } For Beginners

    const existedUser = await User.findOne({
        $or:[{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or email  already existed ")
    }

    const check=  req.files?.avatar[0]?.path


})



export {registerUser} 