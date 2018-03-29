import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {LOAD_NOTES_REQUEST, LOAD_NOTES_SUCCESS, LOAD_NOTES_FAIL} from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _notes = [];
let _loadingError = null;
let _isLoading = true;

let formatNote = (note) => {
    return {
        id: note._id,
        title: note.title,
        text: note.text,
        color: note.color || '#ffffff',
        createdAt: note.createdAt
    }
};

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getNotes() {
        return _notes;
    },

    emitChange() { // произошли изменения
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeEventListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register((action) => {
    switch (action.type) {
        case LOAD_NOTES_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }
        case LOAD_NOTES_SUCCESS: {
            _isLoading = false;
            _notes = action.notes.map(formatNote);

            _loadingError = null;

            TasksStore.emitChange();
            break;
        }
        case LOAD_NOTES_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default TasksStore;