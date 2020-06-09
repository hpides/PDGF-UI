import React from "react";
import CentralButtonGroup from "./CentralButtonGroup";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from "@material-ui/core/DialogActions";


export default function DialogStartPage(props){
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
 
       <DialogActions>
           
           <Button onClick={()=>props.handleCloseDialogStartPage()} color="primary">
             Close
           </Button>
       </DialogActions>  
 
     </Dialog>


    )
}