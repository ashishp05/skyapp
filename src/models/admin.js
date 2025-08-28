import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const adminSchema = new mongoose.Schema({

    name : {
        type : String ,
        trim : true ,
        required : [true , "name is required."]
    },
    email : {
        type : String ,
        trim : true ,
        required : [true , "email is required."],
         match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
        "Please enter a valid email address",
      ],
      lowercase : true
    },
    password : {
        type : String ,
        minLength : [8 , 'Password have min length is 8.'],
        trim : true,
        required :[ true , "password is required."]
    },
    userType : {
        type : Number,
        enum : [ 1,2],  // 1 ==> Admin , 2==> user
        default : 1
    },
    tokens : [
        {
            _id : false,
            token : {
                type : String ,
                trim  : true
            }

        }
    ]
},
{
timestamps : true ,
toJSON : {
    transform : function (doc ,ret)
    { 
        delete ret.__v,
        delete ret.password
        delete ret.tokens
    }
}
})

adminSchema.methods.isValidAuth = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.isValidPassword = async function (password) {
  const regEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regEx.test(password);
};

adminSchema.methods.createAuthToken = function () {
  const token = jwt.sign(
    {
      _id: (this._id + "").toString(),
    },
    process.env.JWT_ADMIN_PK
  );
  return token;
};

adminSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 8);
  next();
});
const Admin =  mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default  Admin  