import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import EditorButtonGroup from "./EditorButtonGroup";
import DefaultVariablesComponent02 from "./DefaultVariablesComponent02";
import CustomVariablesContainer from "./CustomVariablesContainer";
import {customSystemVariables} from "./data.js"; 
import SchemaNameElement from "./SchemaNameElement";
import TableComponent02 from "./TableComponent02";



export default function BodyEditor(props){
    const inititalStateIsOpenVariablePlate = false;
    const [isOpenVariablePlate, setIsOpenVariablePlate] = useState(inititalStateIsOpenVariablePlate);
    return(
        <div>
            <Grid container display="flex" direction="row" justify="flex-start" alignContent="flex-start" xs={12} spacing = {0} style={{background: "white", height: "90vh"}}>
               
               {/*first row*/}
               <Grid container item xs={12} style={{height: "150px"}} >
                    <Grid container item xs={9} justify="flex-start" alignContent="flex-end" style={{backgroundColor: "yellow", paddingBottom: "20px", paddingLeft:"20px"}}>
                        <SchemaNameElement/>
                    </Grid>
                    <Grid container item xs={3} direction="row" justify="flex-end" alignContent="center"  style={{background: "lightyellow", paddingRight: "20px"}}>
                        <EditorButtonGroup/>
                    </Grid>
                </Grid>

                 {/*second row*/}
                <Grid container item xs={12}>
                    <Grid container item xs={isOpenVariablePlate? "{10}" : "{12}"} display="flex" direction="row" justify="center" alignContent= "center"  style={{ backgroundColor: "white", padding: "20px", borderColor: "black", borderStyle: "dashed", borderWidth: "1px", flexWrap: "wrap",  }}>
                    {props.data.map(table => {return <TableComponent02 data={table}/>})}
                    </Grid>
                    {(isOpenVariablePlate? (
                    <Grid container item xs={2} direction="column" justify="flex-start" alignContent="flex-end" style={{ backgroundColor: "white" }}> 
                        <Grid item  >
                            <DefaultVariablesComponent02/>
                        </Grid>
                        <Grid item style = {{width: "300px", height: "50vh",  overflow: "scroll" }}>
                            <CustomVariablesContainer var={customSystemVariables}/>
                        </Grid>
                    </Grid>) : null)}
                </Grid>




            </Grid>       

        </div>
    )
}