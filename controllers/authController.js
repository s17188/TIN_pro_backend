Agent = require('../models/agentModel');
var jwt = require('jsonwebtoken');

exports.login = (req,res) =>{
    Agent.findOne({'email':req.body.email}, (err,agent)=>{
        if (err || agent.password !=req.body.password ) {
            res.json({
              status: "error",
              message: err,
            });
        }else{
            let token = jwt.sign(agent.toJSON(), 'secret', { expiresIn: '24h' });
            res.json({
                status: "success",
                message: "Contacts login successfully",
                token
            });
        }
    })
}

exports.new = (req, res) => {
    let agent = new Agent()
    agent.email = req.body.email;
    agent.password = req.body.password;
    agent.name = req.body.name;
    agent.surname = req.body.surname;
    agent.save((err) => {
        if (err)
            console.log("err",err)
        res.json({
          message: 'New agent created!',
          data: agent
        });
    });
};

exports.logout = (req, res) => {
    res.json({
        message: 'Success logout',
    });
};