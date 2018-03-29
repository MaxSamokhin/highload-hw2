import AppDispatcher from '../dispatcher/AppDispatcher';
import {LOAD_NOTES_REQUEST, LOAD_NOTES_SUCCESS, LOAD_NOTES_FAIL} from '../constants/AppConstants';

import api from '../api/api';

const NoteActions = {
    loadNotes() {
        AppDispatcher.dispatch({
            type: LOAD_NOTES_REQUEST
        });

        api.listNotes()
            .then(({data}) => AppDispatcher.dispatch({
                type: LOAD_NOTES_SUCCESS,
                notes: data
            }))
            .catch(err => AppDispatcher.dispatch({
                type: LOAD_NOTES_FAIL,
                error: err
            }))
    },

    createNote(note) {
        api.createNote(note)
            .then(() => this.loadNotes())
            .catch(err => console.error(err))
    },

    deleteNote(noteId) {
        api.deleteNote(noteId)
            .then(() => this.loadNotes())
            .catch(err => console.error(err))
    }
};

export default NoteActions;