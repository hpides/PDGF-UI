import React from "react";



 DebugDiv =(props) => {
    <div style={{display: "flex"; flexDirection: "row"; justifycontent: "flex-start"
    <div>
        <Typography>UniversalFormMode:</Typography>
        <Input value={universalGeneratorFormMode}/>
    </div>
    <div>
        <Typography>FieldInFocus:</Typography>
        <Input value={fieldInFocus}/>
    </div>
    <div>
        <Typography>selectedGeneratorType:</Typography>
        <Input value={selectedGeneratorType}/>
    </div>
    <div>
        <Typography>TempGeneratorObject:</Typography>
        <Input value={JSON.stringify(tempGeneratorObject)}/>
    </div>
   
}