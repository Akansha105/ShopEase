import jwt from "jsonwebtoken";
// to verify the cookie value and the value of secret key.we will get an id after verifying
import env from 'dotenv'
import db from "../db/conn";
db.config();
env.config();

secretKey = process.env.KEY;

// to define middleware function

const authenticate = async(req,res,next) =>{
    try{
        const getcookie = req.cookies.ShopEase;
        const verifycookie = jwt.verify(getcookie,secretKey);
        console.log(verifycookie);

        const rootuser = await db.query("SELECT * FROM users WHERE id = $1 AND token = $2",[verifycookie,getcookie])
        const rootUser = rootuser.rows[0]
        console.log(rootUser)

        if(!rootuser){throw new Error("user not found")};

        // if anybody calls for the values listed below from the router.js ...
        req.token = getcookie;
        req.rootuser = rootUser;
        req.userid = rootUser.id;

        next();
    }
    catch(err){
        res.status(401).send("Unauthorized user....no token provided");
        console.log(err);
    }
}

export default authenticate;