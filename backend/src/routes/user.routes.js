import { Router } from "express";
import { createUser, fetchUsers, getUserData, login, signup, verifyUserController, addAddressController, deleteAddress } from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.js";
import multer from "multer"
import { verifyUser } from "../middlewares/jwtverify.js";

const upload = multer({ dest: 'temp-uploads/'});

const router = Router();

router.get("/", fetchUsers);
router.get('/user-data', verifyUser, getUserData)

router.post("/create-user", upload.single("file"), createUser);
router.get("/authentication/:token", verifyUserController); //url to verify users

router.post('/signup', upload.single('file'), signup);
router.post('/login', login);

router.post('/add-address', verifyUser, addAddressController);
router.delete('/delete-address/:id', verifyUser, deleteAddress);

export default router;