
const express = require('express');
const app = express();
const port = process.env.PORT || 8080


app.get('/year',(req,res)=>{
    var ids = req.query
    res.json({"Season" : ids.year})
} )

console.log(port)


app.listen(port)