import express from "express"
import authRoutes from "./routes/auth.js"
// import userRoutes from "./routes/user.js"
import postRoutes from "./routes/posts.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import multer from "multer"
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/images", express.static(join(__dirname, "/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage})
app.post("/api/upload", upload.single("file"), ( req, res) => {
    const file = req.file
    res.status(200).json({ filename: file.filename });
})

app.use("/api/auth", authRoutes)
// app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(8800, () => {
    console.log("connected ...")
})