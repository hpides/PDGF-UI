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
import Button from "@material-ui/core/Button";
import DraggableCore from "react-draggable";
import NumberFormat from 'react-number-format'

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
    backgroundColor: "red",
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
  addButton: {
    margin: "3px",
    width: "150px",
    height: "34",
  },
  
  }));



export default function TableComponent(props){
    const classes = useStyles();

    return(
      <div>

      <table className={classes.table}>
        <tbody>
          <tr className={classes.tr1}>
            <td className={classes.td} colSpan="2">
                   
                <NumberFormat 
                    style={{fontSize: "20px", 
                            width: "", 
                            height: "44px", 
                            outlineColor: "darkblue", 
                            border: "none", 
                            background: "rgb(216, 72, 34)",
                            boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                            paddingLeft: "10px", 
                            borderRadius: "4px",
                            margin: "2px"}}
                    placeholder = "Enter Table Name"
                    value={props.data.tableName}
                    onChange={(event) => {console.log("Wert: " + event.target.value + "TableId: " + props.data.tableId); props.tableNameChangedHandler(event, props.data.tableId)}}
                />  


             {/*}      
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
                              root: classes.root,
                            },
                          }} 
                          value={props.data.tableName}
                          onChange={(event) => {console.log("Wert: " + event.target.value + "TableId: " + props.data.tableId); props.tableNameChangedHandler(event, props.data.tableId)}}/>
                        */}
            </td>

            <td colSpan="2">
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div> 
                              <Typography style={{fontSize: "16"}}> 
                                Table Size: 
                              </Typography>
                            </div>

                            <div>
                             
                            <NumberFormat thousandSeparator={'.'} decimalSeparator={null} style={{fontSize: "16px", 
                                        width: "", 
                                        height: "22px", 
                                        outlineColor: "darkblue", 
                                        border: "none", 
                                        background: "rgb(216, 72, 34)",
                                        boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                                        paddingLeft: "10px",

                                        borderRadius: "4px",
                                        margin: "2px"}}
                                        value={props.data.tableSize}
                                        onChange={(event)=> {props.tableSizeChangedHandler(event, props.data.tableId)}} />
                             
                             
                  {/*}           
                              <input 
                                style={{fontSize: "16px", 
                                        width: "", 
                                        height: "22px", 
                                        outlineColor: "darkblue", 
                                        border: "none", 
                                        background: "rgb(216, 72, 34)",
                                        boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                                        paddingLeft: "10px",

                                        borderRadius: "4px",
                                        margin: "2px"}}
                                placeholder = "Enter Table Name"
                                value={props.data.tableSize}
                                onChange={(event)=> {props.tableSizeChangedHandler(event, props.data.tableId)}}
                      />  */}
                          </div>
                      </div>
              </td>
            {/*<td className={classes.sizeField} colspan="2">                           
                          <TextField
                              style={{width: "80px"}}
                              label="Size in Rows" 
                              value={props.data.tableSize}
                              onChange={(event)=> {props.tableSizeChangedHandler(event, props.data.tableId)}}
                      /> */}





             
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
                                                            /> 
                                                            })}


          <tr className={classes.tr2}>
            <td className={classes.td} colSpan="5">
              
            <Button
                variant="outlined"
                color="green"
                className={classes.addButton}
                startIcon={<AddCircleIcon/>}
                onClick={() => {props.addTableRowHandler(props.data.tableId)}}>
                    Add Field
            </Button>

             </td>
            
            </tr>                                                  
        </tbody>
      </table>

      </div> 
    )
}






/*
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
*/