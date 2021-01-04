helper = require('../helpers/helper')
Match = require('../models/matchModel')
jwt = require('jsonwebtoken');

exports.all = (req, res) => {
    Match.find((err, matches) => {
        if (err) {
            res.json({
              status: "error",
              message: err,
            });
        }
        res.json({
          status: "success",
          message: "Matches retrieved successfully",
          data: matches
        });
    });
};

exports.new = (req, res) => {
    let match = new Match();
    match.stadium = req.body.stadium;
    match.match_date = req.body.match_date;
    match.stats = req.body.statId
    match.save((err) => {
        if (err) {
            res.json({
              status: "error",
              message: err,
            });
        }
        res.json({
          message: 'New match created!',
          data: match
        });
    });
};
