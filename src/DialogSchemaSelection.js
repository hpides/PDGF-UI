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
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import SchemaSelectionCard from "./SchemaSelectionCard";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function DialogSchemaSelection(props) {
  const classes = useStyles();
  
  return (
    <Dialog onClose={props.handleCloseDialogSchemaSelection} aria-labelledby="simple-dialog-title" open={props.isOpenDialogSchemaSelection}>
      <DialogTitle id="simple-dialog-title">Select Schema</DialogTitle>
      <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>    
      
      
      {(localStorage.getItem("schemaRepository")!== null)? 
        JSON.parse(localStorage.getItem("schemaRepository")).map(element => {return <Grid item> <SchemaSelectionCard input = {element} loadSelectedSchema={props.loadSelectedSchema} handleCloseDialogSchemaSelection={props.handleCloseDialogSchemaSelection}/> </Grid>}): 
        <div> There are currently no Schemata in the Repository </div>}  
      
      </div>
    </Dialog>
  );
}
