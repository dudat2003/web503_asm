import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { __dirname } from '../server'

const router = Router()

router.get("/demo", (req, res) => {
    const html = fs.readFileSync(path.join(__dirname, "/pages/home.html"))
    console.log(html);
    res.end("upload image")
})

const upload = multer({
    limits: {
        fileSize: 1 * 1024 * 1024
    }
})

router.post("/image", upload.single('image'), async (req, res) => {
    const imageName = Date.now() + ".png"
    const imagePath = path.join(__dirname, `/public/${imageName}`)
    await sharp(req.file.buffer).toFile(imagePath)
    res.end(imageName)
})

export default router