const router = require("express").Router();

const { User } = require("../models/user-model");
const bcrypt = require("bcrypt");

router.post("/", async (req,res) => {
    // console.log(req.body);
    const userExist = await User.findOne({email:req.body.email});
    if(!userExist)
        return res.status(400).json({message:"Invalid email or password"});

    const validPassword = await bcrypt.compare(req.body.password,userExist.password);
    if(!validPassword)
        return res.status(400).json({message:"Invalid email or password"});

    const token = await userExist.generateAuthToken();
    res.status(200).json({data: token,message:"signing in please wait"});
})

module.exports = router;