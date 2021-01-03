const statController = require('../controllers/statController');
const matchController = require('../controllers/matchController');
const soccerController = require('../controllers/soccerController')
const authController = require('../controllers/authController')
const router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working'
    });
});

router.route('/auth/login')
    .post(authController.login)
router.route('/auth/register')
    .post(authController.new)
router.route('/auth/sign-out')
    .post(authController.logout)    
router.route('/soccers')
    .get(soccerController.all)
    .post(soccerController.new)
router.route('/soccers/:soccer_id')
    .put(soccerController.update)
    .delete(soccerController.delete);    
router.route('/soccers/agent')
    .post(soccerController.agentSoccers)
router.route('/soccers/stat')
    .post(statController.new)
router.route('/soccers/match')
    .post(matchController.new)         
module.exports = router;