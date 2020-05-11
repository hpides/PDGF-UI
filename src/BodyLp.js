import React from "react";
import CentralButtonGroup from "./CentralButtonGroup";
import SimpleDialogExample05 from "./SimpleDialogExample05";


export default function BodyLP(props){
    return(
        <div style={{height: 'calc(100vh-100px)'}}>
            <CentralButtonGroup 
                schemaDescriptions={props.schemaDescriptions} 
                stateSchemaSelectionDialog={props.stateSchemaSelectionDialog}
                />
            <SimpleDialogExample05/>
        </div>
    )
}