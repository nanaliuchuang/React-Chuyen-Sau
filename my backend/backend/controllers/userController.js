import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";


const authUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email:req.body.email });
if(user.password === req.body.password){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone:user.phone,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(401);
    throw new Error("Email hoặc mật khẩu không đúng");
  }
});


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic,phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("Tài khoản này đã từng được đăng ký");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    phone
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Tài khoản không tồn tại");
  }
});

const findAll = asyncHandler(async(req,res)=>{
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Xảy ra một số lỗi nên không thể thấy các bài viết",
      });
    });
});
const updateUserProfile = asyncHandler(async (req, res) => {
  
   User.findOneAndUpdate(req.params._id, req.body)
  .then(data =>{
    if(data){
      res.send(data)
    }
    else{
      res.status(400)
      throw new Error("Tài khoản không tồn tại");
    }
  })
});

export { authUser, updateUserProfile, registerUser,findAll };
