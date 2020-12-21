// api-routes.js
// Initialize express router
const router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working'
    });
});
// Import contact controller
const contactController = require('../controllers/contactController');
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);
router.route('/contactsasd')
    .get(contactController.asd)    
// Export API routes
module.exports = router;