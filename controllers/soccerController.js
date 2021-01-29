helper = require('../helpers/helper')
Soccer = require('../models/soccerModel')
jwt = require('jsonwebtoken');

exports.test = (req,res) => {
    res.json({
      message: "Soccer"
    })
}

exports.all = (req, res) => {
    Soccer.find((err, soccers) => {
        if (err) {
            res.json({
              status: "error",
              message: err,
            });
        }
        res.json({
          status: "success",
          message: "Soccers retrieved successfully",
          data: soccers
        });
    }).populate({
      path:'stats', 
      select:'playtime redCards yellowCards',
      populate:{
        path:'match',
        select:'stadium match_date'
      }
    });
};

exports.new = (req, res) => {
    let soccer = new Soccer();
    soccer.name = req.body.name;
    soccer.surname = req.body.surname;
    soccer.birthdate = req.body.birthdate;
    soccer.nationality = req.body.nationality;
    soccer.height = req.body.height,
    soccer.weight = req.body.weight,
    soccer.gender = req.body.gender,
    soccer.price = req.body.price,
    soccer.desc = req.body.desc,
    soccer.agentId = req.body.agentId,
    soccer.age = req.body.birthdate ? helper.calcAge(req.body.birthdate) : null
    soccer.save((err) => {
        if (err)
            console.log("err",err)
        res.json({
          message: 'New soccer created!',
          data: soccer
        });
    });


};

exports.update = (req, res) => {
    Soccer.findById(req.params.soccer_id, (err, soccer) => {
        if (err)
            res.send(err);
        soccer.name = req.body.name;
        soccer.surname = req.body.surname;
        soccer.birthdate = req.body.birthdate || '';
        soccer.nationality = req.body.nationality || '';
        soccer.height = req.body.height || null,
        soccer.weight = req.body.weight || null,
        soccer.gender = req.body.gender,
        soccer.price = req.body.price || null,
        soccer.desc = req.body.desc || ''
        soccer.age = req.body.birthdate ? helper.calcAge(req.body.birthdate) : null
        soccer.save((err) => {
            if (err)
              res.json(err);
            res.json({
              message: 'Soccer Info updated',
              data: soccer
            });
        });
    });
};

exports.delete = (req, res) => {
  Soccer.remove({
      _id: req.params.soccer_id
  }, (err, soccer) => {
      if (err)
        res.json({
          status: "error",
          message: err,
        });
      res.json({
        status: "success",
        message: 'Soccer deleted'
      });
  });
};

exports.agentSoccers = (req, res) => {
  let decoded = jwt.verify(req.body.token,'secret')
  Soccer.find(({agentId:decoded._id}), (err, soccers) => {
      if (err)
        res.json(err);
      res.json({
        message: 'Soccer Info retrieved successfully',
        data: soccers
      });
  }).populate({
    path:'stats', 
    select:'playtime redCards yellowCards',
    populate:{
      path:'match',
      select:'stadium match_date'
    }
  });
};