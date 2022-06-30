const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/user');
const {
  createUserValidation,
  updateProfileValidation,
  updateAvatarValidation,
  userIdValidation,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', userIdValidation, getUserById);
router.post('/', createUserValidation, createUser);
router.patch('/me', updateProfileValidation, updateProfile);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
