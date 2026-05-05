import { asynchandler } from "../utils/asynchandler.js";
import {ApiErrors} from '../utils/Apierrors.js'
import {User} from '../models/user.model.js'
import {uploadFilesOnCLoudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const registerUser = asynchandler (async (req, res) => {
    const {username, email, password, fullname} = req.body;

    if(
    [fullname, username, email, password].some((field) => 
    field?.trim() === "")
    ){
    throw new ApiErrors(404, "All feilds are required");
    }

    const existedUser = User.findOne({
    $or: [{ username },{ email }]
    })

    if(existedUser){
    throw new ApiErrors (409, "Username and email already existed")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiErrors (400, "Avatar must required")
    }

    const avatar = await uploadFilesOnCLoudinary(avatarLocalPath);
    const coverImage = await uploadFilesOnCLoudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiErrors (400, "Avatar must required")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        password,
        fullname,
        email,
        avatar : avatar.url,
        coverImage : coverImage?.url ||""
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiErrors(500, "Something went wrong as user is no registerd from server");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Register Successfully")
    )
    });



export {registerUser};