const { response, request } = require('express');


const pruebasPost = (req = request, res = response)=>{
    console.log(req.body);
    const body = req.body;
    res.json(
        {
            msg:'succes',
            body
        })
}

module.exports = {pruebasPost}