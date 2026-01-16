const {getDb} = require("../../db/mongo");
const Task = require("../../db/models/task");
const {ObjectId} = require("mongodb");

exports.create = async (req, res, next) => {
    try {
        const db = getDb();
        const tasksCollection = db.collection(Task.collectionName);

        const { title, completed = false } = req.body;

        if (!title || typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({ error: "Title is required and must be a non-empty string" });
        }

        const taskData = { title: title.trim(), completed };
        const taskToInsert = Task.create(taskData);

        const result = await tasksCollection.insertOne(taskToInsert);

        res.status(201).json({
            _id: result.insertedId,
            ...taskToInsert
        });
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const db = getDb();
        const tasksCollection = db.collection(Task.collectionName);

        const tasks = await tasksCollection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const db = getDb();
        const tasksCollection = db.collection(Task.collectionName);

        const { id } = req.params;
        const { title, completed } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (completed !== undefined) updateData.completed = completed;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        const updateOperation = Task.prepareUpdate(updateData);

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
        const tasksCollection = db.collection(Task.collectionName);

        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid task ID" });
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
