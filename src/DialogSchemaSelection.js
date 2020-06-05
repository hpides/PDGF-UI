import React, {useState} from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import SchemaSelectionCard from "./SchemaSelectionCard";

//const useStyles = makeStyles({ });

export default function DialogSchemaSelection(props) {
  //const classes = useStyles();
  const [lastSchemaDeletedAt, setLastSchemaDeletedAt] = useState(0);

  const triggerReload = () => {
    setLastSchemaDeletedAt(Date.now);
  }

  return (
    <Dialog onClose={props.handleCloseDialogSchemaSelection} aria-labelledby="simple-dialog-title" open={props.isOpenDialogSchemaSelection}>
      <DialogTitle id="simple-dialog-title">Select Schema</DialogTitle>
      <DialogContent>
          <div style={{display: "flex", flexDirection: "column", justifycontent: "flex-start"}}>    
          
          
          {(localStorage.getItem("schemaRepository")!== null)? 
            JSON.parse(localStorage.getItem("schemaRepository")).map(element => {
              return <Grid  
                      key={element.uids.schemaUid} item> 
                        <SchemaSelectionCard 
                            input = {element} 
                            loadSelectedSchema={props.loadSelectedSchema} 
                            deleteSchemaFromRepo={props.deleteSchemaFromRepo}
                            triggerReload = {triggerReload}
                            handleCloseDialogSchemaSelection={props.handleCloseDialogSchemaSelection}/> </Grid>}): 
            <div> There are currently no Schemata in the Repository </div>}  
          
          </div>
      </DialogContent>
      <DialogActions>
          <div>
              <Button onClick={()=>props.handleCloseDialogSchemaSelection()} color="primary">
                  Cancel
              </Button>
          </div>
      </DialogActions>
    </Dialog>
  );
}
