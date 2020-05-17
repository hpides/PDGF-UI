import React, {useState, useEffect} from 'react';
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


const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});

export default function DialogSaveSchema(props) {
    const classes = useStyles();
    const leftColumnWidth = 3;
    const rightColumnWidth = 12 - leftColumnWidth; 
    const fontSizeLeftColumn = "h5";
    const [currentDate, setCurrentDate] = useState("");

    const getDateTime = () => {
      let tempDate = new Date();
      let date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(); 
      setCurrentDate(date);
    }
       
    useEffect(()=> {
      getDateTime();
    });


  return (
    <>
    <Dialog 
        onClose={props.handleCloseDialogSaveSchema} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenDialogSaveSchema}
        titel="Dialog"
        //TransitionComponent={Transition}
        keepMounted
        PaperProps={{elevation: "24", square: "true", classes: {root : {backgroundColor: "red"} }}}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle id="simple-dialog-title">Vor dem Speichern können Sie hier weitere Informationen zum Schema eingeben.</DialogTitle>
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>
      
            <Grid direction="row" container item xs={12} style={{paddingLeft: "15px"}}>

                <Grid container item xs={leftColumnWidth}>
                <Typography variant={fontSizeLeftColumn}>Schema Name:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                <Input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter Schema Name" 
                    value={props.schemaInfoObject.schemaName} 
                    onChange={(event) => props.schemaNameChangedHandler(event)}/>
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                <Typography variant={fontSizeLeftColumn}>Description:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                <Input 
                    className={classes.input} 
                    type="number" 
                    placeholder="Enter Description" 
                    multiline
                    value={props.schemaInfoObject.description} 
                    onChange={(event) => props.descriptionChangedHandler(event)}/>
                </Grid>


                <Grid container item xs={leftColumnWidth}>
                <Typography variant={fontSizeLeftColumn}>Author:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                <Input 
                    className={classes.input} 
                    type="text" 
                    placeholder="Enter Author" 
                    value={props.schemaInfoObject.author} 
                    onChange={(event) => props.authorChangedHandler(event)}/>
                </Grid>



                <Grid container item xs={leftColumnWidth}>
                <Typography variant={fontSizeLeftColumn}>Last Edited:</Typography>
                </Grid>

                <Grid container item xs={rightColumnWidth}>
                <Input 
                    className={classes.input}  
                    readOnly
                    value={currentDate} 
                />
                </Grid>


            </Grid>       

               
      
      </div>

      <DialogActions>
      <Button onClick={()=>{props.handleCloseDialogSaveSchema()}} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{props.handleCloseDialogSaveSchema(); props.addUidToSchema(); props.saveSchemaInBrowserStorage()}} color="primary">
            Save
          </Button>
      </DialogActions>  

    </Dialog>
    </>
  );
}

