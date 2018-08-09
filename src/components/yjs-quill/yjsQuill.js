import React from 'react';
import IPFS from 'ipfs'
import Quill from 'quill'
const Y = require('yjs')

require('y-memory')(Y)
require('y-array')(Y)
require('y-richtext')(Y)
require('y-ipfs-connector')(Y)

const ipfs = new IPFS({
    repo: 'yjs-demo-ipfs',
    EXPERIMENTAL: {
        pubsub: true
    }
}) // 在后续被替换，用提前生成好的以username命名的repo来代替

class YjsQuill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        ipfs.once('ready',()=>ipfs.id((error,info)=>{
            if(error) console.log(error)
            console.log(info.id)
        }))

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
