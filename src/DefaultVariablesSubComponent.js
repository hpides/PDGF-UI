import React, {useContext} from 'react';
import {TooltipContext} from "./App";
import CustomTooltip from "./CustomTooltip";
import { Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

export default function DefaultVariablesSubComponent(props) {
    const tooltipVisible = useContext(TooltipContext);
    return (
        <div>

            <Grid container display="flex" flexDirection="column" justify="flex-start" style={{marginBottom: "10px", padding: "5px" , border: "1px solid grey", borderRadius: "5px"}}>
                    <Grid item xs={12}>
                        <CustomTooltip placement="left" arrow="true" title={tooltipVisible? `${props.defaultVariable.tooltipName}`: ""}>
                            <Typography variant="h5">
                                {props.defaultVariable.name}
                            </Typography>
                        </CustomTooltip>
                    </Grid>
                                  
                   
                    <Grid container display="flex" justify="space-between" item xs={12}>
                           
                           <Grid item xs={3}>
                                <CustomTooltip placement="left" arrow="true" title={tooltipVisible? `${props.defaultVariable.tooltipValue}`: ""}>
                                    <Typography variant="h6">
                                        Value:
                                    </Typography>
                                </CustomTooltip>    
                           </Grid>
                           
                            <Grid item xs={9}>
                            <input 
                                    style={{fontSize: "16px", 
                                            width: "160px", 
                                            height: "22px", 
                                            outlineColor: "darkblue", 
                                            border: "none", 
                                            background: "white",
                                            boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                                            paddingLeft: "10px",
                                            borderRadius: "4px",
                                            margin: "2px"}}
                                    placeholder = "Enter_Variable_Value"
                                    value={props.defaultVariable.value}
                                    onChange={(event)=> {props.defaultVariableValueChangedHandler(event, props.defaultVariable.variableId)}}
                                /> 
                             </Grid>    
                    </Grid>
            </Grid>
            
        </div>
    )
}

