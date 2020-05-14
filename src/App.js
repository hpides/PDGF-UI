import React, { useState } from 'react';
import './App.css';
import {schemaDescriptions, emptySchema} from "./data.js";
import LandingPage from "./pages/LandingPage";
import EditorPage from "./pages/EditorPage";



function App() {
  const initialSchemaDescriptions = schemaDescriptions;
  const [schema, setSchema] = useState(initialSchemaDescriptions);
  const initialStateSchemaSelectionDialog = "closed";
  const [isOpenSchemaSelectionDialog, setIsOpenSchemaSelectionDialog] = useState(initialStateSchemaSelectionDialog); 
  const initialCurrentSchema = emptySchema;
  const [currentSchema, setCurrentSchema] = useState(initialCurrentSchema);
  
  
  
  return (
    <>
    <LandingPage schemaDescriptions={schema} stateSchemaSelectionDialog={isOpenSchemaSelectionDialog}/>
  
    <div style={{height: "40px",}}/>

    <EditorPage currentSchema={currentSchema}/>

    <div style={{height: "100px",}}/>
    

    <div style={{height: "50px",}}/>


    
    <div style={{height: "400px", background: "white"}}/>


</>
  );
}

export default App;
