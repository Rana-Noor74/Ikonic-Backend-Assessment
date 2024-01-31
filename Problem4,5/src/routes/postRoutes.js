const router = require('express').Router();
const postsController = require('../controllers/postsController');
const { authenticateToken } = require('../utilities/middleware');

router.get('/', authenticateToken, async (req, res, next) => {
	req.response = await postsController.list(req.query);
	next();
});

router.get('/:id', authenticateToken, async (req, res, next) => {
	req.response = await postsController.get(req.params);
	next();
});

router.post('/', authenticateToken, async (req, res, next) => {
	req.response = await postsController.create(req.body);
	next();
});

router.put('/:id', authenticateToken, async (req, res, next) => {
	req.response = await postsController.update(req.params, req.body);
	next();
});

router.delete('/:id', authenticateToken, async (req, res, next) => {
	req.response = await postsController.delete(req.params);
	next();
});

module.exports = router;
