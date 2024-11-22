const express = require("express")

//Import the functions from another file
const {
  getNotes,
  getANote,
  createNote,
  deleteANote,
  updateNote
} = require("../controllers/noteController")


const router = express.Router()

//GET all notes
router.get("/", getNotes)

//GET single note
router.get("/:id", getANote)

//POST new note
router.post("/", createNote)

//DELETE a specific note
router.delete("/:id", deleteANote)

//UPDATE a specific note
router.patch("/:id", updateNote)


//Export the routes
module.exports = router