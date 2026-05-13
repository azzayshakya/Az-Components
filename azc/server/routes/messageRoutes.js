const router = require("express").Router();
const { getMessages, markRead } = require("../controllers/messageController");

router.get("/:userId/:otherId", getMessages); //get conversation bw two users
router.patch("/read", markRead);

module.exports = router;
