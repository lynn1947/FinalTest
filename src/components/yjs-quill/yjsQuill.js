import React from 'react';
import Quill from 'quill'
import IPFS from 'ipfs'
const Y = require('yjs')

require('y-memory')(Y)
require('y-array')(Y)
require('y-richtext')(Y)
require('y-ipfs-connector')(Y)

class YjsQuill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.ipfs = this.props.ipfs
    }

    componentDidMount() {
        const ipfs = this.ipfs
        ipfs.on('ready',()=>{
            console.log('ready')
        })

        Y({
            db: {
                name: 'memory'
            },
            connector: {
                name: 'ipfs',
                room: 'yjs-ipfs-demo',
                ipfs: ipfs,
            },
            share: {
                richtext: 'Richtext'
            }
        }).then( (y) => {
            var toolbarOptions = [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike', 'link'],
                [{ 'color': [] }, { 'background': [] }],        // toggled buttons
                ['blockquote', 'code-block'],
                ['video', 'image'],
                [{ 'align': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
                ['clean']                                         // remove formatting button
            ];
            window.quill = new Quill('#quillEditor', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow',
                placeholder: "Write something awesome..."
            });
            y.share.richtext.bindQuill(window.quill)
        })
    }
  
    render() {
        return (
            <div className="null"/>
        )
    }
}

export default YjsQuill;
