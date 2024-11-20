const Note = require("../models/noteModel")
const mongoose = require("mongoose")

//Get all notes
const getNotes = async (req, res) => {
  //Find all notes, and sort them starting from the newest created
  const notes = await Note.find({}).sort({ createdAt: -1 })

  res.status(200).json(notes)
}

//Get a specific note
const getANote = async (req, res) => {
  const { id } = req.params;

  //If the id is not valid, send back a message
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such notes, Please check your id" })
  }

  const note = await Note.findById(id)

  //If no such note can be found in the db, send back the message
  if (!note) {
    return res.status(404).json({ err: "No such note" })
  }

  res.status(200).json(note)
}

//Create a new note
const createNote = async (req, res) => {
  //Destructuring the req.body json to their relevant names
  const { title, content } = req.body

  //Create a new note, passing in the title and content 
  try {
    const note = await Note.create({ title, content })
    res.status(200).json(note)
  } catch (err) {
    res.status(400).json({ err: err.message })
  }
}

//Delete a specific note
const deleteANote = async (req, res) => {
  const { id } = req.params

  //If the id is not valid, send back a message
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such notes, Please check your id" })
  }

  const note = await Note.findByIdAndDelete(id)

  if (!note) {
    return res.status(404).json({ err: "No such note" })
  }

  res.status(200).json(note)

}

//Update a specific note
const updateNote = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such notes, Please check your id" })
  }

  //Find the note with the id as parameter, and update it with the input, setting the returned doc as the updated document
  const note = await Note.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  )


  if (!note) {
    return res.status(404).json({ err: "No such note" })
  }

  res.status(200).json({ note })

}

//Export the modules for use in other files
module.exports = {
  getNotes,
  getANote,
  createNote,
  deleteANote,
  updateNote
}