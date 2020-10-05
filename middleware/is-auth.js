const express = require('express');
const jwt = require('jsonwebtoken');




const app = express();

module.exports = (req, res, next) => {
    try{
        const authHeader = req.get('Authorization');
        if(!authHeader){
            req.isAuth = false;
            return next();
        }
        const token = authHeader.split(' ')[1]; // Authorization: Bearer tokenValue
        if(!token || token === ''){
            req.isAuth = false;
            return next();
        }
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, `abc`);
        }
        catch(err){
            console.log(err);
            req.isAuth = false;
            return next();
        }
        if(!decodedToken){
            req.isAuth = false;
            return next();
        }
        req.isAuth = true;
        req.userId = decodedToken.userId;
        next();
    }
    catch(err){
        console.log(err);
        next(err)
    }
}