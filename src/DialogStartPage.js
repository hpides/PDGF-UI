import React from "react";
import CentralButtonGroup from "./CentralButtonGroup";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from "@material-ui/core/DialogActions";
import DropzoneWrapper from "./DropzoneWrapper";
import DropzoneField from "./DropzoneField";



export default function DialogStartPage(props){

  const filesAddedHandler = (array) => {
    let file = array[0];
    let textType = /text.*/;
  
    if (file.type.match(textType)) {
      var reader = new FileReader();
      reader.onload = (e) => {
        let rawText = reader.result;
        console.log(rawText);
        let json = JSON.parse(rawText);
        console.log(json);
        props.setCurrentSchemaLocal(json)
        }    
      reader.readAsText(file);  
    } else {
      alert("File not supported!");
    }

    console.log(array);
  }
  



    return(
         <Dialog 
         onClose={props.handleCloseDialogStartPage} 
         aria-labelledby="simple-dialog-title" 
         open={props.isOpenDialogStartPage}
         titel="Dialog"
         keepMounted
         PaperProps={{elevation: 24 }}
         fullScreen    
         >
     
       <div style={{height: 'calc(100vh-100px)'}}>
            <CentralButtonGroup 
                schemaDescriptions={props.schemaDescriptions} 
                stateSchemaSelectionDialog={props.stateSchemaSelectionDialog}
                isOpenDialogSchemaSelection={props.isOpenDialogSchemaSelection}
                handleCloseDialogSchemaSelection={props.handleCloseDialogSchemaSelection}
                handleClickOpenDialogSchemaSelection ={props.handleClickOpenDialogSchemaSelection}
                loadSelectedSchema={props.loadSelectedSchema}
                />
            
        </div>


      <DropzoneWrapper filesAddedHandler={props.filesAddedHandler}>
        <div style={{width: "400px", heigt: "200px", backgroundColor: "yellow"}}> I am a Dropzone!</div>
      </DropzoneWrapper>


      <DropzoneField filesAddedHandler={props.filesAddedHandler}/>

       <DialogActions>
           
           <Button onClick={()=>props.handleCloseDialogStartPage()} color="primary">
             Close
           </Button>
       </DialogActions>  
 
     </Dialog>


    )
}