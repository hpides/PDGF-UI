import React, {useRef, useEffect, useState, useContext} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {TooltipContext} from "./App";
import DefaultVariablesSubComponent  from "./DefaultVariablesSubComponent";
import CustomVariablesSubComponent  from "./CustomVariablesSubComponent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CustomTooltip from "./CustomTooltip";

const useStyles = makeStyles((theme)=>({
    addVariable: {
        margin: "3px",
        width: "250px",
        height: "34",
        fontSize: "16px",
    },
}));



export default function VariablesSidebar(props) {
    const classes = useStyles();
    const [addedCustomVariablesCounter, setAddedCustomVariablesCounter] =useState(0);
    const endOfContainerRef = useRef();
    useEffect(() => {endOfContainerRef.current.scrollIntoView()}, [addedCustomVariablesCounter]);
    const tooltipVisible = useContext(TooltipContext);

    return (
      <>  

            <Grid 
                container 
                item
                className="variablesContainer" 
                display="flex" 
                flexDirection="column" 
                justify="center" 
                alignContent="flex-start"
                style={{ 
                    height: "100%", 
                    width: "350px", 
                    backgroundColor: "white", 
                    padding: "10px", 
                    paddingTop: 0,
                    borderColor: "white", 
                    borderStyle: "dashed", 
                    borderWidth: "1px", 
                    }}>   


                    <Grid 
                        container 
                        item
                        className="variablesSubContainer1" 
                        display="flex" 
                        flexDirection="column" 
                        justify="center" 
                        alignContent="flex-start"
                        style={{ 
                            maxHeight: "36%", 
                            width: "350px", 
                            backgroundColor: "white", 
                            padding: "5px", 
                            borderColor: "white", 
                            borderStyle: "dashed", 
                            borderWidth: "1px", 
                            flexGrow: 0,
                            marginBottom: 10,

                            }}>   
                                <CustomTooltip placement="left" arrow="true" title={tooltipVisible? "Default variables are variables that are defined by PDGF but whose values you can change.": ""}>
                                <Typography variant="h4" align="left">Default Variables</Typography>
                                </CustomTooltip>    

                                <div 
                                    className="variablesSubSubContainer"
                                    style={{
                                        height: "100%",
                                        overflow: "auto",
                                        display: "flex",
                                        flexDirection: "column",
                                        justify: "flex-start",
                                        alignContent: "center",
                                    }}
                                    >

                                        {props.variables.defaultVariables.map((variable)=>{ return <DefaultVariablesSubComponent 
                                                                                                                    defaultVariable={variable} 
                                                                                                                    defaultVariableValueChangedHandler = {props.defaultSystemVariableValueChangedHandler}
                                                                                                                /> 
                                                                                                            })} 

                                </div>

                    </Grid>

                    <Grid 
                        container 
                        item
                        className="variablesSubContainer2" 
                        display="flex" 
                        flexDirection="column" 
                        justify="center" 
                        alignContent="flex-start"
                        style={{ 
                            height: "60%", 
                            width: "350px", 
                            backgroundColor: "white", 
                            padding: "5px", 
                            borderColor: "white", 
                            borderStyle: "solid", 
                            borderWidth: "1px", 
                            flexGrow: 1,
                            }}>   


                            <CustomTooltip placement="left" arrow="true" title={tooltipVisible? "Custom variables are variables that you can defined by yourself to use in PDGF. For example you could ...": ""}>    
                                <Typography variant="h4" align="left">Custom Variables</Typography>
                            </CustomTooltip>
                                <div 
                                    className="variablesSubSubContainer2"
                                    style={{
                                        maxHeight: "90%",
                                        overflow: "auto",
                                        overflowX: "hidden",
                                        display: "flex",
                                        flexDirection: "column",
                                        justify: "flex-start",
                                        alignContent: "center",
                                    }}
                                    >

                                            {props.variables.customVariables.variableItems.map(element => {return <CustomVariablesSubComponent 
                                                                                                                                        id={`customVariable${element.variableId}`}
                                                                                                                                        key = {element.variableId}
                                                                                                                                        customVariable = {element}
                                                                                                                                        customSystemVariableNameChangedHandler={props.customSystemVariableNameChangedHandler}
                                                                                                                                        customSystemVariableValueChangedHandler={props.customSystemVariableValueChangedHandler}
                                                                                                                                        customSystemVariableDataTypeChangedHandler={props.customSystemVariableDataTypeChangedHandler}
                                                                                                                                        deleteCustomSystemVariableHandler ={props.deleteCustomSystemVariableHandler}                                                                        
                                                                                                                                        />})}
                                            <div className="endOfContainerPointer" ref={endOfContainerRef}/>

                                    
                                </div>

                                <div>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        className={classes.addVariable}
                                        startIcon={<AddCircleIcon/>}
                                        onClick={() => {props.addCustomVariableHandler(); setAddedCustomVariablesCounter(addedCustomVariablesCounter +1)}}>
                                            Add Variable
                                    </Button>
                                </div>  
                            
                            


                    </Grid>


            </Grid>

        </>
    )
}
