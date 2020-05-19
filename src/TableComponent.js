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
import TableSubComponent from "./TableSubComponent";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    container: {
        background: "inherit",
        padding: "10px",
        minWidth: "300px",
        background: "inherit",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",


    },
    item: {
        background: "inherit",
        height: "40px",
        borderColor: "black",
        borderWidth: "2px",
    },

    header_row: {
        background: "inherit",
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
      background: "inherit",
      height: "40px",
      display: "flex",
      justifyContent: "flex-start",
      alignContent: "center",
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
        background: "inherit",
    },
    resizeFont: {
      fontSize: "22px",
    },
    resizeLabel: {
      fontSize: "20px",
    },
    actionLink: {
      color: "grey",
      '&:hover': {
        color: "blue",
      },
    }
  }));



export default function TableComponent(props){
    const classes = useStyles();

    return(
      <Grid className={classes.container} container xs={4}>
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
                  value={props.data.tableName}
                  onChange={(event) => {console.log("Wert: " + event.target.value + "TableId: " + props.data.tableId); props.tableNameChangedHandler(event, props.data.tableId)}}/>

                <div>
                <TextField 
                    className={classes.sizeField}
                    label="Size in Rows" 
                    value={props.data.tableSize}
                    onChange={(event)=> {props.tableSizeChangedHandler(event, props.data.tableId)}}
                 />
                <IconButton aria-label="delete table" onClick={() => {props.deleteTableHandler(props.data.tableId)}}> 
                   <CloseIcon />
                </IconButton>
                </div>  
                
        </Grid>
        <Divider className={classes.divider}/>
        <Grid item container className={classes.body}>
         {props.data.tableItems.map(element => {return <TableSubComponent 
                                                            data ={element} 
                                                            fieldNameChangedHandler={props.fieldNameChangedHandler}
                                                            deleteTableRowHandler={props.deleteTableRowHandler}
                                                            handleClickOpenGeneratorDialog = {props.handleClickOpenGeneratorDialog}
                                                            handleCloseGeneratorDialog = {props.handleCloseGeneratorDialog}
                                                            isOpenGeneratorDialog = {props.isOpenGeneratorDialog}
                                                            setTableFocusHandler={props.setTableFocusHandler}
                                                            loadGeneratorToEditDialog={props.loadGeneratorToEditDialog}
                                                            />})}  
        </Grid>   
        <Grid container item className={classes.footer_row}>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingTop: "10px"}}>
          <IconButton onClick={() => {props.addTableRowHandler(props.data.tableId)}}>
            <AddCircleIcon/>
          </IconButton>
          <Typography 
            className={classes.actionLink} 
            onClick={() => {props.addTableRowHandler(props.data.tableId)}}>
              InsertRow
            </Typography>
          </div>
        </Grid> 
      </Grid>  

     
    )
}