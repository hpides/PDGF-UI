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
    container: {
        display: "flex",
        flexDirection: "row",
        height: "40px",
        width: " 600px",
        background: "inherit",
    },
    textField01: {
    },
    textField02: {
        width: "80px",
    },
    framed: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
    },
    buttonGrid: {
        width: "60px",
    },
    icon: {
        width: 25,
        height: 25,
        margin: "auto",
    },

  }));



export default function TableSubComponent(props){
    const classes = useStyles();

    return(
    <Grid 
        container className={classes.container} 
        justify = "flex-end"
        styles={{display: "flex", flexDirection: "row", alignItems: "center"}} 
>
            
        <Grid item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
        <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
            <IconButton>
                <VpnKeyIcon className={classes.icon}/>
            </IconButton>
        </div>
        </Grid>

        <Grid  item style={{width: "200px"}} className={classes.framed}xs={6}>
            <Input 
                defaultValue="Enter Field Name" 
                value={props.data.fieldName} 
                onChange={(event) =>
                {props.fieldNameChangedHandler(event, props.data.tableId, props.data.rowId)}}
            />
        </Grid>

        <Grid item style={{width: "150px"}} className={classes.framed}xs={3}>
            <Button
                onClick ={ () => {props.setFieldInFocusHandler(props.data.tableId, props.data.rowId); props.handleClickOpenGeneratorDialog() }}>
                    Generator
            </Button> 
        </Grid>

        <Grid  item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
        <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
            <IconButton
                onClick={() => {props.loadGeneratorToEditDialog(props.data.tableId, props.data.rowId, props.data.generator.type)}}> 
                <BuildIcon className={classes.icon} />
            </IconButton>    
        </div>
        </Grid>

        <Grid  item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
        <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
            
            <IconButton onClick={() => {props.deleteTableRowHandler(props.data.tableId, props.data.rowId)}}>
                <DeleteIcon className={classes.icon}/>
            </IconButton>    
        </div>
        </Grid> 
               
    </Grid>



         
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