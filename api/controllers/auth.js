import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {

    //CHECK EXISTING USERS
    console.log('running')

    const q = "SELECT * FROM users WHERE email = ? and username = ?"

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User already exists!")

        //Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        })

         const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
       

        const r = "Insert into users(`username`, `email`, `password`) values (?)" 
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(r, [values], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json("User has been created.")
        })

    }

export const login = (req, res) => {
//CHECK USERS
console.log("running")
const q = "SELECT * FROM users WHERE username = ?"

db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err)
    if (data.length === 0) return res.status(404).json("User not found")
    
        console.log(data)
        //CHECK PASSWORD
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)
    if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!")   

    const token = jwt.sign({id: data[0].id}, "jwtkey")

    const {password, ...others} = data[0]

    res.cookie("access_token", token, {
        httpOnly: true
    }).status(200).json(others)
})
}

export const logout = (req, res) => {

}


