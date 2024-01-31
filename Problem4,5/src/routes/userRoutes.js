const router = require('express').Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../utilities/middleware');

router.post('/', async (req, res, next) => {
	req.response = await userController.create(req.body);
	next();
});

router.post('/login', async (req, res, next) => {
	req.response = await userController.login(req.body);
	next();
});

router.get('/', authenticateToken, async (req, res, next) => {
	req.response = await userController.list(req.query);
	next();
});

router.get('/:id', authenticateToken, async (req, res, next) => {
	req.response = await userController.get(req.params);
	next();
});

router.put('/:id', authenticateToken, async (req, res, next) => {
	req.response = await userController.update(req.params, req.body);
	next();
});

router.delete('/:id', authenticateToken, async (req, res, next) => {
	req.response = await userController.delete(req.params);
	next();
});

module.exports = router;
