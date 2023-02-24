import express from "express";
import passport from "../middleware/passport";
import multer from "multer";

const upload=multer();

const router=express.Router();

router.get('/login',(req,res)=>{
    res.render('login')
})


router.post('/login',upload.none(),(req, res, next)=>{
    passport.authenticate("local",(err,user)=>{
        if(err) console.log(err);
        if(!user){
            return res.send("Wrong email or password")
        }
        req.login(user,()=>{
            res.send("You are authenticated")
        })
    })(req,res,next)
})

export default router;