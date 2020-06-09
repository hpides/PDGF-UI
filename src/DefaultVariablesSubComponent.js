import React from 'react'
import { Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

export default function DefaultVariablesSubComponent(props) {
    return (
        <div>

            <Grid container display="flex" flexDirection="column" justify="flex-start" style={{marginBottom: "20px"}}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            {props.defaultVariable.name}
                        </Typography>
                    </Grid>
                                  
                   
                    <Grid container display="flex" justify="space-between" item xs={12}>
                           
                           <Grid item xs={4}>
                               <Typography variant="h6">
                                   Value:
                               </Typography>
                           </Grid>
                           
                            <Grid item xs={8}>
                            <input 
                                    style={{fontSize: "16px", 
                                            width: "140px", 
                                            height: "22px", 
                                            outlineColor: "darkblue", 
                                            border: "none", 
                                            background: "white",
                                            boxShadow: "inset 2px 2px 3px rgba(0,0,0,0.2)", 
                                            paddingLeft: "10px",
                                            borderRadius: "4px",
                                            margin: "2px"}}
                                    placeholder = "Enter Variable Value"
                                    value={props.defaultVariable.value}
                                    onChange={(event)=> {props.defaultVariableValueChangedHandler(event, props.defaultVariable.variableId)}}
                                /> 
                             </Grid>    
                    </Grid>
            </Grid>
            
        </div>
    )
}

