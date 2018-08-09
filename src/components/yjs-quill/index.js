import React from 'react';
import YjsQuill from './yjsQuill';
import './index.less'

class QuillEditor extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="editor">
                <YjsQuill />
                <div className="quillEditor-wrapper">
                    <div id="quillEditor" className="quillEditor">
                        <p>Hello World!</p>
                        <p>Some initial <strong>bold</strong> text</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuillEditor;
