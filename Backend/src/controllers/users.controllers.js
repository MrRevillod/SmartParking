
import { MESSAGES } from "../utils/http.utils.js"
import { userModel } from "../models/user.model.js"

export const getUsers = async (req, res) => {

    try {

        const users = await userModel.find()
        if (!users) throw { status: 404, message: MESSAGES.USER_NOT_FOUND }

        res.status(200).json({ message: MESSAGES.OK, users })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const getUser = async (req, res) => {

    try {

        const id = req.params.id

        const user = await userModel.findById({ _id: id })
        if (!user) throw { status: 401, message: MESSAGES.USER_NOT_FOUND }

        res.status(200).json({ message: MESSAGES.OK, user })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const deleteUser = async (req, res) => {

    try {

        const id = req.params.id

        const user = await userModel.findByIdAndDelete({ _id: id })
        if (!user) throw { status: 401, message: MESSAGES.USER_NOT_FOUND }

        res.status(200).json({ message: MESSAGES.OK, state: MESSAGES.DELETE_USER_SUCCESS })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const updateUser = async (req, res) => {

    try {

        const id = req.params.id

        const newParams = req.body

        const user = await userModel.findByIdAndUpdate({ _id: id }, { $set: newParams, $currentDate: { updatedAt: true } })
        if (!user) throw { status: 401, message: MESSAGES.USER_NOT_FOUND }

        res.status(200).json({ message: MESSAGES.OK, state: MESSAGES.UPDATE_USER_SUCCES })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}

export const updateImage = async (req, res) => {

    try {

        const id = req.params.id
        const profilePicture = req.body

        const user = await userModel.findByIdAndUpdate({ _id: id }, { $set: profilePicture, $currentDate: { updatedAt: true } })
        if (!user) throw { status: 401, message: MESSAGES.USER_NOT_FOUND }

        res.status(200).json({ message: MESSAGES.OK, state: MESSAGES.UPDATE_PROFILE_PICTURE })

    } catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || MESSAGES.UNEXPECTED })
    }
}