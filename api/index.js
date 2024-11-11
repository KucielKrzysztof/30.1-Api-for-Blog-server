import express from "express";
import bodyParser from "body-parser";
import { posts } from "../models/posts.js";

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", (req, res) => {
	res.json(posts);
});
//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const indexOfPost = posts.findIndex((p) => p.id === id);
	if (indexOfPost != -1) {
		res.json(posts[indexOfPost]);
	} else {
		res.status(404).json({ message: "No post with given id" });
	}
});
//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
	const date = new Date();
	var id = 0;
	if (posts.length > 0) {
		id = posts.slice(-1)[0].id + 1;
	} else {
		id = 1;
	}
	const newPost = {
		id: id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		date: date.toISOString(),
	};
	posts.push(newPost);
	res.json({ message: "Post added" });
	console.log(posts);
});
//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const indexOfPost = posts.findIndex((p) => p.id === id);
	if (indexOfPost != -1) {
		if (req.body.title) posts[indexOfPost].title = req.body.title;
		if (req.body.content) posts[indexOfPost].content = req.body.content;
		if (req.body.author) posts[indexOfPost].author = req.body.author;
		res.json({ message: "Post updated" });
	} else {
		res.status(404);
	}
});
//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const indexOfPost = posts.findIndex((p) => p.id === id);
	if (indexOfPost != -1) {
		posts.splice(indexOfPost, 1);

		res.status(201).json({ message: "Post deleted" });
	} else {
		res.status(404);
	}
});
//Listening
app.listen(port, () => {
	console.log(`API is running at http://localhost:${port}`);
});
