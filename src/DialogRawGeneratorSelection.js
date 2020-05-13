import React from 'react';
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
import SchemaCardForRepo from "./SchemaCardForRepo";
import SchemaCardForRepoBox from "./SchemaCardForRepoBox";
import BuildIcon from "@material-ui/icons/Build";
import GeneratorCardForRepoBox from "./GeneratorCardForRepoBox";
import Box from "@material-ui/core/Box";

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
        onClose={props.handleCloseRawGeneratorDialog} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenRawGeneratorDialog}
        maxWidth="md"
        fullWidth>


        <DialogTitle id="simple-dialog-title">
            <Grid container display="flex" direction="row" justify="space-between" xs={12}>
                <Grid item xs={8}>
                    Create Generator 
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="white"
                        onClick={()=>{props.handleClickOpenGeneratorDialog()}}
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
                <Grid container display="flex" justify="flex-start" flexWrap="wrap" xs={12}>
                 {props.data.map(element => { return <Grid item xs={4}> <GeneratorCardForRepoBox 
                                                                              data = {element} 
                                                                              handleCloseRawGeneratorDialog = {props.handleCloseRawGeneratorDialog}
                                                                              selectRawGeneratorHandler={props.selectRawGeneratorHandler}
                                                                              /> 
                                                      </Grid>})}
                </Grid>
            </div>
        </DialogContent>

      <DialogActions>
        <div> Here will finally be a button or something ...</div>
      </DialogActions>
    </Dialog>
  );
}
