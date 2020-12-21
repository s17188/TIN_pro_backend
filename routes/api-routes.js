const contactController = require('../controllers/contactController');
const soccerController = require('../controllers/soccerController')
const router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working'
    });
});

router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);
router.route('/soccers')
    .get(soccerController.all)
    .post(soccerController.new)
router.route('/soccers/:soccer_id')
    .put(soccerController.update)    

module.exports = router;