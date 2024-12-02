const { check, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

class noteService {
  //Get all notes with logged in User
  static async FetchAllNotes(req, res) {
    try {
      const notes = await Notes.find({ user: req.user.id });

      return res.status(200).send({
        status: 200,
        message: "Note List successfully",
        success: true,
        data: { notes },
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).send({
        status: 500,
        message: "Some error occurred",
        success: false,
        data: null,
      });
    }
  }

  //Add a notes with logged in User
  static async AddNote(req, res) {
    try {
      await Promise.all([
        check("title", "Title should be At least 3 char")
          .isLength({ min: 3 })
          .run(req),
        check("description", "Description should be At least 5 char")
          .isLength({ min: 5 })
          .run(req),
      ]);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: "Validation errors",
          data: errors,
        });
      }

      const { title, description, tag } = req.body;

      const notes = await Notes.create({
        user: req.user.id,
        title: title,
        description: description,
        tag: tag,
        date: Date.now(),
      });

      return res.status(200).send({
        status: 200,
        message: "Note Added successfully",
        success: true,
        data: { notes },
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).send({
        status: 500,
        message: "Some error occurred",
        success: false,
        data: null,
      });
    }
  }

  //Update specific note with logged in User
  static async UpdateNote(req, res) {
    try {
      await Promise.all([
        check("title", "Title should be At least 3 char")
          .isLength({ min: 3 })
          .run(req),
        check("description", "Description should be At least 5 char")
          .isLength({ min: 5 })
          .run(req),
      ]);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({
          status: 400,
          message: "Validation errors",
          success: false,
          data: errors,
        });
      }

      const { title, description, tag } = req.body;
      const notes = await Notes.findOne({
        _id: req.params.id,
        user: req.user.id,
      });
      if (!notes) {
        return res.status(400).send({
          status: 400,
          message: "You can't update this note",
          success: false,
          data: null,
        });
      }

      const UpNotes = await Notes.updateOne(
        { _id: req.params.id },
        {
          title: title,
          description: description,
          tag: tag,
        }
      );
      return res.status(200).send({
        status: 200,
        message: "Note Update Successfully",
        success: true,
        data: null,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).send({
        status: 500,
        message: "Some error occurred",
        success: false,
        data: null,
      });
    }
  }

  static async DeleteNote(req, res) {
    try {
      const notes = await Notes.findOne({
        _id: req.params.id,
        user: req.user.id,
      });
      if (!notes) {
        return res.status(400).send({
          status: 400,
          message: "No note found",
          success: false,
          data: null,
        });
      }

      const dNote = await Notes.deleteOne({ _id: req.params.id });
      return res.status(200).send({
        status: 200,
        message: "Note Deleted successfully",
        success: true,
        data: null,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).send({
        status: 500,
        message: "Some error occurred",
        success: false,
        data: null,
      });
    }
  }
}

module.exports = noteService;
