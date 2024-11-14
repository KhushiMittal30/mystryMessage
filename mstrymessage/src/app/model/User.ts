//Designing the structred schema of entire application

//schema to avoid mongoose.schema writing all the time
// document needed : as we are using type safety through typescript;no need if using JS; mongodb mai document ki tarah schema imported

//mongoose string captial ; typescript mai smaller;


import mongoose, {Schema , Document} from 'mongoose'

//defining datatype
export interface Message extends Document{
    content: String;
    createdAt: Date;
}

const MessageSchema : Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    isVerified:boolean;
    verifyCodeExpiry:Date;
    isAcceptingMessages:boolean;
    messages: Message[];
}

const UserSchema : Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        unique:true,
    },
    email:{
        type:String,
        required:[true,'email is required'],
        match:[/.+\@.+\..+/,'please enter a valid email'],  //error throwing simultaneously
        unique:true,
    },

    password:{
        type:String,
        required:[true,'password is required'],
        unique:true,
    },

    verifyCode:{
        type:String,
        required:[true,'please verify your email'],
    },

    isVerified:{
        type:Boolean,
        default:false,        
    },

    verifyCodeExpiry:{
        type:Date,
        required:[true,'verify code expiry is required']
    },

    isAcceptingMessages:{
        type:Boolean,
        default:true,
    },

    messages: [MessageSchema],  //array of MessageSchema type
})

const UserModel = (mongoose.models.User) as mongoose.Model<User> || mongoose.model<User>("User",UserSchema)

export default UserModel;