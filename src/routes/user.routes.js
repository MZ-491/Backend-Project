import { Router } from "express";
import {registerUser} from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'

const router = Router();

router.route("/register").post(
    upload.fields(
    [
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

export default router;


/*import { Router } from "express";
import {registerUser} from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'

const router = Router();

router.post('/register', upload.single("avatar"), async (req,res) => {
    const file = req.file;
    try {
        if(!file){
            res.status(400).json({
                message : "File not uploaded successfully"
            })
        }

        res.status(200).json({
            message: "File uploaded successfully"
        })
    } catch (error) {
        res.status(500).json({
            error : error
        })
    }
})

export default router;
*/


