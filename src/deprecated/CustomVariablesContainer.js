import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import CustomVariablesSubComponent from "../CustomVariablesSubComponent";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./CustomScrollbar.css";


const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex", 
      flexDirection: "column", 
      width: "300px",
      //borderColor: "black", 
      //borderWidth: "3px", 
      //borderStyle: "dashed", 
      borderRadius: "5px", 
      background: "lightgrey",
    
    },
    containerLabel: {
      position: "relative",
      top: "0px",
      fontWeight: 500,
      marginBottom: 20,
    },
    actionLink: {
      color: "grey",
      '&:hover': {
        color: "blue",
      }
    },
  }));



export default function CustomVariablesContainer(props){
    const classes = useStyles();
    
    return (

        <Grid 
            container 
            item
            className="variablesSubContainer" 
            display="flex" 
            flexDirection="column" 
            justify="center" 
            alignContent="flex-start"
            style={{ 
                height: "55%", 
                width: "350px", 
                backgroundColor: "pink", 
                padding: "10px", 
                paddingTop: "5px",
                borderColor: "white", 
                borderStyle: "dashed", 
                borderWidth: "1px", 
                }}> 

                    <Box className={classes.container} boxShadow={3}>

                        <Typography variant="h4" className={classes.containerLabel}>
                            Custom Variables
                        </Typography>  

                        <div 
                            className="variablesSubContainer2"
                            style={{
                                height: "60%",
                                overflow: "scroll",
                                display: "flex",
                                flexDirection: "column",
                                justify: "flex-start",
                                alignContent: "center",
                            }}
                            >
                                    {props.variables.customVariables.variableItems.map(element => {return <CustomVariablesSubComponent 
                                                                                              key = {element.variableId}
                                                                                              customVariable = {element}
                                                                                              customSystemVariableNameChangedHandler={props.customSystemVariableNameChangedHandler}
                                                                                              customSystemVariableValueChangedHandler={props.customSystemVariableValueChangedHandler}
                                                                                              customSystemVariableDataTypeChangedHandler={props.customSystemVariableDataTypeChangedHandler}
                                                                                              deleteCustomSystemVariableHandler ={props.deleteCustomSystemVariableHandler}                                                                        
                                                                                              />})}
                        </div> 
       

                          <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center",}}>
                            <IconButton onClick={() => {props.addCustomVariableHandler()}}>
                              <AddCircleIcon/>
                            </IconButton>
                            <Typography 
                              className={classes.actionLink} 
                              onClick={() => {props.addCustomVariableHandler()}}>Insert Variable</Typography>
                          </div>  
                    </Box>
          </Grid>
    
    )
}
       
       