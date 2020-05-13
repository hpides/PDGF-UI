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
import FormNullValuesElement from "./FormNullValuesElement";
import PaddingDropDownElement from "./PaddingDropDownElement";
import FormGeneratorDetailsRepoElement from "./FormGeneratorDetailsRepoElement";

const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function DialogFormDummy02(props) {
    const classes = useStyles();
    const leftColumnWidth = 3;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";

    const [minimum, setMinimum] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
   

    const minimumChangedHandler = (event) => {
        setMinimum(event.target.value);
    }

    const nameChangedHandler = (event) => {
        setName(event.target.value);    
    }
    

    const typeChangedHandler = (event) => {
        setType(event.target.value);
    }


    

  return (
    <>
    <Dialog 
        onClose={props.handleCloseDummy03} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenDummy03}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: "24", square: "true", classes: {root : {backgroundColor: "red"} }}}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle id="simple-dialog-title">Dummy03 Generator</DialogTitle>
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
            <Grid direction="row" container item xs={12} style={{paddingLeft: "15px"}}>

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Minimum:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="numbr" 
                    placeholder="Enter Minimum" 
                    value={minimum} 
                    onChange={(event) => minimumChangedHandler(event)}/>
                </Grid>

                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Name:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter Name" 
                    value={name} 
                    onChange={(event) => nameChangedHandler(event)}/>
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                  <Typography variant={fontSizeLeftColumn}>Typ:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                  <Input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter Type" 
                    value={type} 
                    onChange={(event) => typeChangedHandler(event)}/>
                </Grid>










               

            </Grid>       

               
      
      </div>

      <DialogActions>
          <Button onClick={()=>console.log("hi")} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>console.log("hi")} color="primary">
            Save
          </Button>
      </DialogActions>  

    </Dialog>
    </>
  );
}

