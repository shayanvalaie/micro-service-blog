const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {} 

// posts = {
//     postId: {
//         postId,
//         post
//         comments: [
//             commentId,
//             comment
//         ]
//     }
// }


app.get("/posts", (req, res) => {
    res.send(posts);
});


app.post("/events", (req,res) => {
    const { type, data } = req.body;
    if (type === "PostCreated") {
  
        const {id, title} = data;
        posts[id] = {id, title, comments: []}
    }
    if (type === "CommentCreated") {
  
        const {id, content, postId, status} = data;
        const post = posts[postId]
        post.comments.push({id, content, status});
    }

    if (type === "CommentUpdated") {
        console.log(data)
        const {id, content, postId, status} = data;
        const post = posts[postId]
        comment = comment.find(comment => {
            comment.id === id;
        });

        comment.status = status;
        comment.content = content;
    }

    console.log(posts);

    res.send({})
});


app.listen(4002, () => {
    console.log("Query Listening on 4002");
});