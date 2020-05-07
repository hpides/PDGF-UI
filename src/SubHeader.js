import React from "react";
import AccessibleIcon from "@material-ui/icons/Accessible";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


export default function SubHeader(){
    return(
        <Box display="flex" flexdDirection="row" justifyContent="flex-end" style={{padding: "20px"}}>
            <div>
                <Typography style={{display: "inline-block"}}> Take a tour</Typography>
                <AccessibleIcon style={{display: "inline-block"}}/>
            </div>
        </Box>
    )
}