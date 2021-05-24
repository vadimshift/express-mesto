const router = require("express").Router();
const { getUrers, getUserById, createUser, updateProfile } = require("../controllers/users");

router.get("/users", getUrers);
router.get("/users/:userId", getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateProfile)

module.exports = router;
