import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import BuildIcon from "@material-ui/icons/Build";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import TableSubComponent03 from "./TableSubComponent03";

const useStyles = makeStyles((theme) => ({
    container: {
        background: "white",
        padding: "10px",

    },
    item: {
        background: "green",
        height: "40px",
        borderColor: "black",
        borderWidth: "2px",
    },

    header_row: {
        background: "white",
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        borderWidth: "2px",
        borderColor: "black",
        borderStyle: "solid",
        padding: "3px",
        paddingLeft: "10px",
        
    },
    footer_row: {
      background: "white",
      height: "60px",
      display: "flex",
      justifyContent: "flex-start",
      alignContent: "flex-end",
      borderWidth: "2px",
      borderColor: "black",
      borderStyle: "solid",
      paddingBottom: "10px",
      paddingLeft: "5px",
  },
    nameField: {
      width: "220px",
      marginRight: "5px",
      padding: "3px",
    },
    sizeField: {
      width: "120px",
      marginLeft: "5px",
      padding: "3px",
    },
    divider: {
      color: "grey",
      width: "2px",
    },
    body: {
        borderWidth: "2px",
        borderColor: "black",
        borderStyle: "solid",
    },
    resizeFont: {
      fontSize: "22px",
    },
    resizeLabel: {
      fontSize: "20px",
    },
    actionLink: {
      color: "blue",
      '&:hover': {
        color: "lightblue",
      },
    }
  }));



export default function TableComponent02(props){
    const classes = useStyles();

    return(
      <Grid className={classes.container} container xs={3}>
        <Grid item container className={classes.header_row}>
                
                <TextField 
                  className={classes.nameField} 
                  label="Table Name" 
                  placeholder="Enter Table Name"
                  fullWidth
                  InputProps={{
                    classes: {
                      input: classes.resizeFont,
                    },
                  }} 
                  InputLabelProps={{
                    classes: {
                      inputLabel: classes.resizeLabel,
                    },
                  }} 
                  value={props.data.tableName}/>
                <div>
                <TextField 
                    className={classes.sizeField}
                    label="Size in Rows" 
                    value={props.data.tableSize}
                 />
                <CloseIcon/>  
                </div>  
                
        </Grid>
        <Divider className={classes.divider}/>
        <Grid item container className={classes.body}>
         {props.data.tableItems.map(element => {return <TableSubComponent03 data ={element}/>})}  
        </Grid>   
        <Grid container item className={classes.footer_row}>
          <AddCircleIcon/>
          <Typography className={classes.actionLink} onClick={(event)=>{alert("Boooo!")}}>InsertRow</Typography>
        </Grid> 
      </Grid>  
    )
}