const router = require('express').Router();
const {
  getUrers,
  getUserById,
  updateProfile,
  updateAvatar,
  login,
} = require('../controllers/users');

router.get('/users', getUrers);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
