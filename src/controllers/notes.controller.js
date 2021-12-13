const notesCtrl = {}; 
const Note  = require('../models/Note');
//PERSONAL
/* var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '1'); //January is 1!
var yyyy = today.getFullYear(); 

const day = mm + '/' + dd + '/' + yyyy;
*/

notesCtrl.renderNoteForm = async(req, res) => {
    //res.send('note add');
    res.render('notes/new-note')
};

notesCtrl.createNewNote = async (req, res) => {

    const {title, description} = req.body;
    const newNote = new Note({title, description});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg','Note addded Successfully');
    
    res.redirect('/notes');
};

notesCtrl.renderNotes = async(req, res) => {

    /* console.log(day); */
    const notes = await Note.find({user:req.user.id}).sort({createdAt: 'desc'}).lean();
    res.render('notes/all-notes', {notes});
};

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if(note.user != req.user.id){
        req.flash('error_msg','Not Authorized');
        return res.redirect('/notes');
    };
    console.log(note);
    res.render('notes/edit-note', {note});
};

notesCtrl.updateNotes = async(req, res) => {
    const {title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg','Note Updated Successfully');
    res.redirect('/notes');
};

notesCtrl.deleteNotes = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Note Deleted Successfully');
    res.redirect('/notes');
};


module.exports = notesCtrl;