const {getDb} = require("../../db/mongo");
const Blog = require("../../db/models/blog");
const {ObjectId} = require("mongodb");

exports.create = async (req, res, next) => {
    try {
        const db = getDb();
        const blogsCollection = db.collection(Blog.collectionName);

        const { title, body = "", author } = req.body;

        if (!title || typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({ error: "Title is required and must be a non-empty string" });
        }
        if (!author || typeof author !== "string" || author.trim() === "") {
            return res.status(400).json({ error: "Author is required and must be a non-empty string" });
        }

        const blogData = { title: title.trim(), body: body, author: author };
        const blogToInsert = Blog.create(blogData);

        const result = await blogsCollection.insertOne(blogToInsert);

        res.status(201).json({
            _id: result.insertedId,
            ...blogToInsert
        });
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const db = getDb();
        const blogsCollection = db.collection(Blog.collectionName);

        const blogs = await blogsCollection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        res.status(200).json(blogs);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => { //TODO
    try {
        const db = getDb();
        const tasksCollection = db.collection(Blog.collectionName);

        const { id } = req.params;
        const { title, completed } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid blog ID" });
        }

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (completed !== undefined) updateData.completed = completed;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        const updateOperation = Blog.prepareUpdate(updateData);

        const result = await tasksCollection.updateOne(
            { _id: new ObjectId(id) },
            updateOperation
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({message: "updated successfully"});
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const db = getDb();
        const tasksCollection = db.collection(Blog.collectionName);

        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid blog ID" });
        }

        const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        next(err);
    }
};
