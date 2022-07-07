const express = require('express');
const {
  getUsers, getUserInfo, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
