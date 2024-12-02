const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const noteController = require("../controller/noteController");

//ROUTE 1: Get all the notes using: GET "/api/auth/fetchallnotes"
router.get("/fetchallnotes", fetchuser, noteController.FetchAllNotes);

//ROUTE 2: Add a note using: POST "/api/auth/addnote"
router.post("/addnote", fetchuser, noteController.AddNote);

//ROUTE 3: Update an existing note using: PUT "/api/auth/updatenote"
router.put("/updatenote/:id", fetchuser, noteController.UpdateNote);

//ROUTE 4: Delete an existing note using: DELETE "/api/auth/updatenote"
router.delete("/deletenote/:id", fetchuser, noteController.DeleteNote);

module.exports = router;
