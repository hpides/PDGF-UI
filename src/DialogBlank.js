import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import GeneratorFormNullValuesElement from "./GeneratorFormNullValuesElement";
import GeneratorFormPaddingExpansion from "./GeneratorFormPaddingExpansion";
import GeneratorFormRepoExpansion from "./GeneratorFormRepoExpansion";

const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function DialogBlank(props) {
    const classes = useStyles();
    const leftColumnWidth = 3;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

       

  return (
    <>
    <Dialog 
        onClose={props.handleCloseBlank} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenBlank}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: "24", square: "true", classes: {root : {backgroundColor: "red"} }}}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle id="simple-dialog-title">Blank</DialogTitle>
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
            <Grid direction="row" container item xs={12} style={{paddingLeft: "15px"}}>

                <Grid  item xs={12}>
                  <Typography variant={fontSizeLeftColumn}>You are here because some lazy, good for nothing bastard did not manage to </Typography>
                </Grid>

                

            </Grid>       

               
      
      </div>

      <DialogActions>
          
          <Button onClick={()=>console.log("bye")} color="primary">
            Bye
          </Button>
      </DialogActions>  

    </Dialog>
    </>
  );
}

