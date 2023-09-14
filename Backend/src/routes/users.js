
import { Router } from "express"
import { uploadImage } from "../middlewares/upload.mw.js"
import { sessionValidation } from "../middlewares/session.mw.js"
import { ownerValidation, roleValidation } from "../middlewares/roles.mw.js"
import { getUsers, getUser, deleteUser, updateUser, updateImage } from "../controllers/users.controllers.js"

const router = Router()

router.get("/", sessionValidation, roleValidation(["ADMIN_ROLE"]), getUsers)

router.get("/:id", sessionValidation, ownerValidation, getUser)

router.delete("/:id", sessionValidation, ownerValidation, deleteUser)

router.put("/:id", sessionValidation, ownerValidation, updateUser)

router.put("/update-image/:id", sessionValidation, ownerValidation, uploadImage, updateImage)

export default router