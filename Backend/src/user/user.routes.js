import {Router} from 'express';
import { createUser ,loginUser,sendEmail ,
     ForgotPassword,verifyToken
    ,changePassword ,logout,getAllUsers,updateStatus
    } from './user.controller.js';

import { AdminUserGuard, verifyTokenGuard,AdminGuard  } from '../middleware/guard.js';  
// import ForgotPassword from '../../../frontend/src/components/forgotPassword/index.jsx';
const userRouter = Router();
// @Post //api//user/signup
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
// @get /api/user/logout
userRouter.get("/logout", logout);
// route for send user data to user 
userRouter.get("/get",AdminGuard , getAllUsers);
// route for send user data to user status
userRouter.put("/status/:id",AdminGuard , updateStatus);
// route for send email to user 
// userRouter.post("/sendmail",sendEmail)
userRouter.post("/send-mail", sendEmail);
//@pos //api/user/forgot-password
userRouter.post("/forgot-password", ForgotPassword);
    //@pos //api/user/forgot-password
    userRouter.post("/verify-token", verifyToken);
    // @put //api/user/change-password
    userRouter.put("/change-password", verifyTokenGuard,changePassword);
    // @get  //api/user/session
    userRouter.get("/session",AdminUserGuard, (req,res)=>{
  return res.json( req.user);
    
    })
 
export default userRouter;