const router = require("express").Router();
const { getUrers, getUserById, createUser } = require("../controllers/users");

router.get("/users", getUrers);
router.get("/users/:userId", getUserById);
router.post('/users', createUser);

module.exports = router;
