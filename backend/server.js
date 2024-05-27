const express = require('express');

const server = express();

server.use(express.json(JSON));


server.get("/", (req, res) => {
    try {
        if (req.body){
            res.status(200).json({message:"tis was a success"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
})


module.exports = server