import React from "react";
import Button from "@material-ui/core/Button";
import BuildIcon from "@material-ui/icons/Build";
import DeleteIcon from "@material-ui/icons/Delete";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";


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
        backgroundColor: "lightblue",
      },
  }));



export default function TableSubComponent(props){
    const classes = useStyles();

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

            <input 
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
        </td>


        <td className={classes.generatorButtonField}>           
                <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                        <Button
                            style={{marginLeft: "auto", marginRight: "auto"}}
                            onClick ={ () => {props.setFieldInFocusHandler(props.data.tableId, props.data.rowId); props.handleClickOpenGeneratorDialog() }}>
                                Select Generator
                        </Button>
                </div>
        </td>            

        <td className={classes.editGeneratorField}>
                <div style={{display: "flex", justifyContent: "center", alignContent: "center" }}>
                        <IconButton
                            style={{marginLeft: "auto", marginRight: "auto"}}
                            onClick={() => {props.loadGeneratorToEditDialog(props.data.tableId, props.data.rowId, props.data.generator.type)}}> 
                            <BuildIcon  style={(Object.keys(props.data.generator).length===0)? {color: "red"}: undefined} className={classes.icon} />
                        </IconButton>    
                </div>
        </td>
        

        <td className={classes.deleteIconField}>
                <div style={{display: "flex", justifyContent: "center", alignContent: "center" }}>
                    <IconButton 
                        style={{marginLeft: "auto", marginRight: "auto"}}
                        onClick={() => {props.deleteTableRowHandler(props.data.tableId, props.data.rowId)}}>
                        <DeleteIcon className={classes.icon}/>
                    </IconButton>    
                </div>


        </td>

</tr>

         
    )
}





/*
export default function TableSubComponent(props){
    const classes = useStyles();

    return(
    <Grid 
        container className={classes.container} 
        justify = "flex-end"
        styles={{display: "flex", flexDirection: "row", alignItems: "center"}} 
        xs={12}>
            
        <Grid container item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
        <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
            <IconButton>
                <VpnKeyIcon className={classes.icon}/>
            </IconButton>
        </div>
        </Grid>

        <Grid container item style={{width: "200px"}} className={classes.framed}xs={6}>
            <Input 
                defaultValue="Enter Field Name" 
                value={props.data.fieldName} 
                onChange={(event) =>
                {props.fieldNameChangedHandler(event, props.data.tableId, props.data.rowId)}}
            />
        </Grid>

        <Grid container item style={{width: "150px"}} className={classes.framed}xs={3}>
            <Button
                onClick ={ () => {props.setFieldInFocusHandler(props.data.tableId, props.data.rowId); props.handleClickOpenGeneratorDialog() }}>
                    Generator
            </Button> 
        </Grid>

        <Grid container item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
        <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
            <IconButton
                onClick={() => {props.loadGeneratorToEditDialog(props.data.tableId, props.data.rowId, props.data.generator.type)}}> 
                <BuildIcon className={classes.icon} />
            </IconButton>    
        </div>
        </Grid>

        <Grid container item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
        <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
            
            <IconButton onClick={() => {props.deleteTableRowHandler(props.data.tableId, props.data.rowId)}}>
                <DeleteIcon className={classes.icon}/>
            </IconButton>    
        </div>
        </Grid> 
               
    </Grid>



         
    )
}
*/