helper = require('../helpers/helper')
Stat = require('../models/statModel')
Soccer = require('../models/soccerModel')
Match = require('../models/matchModel')
jwt = require('jsonwebtoken');

exports.all = (req, res) => {
    Stat.get((err, stats) => {
        if (err) {
            res.json({
              status: "error",
              message: err,
            });
        }
        res.json({
          status: "success",
          message: "Stats retrieved successfully",
          data: stat
        });
    }).populate({path:'match', select:'playtime redCards yellowCards match'});
};

exports.new = (req, res) => {
    let stat = new Stat();
    stat.playtime = req.body.playtime;
    stat.redCards = req.body.redCards;
    stat.yellowCards = req.body.yellowCards;
    stat.soccer = req.body.soccerId
    stat.match = req.body.matchId
    console.log(stat)
    stat.save((err) => {
        if (err) {
            res.json({
              status: "error",
              message: err,
            });
        }
        Soccer.findById({_id:stat.soccer},(err,soccer)=>{
            if (err) {
                res.json({
                  status: "error",
                  message: err,
                });
            }
            console.log(soccer)
            soccer.stats.push(stat)
            soccer.save((err)=>{
                if (err) {
                    res.json({
                      status: "error",
                      message: err,
                    });
                }
            })
        })
        Match.findById({_id:stat.match},(err,match)=>{
            if (err) {
                res.json({
                  status: "error",
                  message: err,
                });
            }
            console.log(match)
            match.stats.push(stat)
            match.save((err)=>{
                if (err) {
                    res.json({
                      status: "error",
                      message: err,
                    });
                }
            })
        })
        res.json({
          message: 'New stat created!',
          data: stat
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
        soccer.sex = req.body.sex,
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
        message: 'Soccer Info updated',
        data: soccers
      });
  });
};