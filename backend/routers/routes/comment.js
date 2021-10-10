const express = require("express");
const { createNewComment ,updateResturantById ,deleteResturantById } = require("../controllers/comment");

const commentRouter = express.Router();

commentRouter.post("/", createNewComment);
commentRouter.put("/:id", updateResturantById);

module.exports = commentRouter;