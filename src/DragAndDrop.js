/*
 * WALT - A realistic load generator for web applications.
 *
 * Copyright 2020 Eric Ackermann <eric.ackermann@student.hpi.de>, Hendrik Bomhardt
 * <hendrik.bomhardt@student.hpi.de>, Benito Buchheim
 * <benito.buchheim@student.hpi.de>, Juergen Schlossbauer
 * <juergen.schlossbauer@student.hpi.de>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useState} from 'react'
import './DragAndDrop.css'

function DragAndDrop(props){
   
    const [hightlight, setHighlight] = useState(false);

    const fileInputRef = React.createRef();

    const openFileDialog = ()=> {
        if (props.disabled) return;
        fileInputRef.current.click();
    }


    const onFilesAdded = (evt) => {
        if (props.disabled) return;
        const files = evt.target.files;
        if (props.onFilesAdded) {
          const array = fileListToArray(files);
          props.onFilesAdded(array);
        }
    }


    const fileListToArray = (list) => {
        const array = [];
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    }


// event Handlers

    const onDragOver = (evt) => {
        evt.preventDefault();
        if (props.disabled) return;
        setHighlight(true);
    }

    const onDragLeave = () => {
        setHighlight(false);
    }


    const onDrop = (event) => {
        event.preventDefault();
        if (props.disabled) return;
        const files = event.dataTransfer.files;
        if (props.onFilesAdded) {
        const array = fileListToArray(files);
        props.onFilesAdded(array);
        }
        setHighlight(false);
    }
    
      

    return (
      <div className={`DragAndDropZone ${hightlight ? "Highlight" : ""}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          onClick={openFileDialog}
          style={{ cursor: props.disabled ? "default" : "pointer" }}>
        <img
          alt="upload"
          className="Icon"
          src="icon.svg"
        />
        <input
          ref={fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={onFilesAdded}/>
        <span>Upload Files</span>
      </div>
    );
  

}

export default DragAndDrop;