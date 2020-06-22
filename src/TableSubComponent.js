import React, {useContext} from "react";
import {TooltipContext} from "./App";
import Button from "@material-ui/core/Button";
import BuildIcon from "@material-ui/icons/Build";
import DeleteIcon from "@material-ui/icons/Delete";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CustomTooltip from "./CustomTooltip";
import {enterDelayTime} from "./data";


const useStyles = makeStyles((theme) => ({
    icon: {
        width: 25,
        height: 25,
        margin: "auto",
    },

    keyIconField: {
        width: "60px",
        border: "1px solid black",
        textAlign: "center",
    },

    deleteIconField: {
        width: "60px",
        border: "1px solid black",
        textAlign: "center",
    },

    editGeneratorField : {
        width: "60px",
        border: "1px solid black",
        textAlign: "center",
    },

    fieldNameField: {
        border: "1px solid black",
        textAlign: "left",
        width: "200px",
    },

    generatorButtonField: {
        border: "1px solid black",
        width: "120px",
        textAlign: "center"
    },


    td: {
        border: "1px solid black",
    },
    td: {
        border: "1px solid black",
    },

    tr3: {
        backgroundColor: "rgb(245,245,245)",
      },
  }));



export default function TableSubComponent(props){
    const classes = useStyles();
    const tooltipVisible = useContext(TooltipContext);

    return(

    <tr className={classes.tr3}>
        <td className={classes.keyIconField}>
        
                <div style={{display: "flex", justifycontent: "center" }}>
                    <IconButton style={{marginLeft: "auto", marginRight: "auto"}}>
                        <VpnKeyIcon className={classes.icon}/>
                    </IconButton>
                </div>
        

        </td>

        <td className={classes.fieldNameField}>     
            <CustomTooltip placement="left" arrow="true" title={tooltipVisible? `Enter the name of the field to be generated. Please do not use empty spaces and any special characters besides "-", "_"`:""}>
                <input 
                    placeholder="Enter_field_name"
                    style={{fontSize: "16px", 
                            width: "", 
                            height: "36px", 
                            outlineColor: "darkblue", 
                            border: "none", 
                            background: "white", 
                            boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                            paddingLeft: "10px", 
                            borderRadius: "4px",
                            margin: "2px"}}
                    value={props.data.fieldName} 
                    onChange={(event) =>
                    {props.fieldNameChangedHandler(event, props.data.tableId, props.data.rowId)}}
                />
            </CustomTooltip>
        </td>


        <td className={classes.generatorButtonField}> 

                {(Object.keys(props.data.generator).length===0)?      


                    <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                            <CustomTooltip   placement="bottom" arrow="true" title={tooltipVisible? "Press Button and get to the dialoge to select or create a generator for that row.": ""}>
                                <Button
                                    variant="outlined"
                                    style={{marginLeft: "auto", marginRight: "auto", height: 36, margin: 3, lineHeight: 1.25}}
                                    onClick ={ () => {props.setFieldInFocusHandler(props.data.tableId, props.data.rowId); props.handleClickOpenGeneratorSelectionDialog() }}>
                                        Select Generator
                                </Button>
                            </CustomTooltip>
                    </div>

                :

                    <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                            <CustomTooltip   placement="bottom" title={tooltipVisible? "Press Button and get to the dialoge to select or create another generator.": ""}>
                                <Button
                                     variant="outlined"
                                    style={{marginLeft: "auto", marginRight: "auto", height: 36, margin: 3, lineHeight: 1.25, borderColor: "green", borderWidth: 2,}}
                                    onClick ={ () => {props.setFieldInFocusHandler(props.data.tableId, props.data.rowId); props.handleClickOpenGeneratorSelectionDialog() }}>
                                        Replace Generator
                                </Button>
                            </CustomTooltip>
                    </div>
                }           


        </td>            

        <td className={classes.editGeneratorField}>
                <div style={{display: "flex", justifyContent: "center", alignContent: "center" }}>
                        <IconButton
                            style={{marginLeft: "auto", marginRight: "auto"}}
                            onClick={() => {props.loadGeneratorToEditDialog(props.data.tableId, props.data.rowId, props.data.generator.generatorType)}}> 
                                <CustomTooltip placement="bottom" arrow="true" title={tooltipVisible? "Click here to get into edit mode and change the generator settings. If the symbol is red, you did not yet load a generator to that row. In that case edit mode cannot be accessed.": ""}>
                                    <BuildIcon  style={(Object.keys(props.data.generator).length===0)? {color: "red"}: undefined} className={classes.icon} />
                                </CustomTooltip>
                        </IconButton>    
                </div>
        </td>
        

        <td className={classes.deleteIconField}>
                <div style={{display: "flex", justifyContent: "center", alignContent: "center" }}>
                    <IconButton 
                        style={{marginLeft: "auto", marginRight: "auto"}}
                        onClick={() => {props.deleteTableRowHandler(props.data.tableId, props.data.rowId)}}>
                            <CustomTooltip  placement="bottom" arrow="true" title={tooltipVisible? "Click here to delete this row.": ""}>
                                <DeleteIcon className={classes.icon}/>
                            </CustomTooltip>
                    </IconButton>    
                </div>


        </td>

</tr>

         
    )
}
