import React from 'react';
import './NoteEditor.less';
import ColorPicker from '../ColorPicker/ColorPicker.jsx';
const NoteEditor = React.createClass({
    getInitialState() {
        return {
            title: '',
            text: '',
            color: '#FFFFFF'
        }
    },

    handleTextChange(e) {
        this.setState({text: e.target.value})
    },

    handleTitleChange(e) {
        this.setState({title: e.target.value})
    },

    handleNoteAdd() {
        const newNote = {
            title: this.state.title,
            text: this.state.text,
            color: this.state.color
        };

        this.props.onNoteAdd(newNote);
        this.setState({text: '', title: '', color: '#FFFFFF'})
    },

    handleColorChange(color) {
        this.setState({color});
    },

    render() {
        return (
            <div className='NoteEditor'>
                <input
                    type='text'
                    className='NoteEditor__title'
                    placeholder='Введите заголовок'
                    value={this.state.title}
                    onChange={this.handleTitleChange}/>
                <textarea
                    rows={5}
                    placeholder='Введите текст'
                    className='NoteEditor__text'
                    value={this.state.text}
                    onChange={this.handleTextChange}/>
                <div className='NoteEditir__footer'>
                    <ColorPicker
                        value={this.state.color}
                        onChange={this.handleColorChange}
                    />
                    <button className='NoteEditor__button' disabled={!this.state.text} onClick={this.handleNoteAdd}>
                        Добавить
                    </button>
                </div>
            </div>
        )
    }
});

export default NoteEditor;
