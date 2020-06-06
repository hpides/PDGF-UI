import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import TableSubComponent from "./TableSubComponent";

const useStyles = makeStyles((theme) => ({
  table: {
    backgroundColor: "lightgrey",
    border: "1px solid black",
    borderCollapse: "collapse",
    
    margin: "5px 20px",
  },  
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    aignContent: "center",

  },
  td: {
    border: "1px solid black",
  },
  tr1: {
    backgroundColor: "orange",
  },
  tr2: {
    backgroundColor: "lightgreen",
  },
  closeIcon: {
    width: "20px",
  },
  sizeField: {
    width: "80px",
    border: "1px solid black",
  },
  closeIconField: {
    width: "60px",
    border: "1px solid black",
    textAlign: "right",
  },

  
  }));



export default function TableComponent(props){
    const classes = useStyles();

    return(
      <div>

      <table className={classes.table}>
        <tbody>
          <tr className={classes.tr1}>
            <td className={classes.td} colspan="2">
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
                          /* inputLabel richtigesProp?*/
                          InputLabelProps={{
                            classes: {
                              root: classes.root,
                            },
                          }} 
                          value={props.data.tableName}
                          onChange={(event) => {console.log("Wert: " + event.target.value + "TableId: " + props.data.tableId); props.tableNameChangedHandler(event, props.data.tableId)}}/>
                    
            </td>
            <td className={classes.sizeField} colspan="2">                           
                          <TextField
                              style={{width: "80px"}}
                              label="Size in Rows" 
                              value={props.data.tableSize}
                              onChange={(event)=> {props.tableSizeChangedHandler(event, props.data.tableId)}}
                          />
             </td>
             <td className={classes.closeIconField}>
                          <IconButton className={classes.closeIcon} aria-label="delete table" onClick={() => {props.deleteTableHandler(props.data.tableId)}}> 
                            <CloseIcon />
                          </IconButton>
               </td>         
                   
          </tr>
          {props.data.tableItems.map(element => {return <TableSubComponent 
                                                            key={element.rowId}
                                                            data ={element} 
                                                            fieldNameChangedHandler={props.fieldNameChangedHandler}
                                                            deleteTableRowHandler={props.deleteTableRowHandler}
                                                            handleClickOpenGeneratorDialog = {props.handleClickOpenGeneratorDialog}
                                                            handleCloseGeneratorDialog = {props.handleCloseGeneratorDialog}
                                                            isOpenGeneratorDialog = {props.isOpenGeneratorDialog}
                                                            setFieldInFocusHandler={props.setFieldInFocusHandler}
                                                            loadGeneratorToEditDialog={props.loadGeneratorToEditDialog}
                                                           
                                                            />})}


          <tr className={classes.tr2}>
            <td className={classes.td} colspan="5">
              <Grid container item className={classes.footer_row}>
                  <div style={{display: "flex", flexDirection: "row", justifycontent: "flex-start", alignItems: "center", paddingTop: "10px"}}>
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
            </td>
            
            </tr>                                                  
        </tbody>
      </table>

      </div> 
    )
}