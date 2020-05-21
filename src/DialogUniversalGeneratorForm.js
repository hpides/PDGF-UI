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
import FormIdGenerator from "./FormIdGenerator";
import FormLongGenerator from "./FormLongGenerator";
import FormDateTimeGenerator from "./FormDateTimeGenerator";


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function DialogUniversalGeneratorForm(props) {
    const classes = useStyles();

    const renderSwitch = () => {
        //alert("entered renderSwitch-Statement with generatorTpye: " + props.generatorType);
        switch (props.generatorType) {
          
          case "IdGenerator":
                return <FormIdGenerator 
                          handleCloseDialogUniGenForm = {props.handleCloseDialogUniGenForm}
                          tempGeneratorObject = {props.tempGeneratorObject} />;
                break;
            case "LongGenerator":
                return <FormLongGenerator 
                          handleCloseDialogUniGenForm = {props.handleCloseDialogUniGenForm}
                          tempGeneratorObject = {props.tempGeneratorObject}/>;
                break;
            case "DoubleGenerator":
                return <FormDateTimeGenerator 
                          handleCloseDialogUniGenForm = {props.handleCloseDialogUniGenForm}
                          tempGeneratorObject = {props.tempGeneratorObject}/>;
                break;
            default:
                return <div>Sorry, but we have not found that type of generator!</div>
        }
    }
       

  return (
    <>
    <Dialog 
        onClose={props.handleCloseDialogUniGenForm} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenDialogUniGenForm}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: "24", square: "true", classes: {root : {backgroundColor: "red"} }}}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle id="simple-dialog-title">Test</DialogTitle>

    {alert("in DialogUniversalGeneratorForm handleClose-Function: " + props.handleCloseDialogUniGenForm)}

      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
          {renderSwitch()}

               
      
      </div>

      <DialogActions>
          
          <Button onClick={()=>props.handleCloseDialogUniGenForm()} color="primary">
            Bye
          </Button>
      </DialogActions>  

    </Dialog>
    </>
  );
}

