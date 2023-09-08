import multer from 'multer';
import path from 'node:path';

import { UPLOADS_PATH } from "./env.js";
import { MIME_TYPES } from '../rules/images.rules.js';

export const avatarUpload = multer({

    storage: multer.diskStorage({

        destination: `${UPLOADS_PATH}/avatar`,

        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const cleanFilename = file.originalname.split(".")[0]
            const filename = `${cleanFilename}-${Date.now()}${ext}`

            cb(null, filename);
        },
    }),

    fileFilter: (req, file, cb) => {

        if (!MIME_TYPES.includes(file.mimetype)) {
            req.uploaded = false
            return cb(null, false)
        }

        req.uploaded = true
        cb(null, true);
    },

    limits: {
        fieldSize: 10000000
    }
})
