import React from "react";
import Dropzone from "react-dropzone";

const DropzoneWrapper = (props) => (
    <Dropzone onDrop={(files)=> props.filesAddedHandler(files)}>
        {({getRootProps}) => (
            <div {...getRootProps()}>
                {props.children}
            </div>)} 
    </Dropzone>
);

export default DropzoneWrapper;