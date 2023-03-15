const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Endpoint-1 ( fetch all notes)
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const allnotes = await Note.find({ user: req.user.id });
    //console.log(allnotes)
    res.json(allnotes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

//---------------------------------------------------------------
//Endpoint-2 ( add a new note using POST)- login required
//localhost:5000/api/notes/addnotes
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a Valid title, min length 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "Enter a Valid description, min length 3 characters"
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //Express Validator: if there are errors, return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //create a new note and save it
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      //console.log(saveNote)
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("unable to fetch all notes");
    }
  }
);

//Endpoint-3 ( update and existing note using PUT request )- login required
//localhost:5000/api/notes/updatenote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new note object
    const newNote = {};
    if (title) {newNote.title = title; }
    if (description) {newNote.description = description; }
    if (tag) {newNote.tag = tag; }
    //find the note to be updated and then update it
    let note = await Note.findById(req.params.id);
    if (!note) {return res.status(404).send("Not Found");
    }
    console.log(note.user);
    if (note.user && note.user.toString() !== req.user.id) {
      //explain this syntax
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

//Endpoint-4 (Delete an existing note using DELETE)- login required
//localhost:5000/api/notes/deletenote
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted and then delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("No Note exists");
    }
    //ALLOW IF USER OWNS THE NOTE
    if (note.user && note.user.toString() !== req.user.id) {
      //explain this syntax
      return res.status(401).send("You are not allowed to perform this action");
    }
    //if note exists, find and delete note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Sucess!! the note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

module.exports = router;
