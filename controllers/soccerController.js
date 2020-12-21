helper = require('../helpers/helper')
Soccer = require('../models/soccerModel')

exports.test = (req,res) => {
    res.json({
      message: "Soccer"
    })
}

exports.all = (req, res) => {
    Soccer.get((err, soccers) => {
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
    soccer.sex = req.body.sex,
    soccer.price = req.body.price,
    soccer.desc = req.body.desc,
    soccer.age = helper.calcAge(req.body.birthdate)
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
        soccer.birthdate = req.body.birthdate;
        soccer.nationality = req.body.nationality;
        soccer.height = req.body.height,
        soccer.weight = req.body.weight,
        soccer.sex = req.body.sex,
        soccer.price = req.body.price,
        soccer.desc = req.body.desc
  
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