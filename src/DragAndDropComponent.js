import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";



export default function DragAndDropComponent(){

    return(
        <div  style={{borderRadius: "25px", borderStyle: "dashed", borderColor: "green", borderWidth: "5px", width: "340px", height: "150px", flexDirection: "column", display: "flex", justifycontent: "center", alignContent: "center",}}>
            <Box >
                <div styles = {{margin: "auto"}}>Or drop your schema here:</div> 
            </Box>
            <ExitToAppIcon style={{margin: "auto", height: "40px", width: "40px"}}/>
        </div>
    )
}