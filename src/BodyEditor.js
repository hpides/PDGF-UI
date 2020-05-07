import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import EditorButtonGroup from "./EditorButtonGroup";
import DefaultVariablesComponent02 from "./DefaultVariablesComponent02";
import CustomVariablesContainer from "./CustomVariablesContainer";
import {customSystemVariables} from "./data.js"; 
import SchemaNameElement from "./SchemaNameElement";



export default function BodyEditor(){
    return(
        <div>
            <Grid container display="flex" flexDirection="column" justify="flex-start" xs={12} spacing = {0} style={{background: "white", height: "90vh"}}>
                <Grid container item xs={12} >
                    <Grid container item xs={9} alignContent="flex-end" style={{backgroundColor: "white", paddingBottom: "20px", paddingLeft:"20px"}}>
                        <SchemaNameElement/>
                    </Grid>
                    <Grid container item xs={3} direction="row" justify="flex-end" alignContent="center"  style={{background: "white", paddingRight: "20px"}}>
                        <EditorButtonGroup/>
                    </Grid>
                </Grid>
                <Grid container item xs={12}> 
                    <Grid container item xs={10} style={{ backgroundColor: "white" }}>
                    </Grid>
                    <Grid container item xs={2} direction="column" justify="flex-start" alignContent="flex-end" style={{ backgroundColor: "white" }}>
                        <Grid item  >
                            <DefaultVariablesComponent02/>
                        </Grid>
                        <Grid item style = {{width: "300px", height: "50vh",  overflow: "scroll" }}>
                            <CustomVariablesContainer var={customSystemVariables}/>
                        </Grid>
                    </Grid>
                </Grid>



            </Grid>
        </div>
    )
}