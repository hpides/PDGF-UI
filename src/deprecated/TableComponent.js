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

const useStyles = makeStyles((theme) => ({
    container: {
        background: "lightblue",
        padding: "10px",

    },
    item: {
        background: "green",
        height: "40px",
        borderColor: "black",
        borderWidth: "2px",
    },

    header_row: {
        background: "yellow",
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
    },
    footer_row: {
      background: "yellow",
      height: "60px",
      display: "flex",
      justifyContent: "flex-start",
      alignContent: "flex-end",
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
    resizeFont: {
      fontSize: "22px",
    },
    resizeLabel: {
      fontSize: "20px",
    },
  }));



export default function TableComponent(props){
    const classes = useStyles();

    return(
    <div>
      <Grid className={classes.container} container xs={3}>
        <Grid item container className={classes.header_row}>
                
                <TextField 
                  className={classes.nameField} 
                  id="filled-basic" 
                  label="Table Name" 
                  variant="filled" 
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
                  }} />
                <div>
                <TextField className={classes.sizeField}id="filled-basic" label="Size in Rows" variant="filled" />
                <CloseIcon/>  
                </div>  
                
        </Grid>
        <Divider className={classes.divider}/>
        <Grid item container>
             {props.children}
             <div style={{height: "60px"}}> Here will be all the Table Rows ...</div>
        </Grid>   
        <Grid container item className={classes.footer_row}>
          <AddCircleIcon/>
          <Typography>InsertRow</Typography>
        </Grid> 
      </Grid>  
    </div>
    )
}