import React from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
//import DialogGeneratorSelection from "./DialogGeneratorSelection";
import cloneDeep from 'lodash/cloneDeep';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
//import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    
  }));



export default function IfGeneratorInputSubElement(props){
    const classes = useStyles();

    const selectedGeneratorChangedHandler = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        alert("target.value: " + event.target.value);
        newGenerator.generatorList[props.index].uid = event.target.value;
        alert("newGenerator: " + JSON.stringify(newGenerator));

        props.setGeneratorObject(newGenerator);
        //setGeneratorName();
    };


    const deleteGenerator = (event) => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.generatorList.splice(props.index, 1);
        props.setGeneratorObject(newGenerator);
    };

    /*
    const setGeneratorName = () => {
        const newGenerator = cloneDeep(props.generatorObject);
        newGenerator.generatorList[props.index].name = props.selectedGenerator.name;
        alert(JSON.stringify(newGenerator));
        props.setGeneratorObject(newGenerator);
    };
*/

    return(

    <Grid 
        container className={classes.container} 
        styles={{display: "flex", flexDirection: "row", justifycontent: "flex-end", alignItems: "center"}} 
        xs={12}>
                <Grid item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
        
                <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
                    <Input value={props.index} disableUnderline readOnly/>
                </div>
                </Grid>

                <Grid item style={{width: "200px"}} className={classes.framed}xs={8}>
                
                {/*}
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Generator</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.generatorObject.generatorList[props.index].uid}
                    onChange={(event) => selectedGeneratorChangedHandler(event)}
                    >
                         {JSON.parse(localStorage.getItem("generatorRepository")).map((generator) => (
                                <MenuItem key={generator.uid} value={generator.uid}>
                                    {generator.repoVariables.name}
                                </MenuItem>))}
                    </Select>
                </FormControl>

                         */}

                <TextField
                                id="standard-select-currency-native"
                                className={classes.select}                      
                                select
                                disableUnderline
                                fullWidth
                                value={props.generatorObject.generatorList[props.index].uid}
                                onChange={(event) => selectedGeneratorChangedHandler(event)}
                                SelectProps={{
                                    native: true,
                                }}
                                > 
                                 <option key={0} value={null}> None </option>))
                                {JSON.parse(localStorage.getItem("generatorRepository")).map((generator) => (
                                <option key={generator.uid} value={generator.uid}>
                                    {generator.repoVariables.name}
                                </option>))}
                            
                                </TextField> 
                </Grid>

                <Grid item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
                    <IconButton onClick={() => {alert("More Information is coming soon!")}}>
                        <SearchIcon className={classes.icon}/>
                    </IconButton>   
                </Grid>

                <Grid item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
                <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
                    <IconButton
                        onClick={() => {deleteGenerator()}}> 
                        <CreateIcon className={classes.icon} />
                    </IconButton>    
                </div>
                </Grid>

                <Grid item style={{width: "40px", height: "40px"}} className={classes.framed} xs={1}>
                <div style={{display: "flex", justifycontent: "center", width: "40px", height: "40px" }}>
                    
                    <IconButton onClick={() => {deleteGenerator()}}>
                        <DeleteIcon className={classes.icon}/>
                    </IconButton>    
                </div>
                </Grid> 
               
    </Grid>



         
    )
}