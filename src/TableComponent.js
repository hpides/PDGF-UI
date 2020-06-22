import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import React, {useContext} from "react";
import {TooltipContext} from "./App";
import CustomTooltip from "./CustomTooltip";
import TableSubComponent from "./TableSubComponent";
import Button from "@material-ui/core/Button";
import DraggableCore from "react-draggable";
import Input from "@material-ui/core/Input";
import NumberFormat from 'react-number-format';
import {colors} from "./data";

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
  
  tr2: {
    backgroundColor: "inherit",
  },
  closeIcon: {
    width: "25px",
    height: "25px",
    paddingBottom: "25px",
    paddingRight: "15px",
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
    fontSize: "16px",
  },
  
  }));



export default function TableComponent(props){
    const classes = useStyles();
    const tooltipVisible = useContext(TooltipContext);

    return(
      <div>

      <table className={classes.table}>
        <tbody>
          <tr className={classes.tr1} style={{backgroundColor: `${colors[props.data.tableId]}`}}>
            <td className={classes.td} colSpan="2">

                <CustomTooltip   placement="left" arrow="true" title={tooltipVisible? "Here you can enter your own table name. But please remember to not use special characters or blanks!": ""}>
                    <input
                        style={{fontSize: "20px", 
                                width: "", 
                                height: "44px", 
                                outlineColor: "darkblue", 
                                border: "none", 
                                background: "white",
                                boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                                paddingLeft: "10px", 
                                borderRadius: "4px",
                                margin: "2px"}}
                        type="text"
                        placeholder = "Enter Table Name"
                        value={props.data.tableName}
                        onChange={(event) => {console.log("Wert: " + event.target.value + "TableId: " + props.data.tableId); props.tableNameChangedHandler(event, props.data.tableId)}}
                        onClick={(event) => event.target.select()}
                    />  
                </CustomTooltip>

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
                          <CustomTooltip   placement="top" arrow="true" title={tooltipVisible? "In the table size field you can enter either natural numbers or expressions. It is standard procedure to express size in relation to the system variabe scale factor: 10 * ${SF}, or 10 * ${log(SF). You can use basic operations without further declaration but for further functions have to specify the ....":""} >
                                <Typography style={{fontSize: "16", marginLeft: 4,}}> 
                                  Table Size: 
                                </Typography>
                          </CustomTooltip>
                      </div>

                  <div>
                             
                            <NumberFormat thousandSeparator={'.'} decimalSeparator={null} style={{fontSize: "16px", 
                                        width: "", 
                                        height: "22px", 
                                        outlineColor: "darkblue", 
                                        border: "none", 
                                        background: "white",
                                        boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                                        paddingLeft: "10px",

                                        borderRadius: "4px",
                                        margin: "2px",
                                        marginBottom: "5px",}}
                                        value={props.data.tableSize}
                                        onChange={(event)=> {props.tableSizeChangedHandler(event, props.data.tableId)}}
                                        onClick={(event) => event.target.select()} />
                             
                             
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
                         
                      <CustomTooltip   placement="top" arrow="true" title={tooltipVisible? "Click here to delete the table and all its rows.": ""}> 
                            <IconButton className={classes.closeIcon} aria-label="delete table" onClick={() => {props.deleteTableHandler(props.data.tableId)}}> 
                                <CloseIcon />
                            </IconButton>
                      </CustomTooltip>
                           
                          
            </td>         
                   
          </tr>
          {props.data.tableItems.map(element => {return <TableSubComponent 
                                                            key={element.rowId}
                                                            data ={element} 
                                                            fieldNameChangedHandler={props.fieldNameChangedHandler}
                                                            deleteTableRowHandler={props.deleteTableRowHandler}
                                                            handleClickOpenGeneratorSelectionDialog = {props.handleClickOpenGeneratorSelectionDialog}
                                                            handleCloseGeneratorSelectionDialog = {props.handleCloseGeneratorSelectionDialog}
                                                            isOpenGeneratorDialog = {props.isOpenGeneratorDialog}
                                                            setFieldInFocusHandler={props.setFieldInFocusHandler}
                                                            loadGeneratorToEditDialog={props.loadGeneratorToEditDialog}
                                                            /> 
                                                            })}


          <tr className={classes.tr2}>
            <td className={classes.td} colSpan="5">
                <CustomTooltip   placement="top" arrow="true" title={tooltipVisible? "Click here to add a new row (table field) to the table.":""} >  
                    <Button
                        variant="outlined"
                        color="green"
                        className={classes.addButton}
                        startIcon={<AddCircleIcon/>}
                        onClick={() => {props.addTableRowHandler(props.data.tableId)}}>
                            Add Row
                    </Button>
                </CustomTooltip>
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