import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import SchemaSelectionCard from "./SchemaSelectionCard";
import BuildIcon from "@material-ui/icons/Build";
import GeneratorSelectionCard from "./GeneratorSelectionCard";
import Box from "@material-ui/core/Box";
import cloneDeep from 'lodash/cloneDeep';


const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function DialogGeneratorSelection(props) {
  const classes = useStyles();
  //const { onClose, selectedValue, isOpenSchemaDialog, schemaDescriptions } = props;

  //const handleClose = () => {
    //onClose();
  //};

  //const handleListItemClick = (value) => {
  //  onClose(value);
  //};

  const [reRenderTrigger, setReRenderTrigger] = useState(0);

  const triggerRerender = () => {
    setReRenderTrigger(Date.now);
  }

  return (
    <Dialog 
        onClose={props.handleCloseGeneratorDialog} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenGeneratorDialog}
        maxWidth="md"
        fullwidth>


        <DialogTitle id="simple-dialog-title">
            <Grid container display="flex" direction="row" justify="space-between" xs={12}>
                <Grid item xs={8}>
                    Select Generator 
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="white"
                        onClick={()=>{props.handleClickOpenRawGeneratorDialog()}}
                        className={classes.button}
                        endIcon={<BuildIcon />}
                    >
                        <p> or <span style={{color: "blue"}}> Create your own!</span></p>
                    </Button>
                </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
            <div style={{display: "flex", flexDirection: "column", justifycontent: "flex-start"}}>    
                <Grid container display="flex" justify="flex-start" flexWrap="wrap" xs={12}>

                {(localStorage.getItem("generatorRepository")!== null)? 
                  JSON.parse(localStorage.getItem("generatorRepository")).map(element => {
                    return <Grid item xs={4}> 
                              <GeneratorSelectionCard 
                                  data = {element} 
                                  loadSelectedSchema={props.loadSelectedGenerator}
                                  selectGeneratorHandler={props.selectGeneratorHandler}
                                  handleCloseGeneratorDialog={props.handleCloseGeneratorDialog}
                                  triggerRerender={triggerRerender}/> 
                            </Grid>}): 
                    <div> There are currently no Schemata in the Repository </div>}  


                 {/* 
                 {props.data.map(element => { return <Grid  key={element.uid} item xs={4}> <GeneratorSelectionCard data = {element} handleCloseGeneratorDialog = {props.handleCloseGeneratorDialog}/> </Grid>})}
                 */} 
                
                 </Grid>
            </div>
        </DialogContent>

      <DialogActions>
        <div> Here will finally be a button or something ...</div>
      </DialogActions>
    </Dialog>
  );
}
