import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import DialogGeneratorSelection from "./DialogGeneratorSelection";
import cloneDeep from 'lodash/cloneDeep';

const useStyles = makeStyles((theme) => ({
    
  }));



export default function IfGeneratorInputSubElement(props){
    const classes = useStyles();


    const selectedGeneratorChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        const generatorIndex = newGenerator.generatorList.findIndex(x=> x.generatorIndex === props.data.generatorIndex)
        newGenerator.generatorList[generatorIndex].name = event.target.value;
        props.setGeneratorObject(newGenerator);
    }


    return(

    <Grid 
        container className={classes.container} 
        styles={{display: "flex", flexDirection: "row", justifycontent: "flex-end", alignItems: "center"}} 
        xs={12}>
        <Grid container item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
        
                <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
                    <Input value={props.data.generatorIndex} disableUnderline readOnly/>
                </div>
                </Grid>

                <Grid item style={{width: "200px"}} className={classes.framed}xs={8}>
                <TextField
                                id="standard-select-currency-native"
                                className={classes.select}                      
                                select
                                disableUnderline
                                fullwidth
                                value={props.data.name}
                                onChange={(event) => selectedGeneratorChangedHandler(event)}
                                SelectProps={{
                                    native: true,
                                }}
                                > 
                               
                                {JSON.parse(localStorage.getItem("generatorRepository")).map((option) => (
                                <option key={option.uid} value={option.uid}>
                                {option.uid}
                                </option>))}
                            
                            </TextField>
                </Grid>

                <Grid container item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
                    <IconButton onClick={() => {alert("More Information is coming soon!")}}>
                        <SearchIcon className={classes.icon}/>
                    </IconButton>   
                </Grid>

                <Grid container item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
                <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
                    <IconButton
                        onClick={() => {alert("More Information is coming soon!")}}> 
                        <CreateIcon className={classes.icon} />
                    </IconButton>    
                </div>
                </Grid>

                <Grid container item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
                <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
                    
                    <IconButton onClick={() => {alert("More Information is coming soon!")}}>
                        <DeleteIcon className={classes.icon}/>
                    </IconButton>    
                </div>
                </Grid> 
               
    </Grid>



         
    )
}