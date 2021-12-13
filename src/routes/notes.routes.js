const { Router } = require('express');
const router = Router();

const 
    { 
    renderNoteForm, 
    createNewNote, 
    renderNotes, 
    renderEditForm, 
    updateNotes, 
    deleteNotes 
} = require('../controllers/notes.controller');

const {isAuthenticated} = require('../helpers/auth');

//NEW NOTE
router.get('/notes/add',isAuthenticated, renderNoteForm );

router.post('/notes/new-note',isAuthenticated,createNewNote);

//GET ALL NOTE
router.get('/notes',isAuthenticated, renderNotes);

//EDIT NOTES
router.get('/notes/edit/:id',isAuthenticated,renderEditForm);

router.put('/notes/edit-note/:id',isAuthenticated,updateNotes);

//DELETE NOTES
router.delete('/notes/delete/:id',isAuthenticated,deleteNotes);

module.exports = router;