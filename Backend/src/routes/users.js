
import { Router } from "express"
import { sessionValidation } from "../middlewares/session.mw.js"
import { ownerValidation, roleValidation } from "../middlewares/roles.mw.js"
import { getUsers, getUser, deleteUser, updateUser } from "../controllers/users.controllers.js"


const router = Router()

router.get("/", sessionValidation, roleValidation(["ADMIN_ROLE"]), getUsers)

router.get("/:id", sessionValidation, ownerValidation, getUser)

router.delete("/:id", sessionValidation, ownerValidation, deleteUser)

router.put("/:id", sessionValidation, ownerValidation, updateUser)

export default router