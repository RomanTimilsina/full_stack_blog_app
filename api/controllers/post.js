import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts"

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.json(err)
            console.log(data)
        return res.status(200).json(data)
    })
}
export const getPost = (req, res) => {
    const q = `SELECT * FROM posts p
               JOIN users u on p.uid = u.id
               WHERE p.id = ?
    `
    
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err)
        const {password, ...other} = data[0]
        return res.status(200).json(other)
    })
}

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `
      INSERT INTO posts (title, \`desc\`, img, date, uid, cat)
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    const values = [
      req.body.title,
      req.body.desc,
      !req.body.img ? '' : req.body.img,
      new Date(), // better to use current date instead of hardcoded '2017-01-01'
      userInfo.id,
      req.body.cat,
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Database error");
      }
      return res.status(200).json("Post created successfully!");
    });
  });
};


export const deletePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
       
        const q = `DELETE FROM posts
        WHERE id = ? AND uid = ?;`
        db.query(q,[req.params.id, userInfo.id], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json("deleted")
    })
    })

    
}

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;

    const q = `
      UPDATE posts 
      SET title = COALESCE(?, title), \`desc\` = COALESCE(?, \`desc\`), img = COALESCE(?, img),  cat = COALESCE(?, cat)
      WHERE id = ? AND uid = ?;
    `;

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) {
        return res.status(500).json("Database error");
      }
      console.log("updating", postId)
      return res.status(200).json("Post updated successfully!");

    });
  });
};
