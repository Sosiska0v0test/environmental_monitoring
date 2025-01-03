import express from "express";
import { changeUserPassword, deleteUser, deleteUserProfile, getUsers, loginUser, registerUser, updateUserProfile } from "../controller/UserController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();
// +++++++++ Public Routes +++++++++

router.post('/', registerUser);
router.post('/login', loginUser);

// +++++++++ PRIVATE ROUTES +++++++++

router.put('/', protect, updateUserProfile);
router.delete('/', protect, deleteUserProfile);
router.put('/password', protect, changeUserPassword);

// +++++++++ ADMIN ROUTES +++++++++
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);

export default router;