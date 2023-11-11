
import { Router } from "express"

import { uploadImage } from "../middlewares/upload.mw.js"
import { validateMongoUid } from "../middlewares/validator.mw.js"
import { sessionValidation } from "../middlewares/session.mw.js"
import { ownerValidation, roleValidation } from "../middlewares/roles.mw.js"

import { getUsers, getUser, getProfile, deleteUser, updateUser, updateImage } from "../controllers/user.controller.js"

const router = Router()

router.get("/profile", sessionValidation, getProfile)
router.get("/:id", sessionValidation, ownerValidation, validateMongoUid, getUser)
router.delete("/:id", sessionValidation, ownerValidation, validateMongoUid, deleteUser)
router.put("/:id", sessionValidation, ownerValidation, validateMongoUid, updateUser)
router.put("/update-image/:id", sessionValidation, ownerValidation, validateMongoUid, uploadImage, updateImage)
router.get("/", sessionValidation, roleValidation(["ADMIN_ROLE"]), getUsers)

export default router