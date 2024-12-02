const noteService = require("../services/noteService");

class noteController {
  static async FetchAllNotes(req, res) {
    await noteService.FetchAllNotes(req, res);
  }
  static async AddNote(req, res) {
    await noteService.AddNote(req, res);
  }
  static async UpdateNote(req, res) {
    await noteService.UpdateNote(req, res);
  }
  static async DeleteNote(req, res) {
    await noteService.DeleteNote(req, res);
  }
}

module.exports = noteController;
