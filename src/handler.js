const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
    const {title, tags, body} = req.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((notes) => notes.id === id).length > 0;


    if (isSuccess) {
        const res = h.response({
            status: true,
            message: 'Catatan berhasil dibuat',
            data: {
                noteId: id,
            },
        });
        res.code(201);
        return res;
    }

    const res = h.response({
        status: false,
        message: 'Catatan gagal dibuat',
    });

    res.header('Access-Control-Allow-Origin', '*');
    return res;
};

const getAllNotes = () => ({
    status: true,
    data: {
        notes,
    },
});

const getNoteById = (req, h) => {
    const {id} = req.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: true,
            data: {
                note,
            },
        };
    }

    const res = h.response({
        status: false,
        message: 'Catatan tidak ditemukan',
    });

    res.code(404);
    return res;
};

const editNoteById = (req, h) => {
    const {id} = req.params;

    const {title, tags, body} = req.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes[index] = {...notes[index], title, tags, body, updatedAt};

        const res = h.response({status: true, message: 'Catatan berhasil diubah'});
        return res;
    }

    const res = h.response({status: false, message: 'Catatan gagal diubah'});
    return res;
};

const deleteNoteById = (req, h) => {
    const {id} = req.params;

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes.splice(index, 1);
        const res = h.response({status: true, message: 'Catatan berhasil dihapus'});
        res.code(200);
        return res;
    }

    const res = h.response({status: false, message: 'Catatan gagal dihapus'});
    res.code(404);
    return res;
};

module.exports = {addNoteHandler, getAllNotes, getNoteById, editNoteById, deleteNoteById};