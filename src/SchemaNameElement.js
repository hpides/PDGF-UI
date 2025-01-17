import React, {useContext} from "react";
import {TooltipContext} from "./App";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import CustomTooltip from "./CustomTooltip";
import {infoIconStyles} from "./styles";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifycontent: "flex-start",
    },
    inputRoot: {
        fontSize: "30px",
    },
    labelRoot: {
        fontSize: "30px",
        color: "lightgrey",
        "&$labelFocused": {
          color: "black"
        }
    },
    
    labelFocused: {},
  }));



export default function SchemaNameElement(props){
    const classes = useStyles();
    const tooltipVisible = useContext(TooltipContext);
    const toolTipSchemaName = `
        Here some infos about the Schema:
        Schema name:  ${props.schemaName}
        Schema author: ${props.author}. 
        Schema description: ${props.description}`

    return(
        <Grid container display="flex" direction="row" justify="flex-start" className={classes.container}>
            {/* <Grid item>
            <Typography variant="h5">
                Schema Name: 
            </Typography>
            </Grid>
            */}
            <Grid item >
            <CustomTooltip  placement="bottom" arrow="true" title={tooltipVisible? "Please enter a Name for your Schema. But remember not use special characters or blanks.": ""}>   
            <form className={classes.root} noValidate autoComplete="off">
            
                <TextField 
                    className={classes.textField} 
                    variant="outlined" 
                    label="Schema_Name"
                    value={props.schemaName}
                    onChange = {(event) => {props.schemaNameChangedHandler(event)}}
                    InputProps={{ classes: { root: classes.inputRoot } }}
                    InputLabelProps={{
                        classes: {
                          root: classes.labelRoot,
                          focused: classes.labelFocused
                        }
                    }}
                />
           
            </form>
            </CustomTooltip>
            </Grid>
            <Grid item  >
              <CustomTooltip title={toolTipSchemaName} placement="right-start">
                <IconButton>
                  <InfoIcon style={{color: "#385fe0"}}/>
                </IconButton>
              </CustomTooltip>
            </Grid>
        </Grid>
    )
}