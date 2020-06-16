import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import BuildIcon from "@material-ui/icons/Build";
import RawGeneratorSelectionCard from "./RawGeneratorSelectionCard";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function DialogRawGeneratorSelection(props) {
  const classes = useStyles();
  //const { onClose, selectedValue, isOpenSchemaDialog, schemaDescriptions } = props;

  //const handleClose = () => {
    //onClose();
  //};

  //const handleListItemClick = (value) => {
  //  onClose(value);
  //};

  return (
    <Dialog 
        onClose={props.handleCloseRawGeneratorSelectionDialog} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenRawGeneratorDialog}
        maxWidth="md"
        fullWidth>


        <DialogTitle id="simple-dialog-title">
            <Grid container display="flex" direction="row" justify="space-between">
                <Grid item xs={8} style={{fontSize: "30px"}}>
                    Create Generator 
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="white"
                        onClick={()=>{props.handleClickOpenGeneratorSelectionDialog()}}
                        className={classes.button}
                        endIcon={<BuildIcon />}
                    >
                        <p> or <span style={{color: "blue"}}> Select a saved one!</span></p>
                    </Button>
                </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>    
                <Grid container display="flex" justify="flex-start" flexWrap="wrap">
                 {props.data.map(element => { return <Grid key={element.uid} item xs={4}> <RawGeneratorSelectionCard 
                                                                              data = {element} 
                                                                              handleCloseRawGeneratorSelectionDialog = {props.handleCloseRawGeneratorSelectionDialog}
                                                                              openInputMaskForSelectedGenerator={props.openInputMaskForSelectedGenerator}
                                                                              /> 
                                                      </Grid>})}
                </Grid>
            </div>
        </DialogContent>

      <DialogActions>
        <div> 
            <Button onClick={()=>props.handleCloseRawGeneratorSelectionDialog()} color="primary">
                Cancel
            </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
