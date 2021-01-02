Agent = require('../models/agentModel');
jwt = require('jsonwebtoken');

exports.login = (req,res) =>{
    Agent.findOne({'email':req.body.email}, (err,agent)=>{
        if (err || agent?.password !=req.body.password ) {
            res.status(401).json({
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
    let name = req.body.fullName.split(' ')
    agent.email = req.body.email;
    agent.password = req.body.password;
    agent.name = name[0];
    agent.surname = name[1];
    agent.save((err) => {
        if (err)
            console.log("err",err)
        let token = jwt.sign(agent.toJSON(), 'secret', { expiresIn: '24h' });    
        res.json({
          status: "success",
          message: 'New agent created!',
          token
        });
    });
};

exports.logout = (req, res) => {
    res.json({
        message: 'Success logout',
    });
};