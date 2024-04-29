import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/page/:page", async (req, res) => {
    const page = parseInt(req.params.page) || 1; // Parse the page parameter, default to 1 if not provided

    const pageSize = 2; // Number of records per page
    const skip = (page - 1) * pageSize; // Calculate the number of documents to skip
    

    let collection = await db.collection("experts");
    let results = await collection.find({})
    .skip(skip) // Skip the specified number of documents
    .limit(pageSize) // Limit the number of documents per page
    .toArray();
  
    res.send(results).status(200);
  });
  
router.get("/:tag/page/:page", async (req, res) => {

    const page = parseInt(req.params.page) || 1; // Parse the page parameter, default to 1 if not provided

    const pageSize = 1; // Number of records per page
    const skip = (page - 1) * pageSize; // Calculate the number of documents to skip
    

    let collection = await db.collection("experts");
    let results = await collection.find({ tags: { $in: [parseInt(req.params.tag)] } })
    .skip(skip) // Skip the specified number of documents
    .limit(pageSize) // Limit the number of documents per page
    .toArray();
    res.send(results).status(200);
});

export default router;
