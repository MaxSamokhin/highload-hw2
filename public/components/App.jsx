import React from 'react';

import NoteStore from '../stores/NotesStore';
import NoteEditor from './NoteEditor/NoteEditor.jsx';
import NoteGrid from './NoteGrid/NoteGrig.jsx';
import NoteActions from '../actions/NotesActions';
import './App.less';

function getStateFromFlux() {
    return {
        isLoading: NoteStore.isLoading(),
        notes: NoteStore.getNotes()
    }
}

const App = React.createClass({
    getInitialState() {
        return getStateFromFlux();
    },

    _onChange() {
        this.setState(getStateFromFlux());
    },

    componentWillMount() {
        NoteActions.loadNotes();
    },

    componentDidMount() {
        NoteStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        NoteStore.removeEventListener(this._onChange);
    },

    handleNoteAdd(data) {
        NoteActions.createNote(data);
    },

    handleNoteDelete(note) {
        NoteActions.deleteNote(note.id);
    },

    render() {
        console.log(`is Loading: ${this.state.isLoading}`);
        return (
            <div className='App'>
                <h2 className='App__header'>Заметки</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                <NoteGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete}/>
            </div>
        )
    }

});

export default App;
