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