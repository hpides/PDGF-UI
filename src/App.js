import React, { useState } from 'react';
import './App.css';
import Header from "./Header";
import CentralButtonGroup from "./CentralButtonGroup";
import SubHeader from "./SubHeader";
import EditorButtonGroup from "./EditorButtonGroup";
import DefaultVariablesComponent from "./DefaultVariablesComponent";
import CustomVariablesContainer from "./CustomVariablesContainer";
import CustomVariablesSubComponent from "./CustomVariablesSubComponent";
import TableComponent from "./deprecated/TableComponent";
import TableComponent02 from "./TableComponent02";
import TableSubComponent from "./deprecated/TableSubComponent";
import TableSubComponent02 from "./deprecated/TableSubComponent02";
import TableSubComponent03 from "./TableSubComponent03";
import Grid from "@material-ui/core/Grid";

import CustomDialogExample from "./CustomDialogExample";
import GeneratorDetailsForRepoElement from "./GeneratorDetailsForRepoElement";
import SchemaCardForRepo from "./SchemaCardForRepo";
import GeneratorCardForRepo from "./GeneratorCardForRepo";
import GeneratorCardForRepo02 from "./GeneratorCardForRepo02";
import CustomDialogExample02 from "./CustomDialogExample02";
import DefaultVariablesComponent02 from "./DefaultVariablesComponent02";
import {customSystemVariable, customSystemVariables, generatorDescriptions, generatorDescription, schemaDescriptions, schemaDescriptionShort} from "./data.js";
import {dummyText} from "./data.js";
import {tableDataLong_2_Array} from "./data.js";
import LandingPage from "./pages/LandingPage";
import EditorPage from "./pages/EditorPage";
import SimpleDialogExample from "./SimpleDialogExample";
import SimpleDialogExample02 from "./SimpleDialogExample02";
import SimpleDialogExample03 from "./SimpleDialogExample03";
import SimpleDialogExample04 from "./SimpleDialogExample04";

import SimpleDialogExample05 from "./SimpleDialogExample05";
import GeneratorDetailsForRepoElementShortVersion from "./FormGeneratorDetailsRepoElement";

import PaddingDropDownElement from "./PaddingDropDownElement";

import props from 'prop-types';
import PropsTest from "./PropsTest";



function App() {
  const initialData = tableDataLong_2_Array;
  const [data, setData] = useState(initialData);
  const initialSchemaDescriptions = schemaDescriptions;
  const [schema, setSchema] = useState(initialSchemaDescriptions);
  const initialStateSchemaSelectionDialog = "closed";
  const [isOpenSchemaSelectionDialog, setIsOpenSchemaSelectionDialog] = useState(initialStateSchemaSelectionDialog); 
  
  
  
  return (
    <>
    <LandingPage schemaDescriptions={schema} stateSchemaSelectionDialog={isOpenSchemaSelectionDialog}/>
  
    <div style={{height: "40px",}}/>

    <EditorPage data={data}/>

    <div style={{height: "200px",}}/>
    





    {/*
    <SimpleDialogExample data={schemaDescriptions}/>
   
    <div style={{height: "50px",}}/>

    <SimpleDialogExample02 data={generatorDescriptions}/>

    <div style={{height: "50px",}}/>

    <SimpleDialogExample03 data={generatorDescriptions}/>

    <div style={{height: "50px",}}/>

    <SimpleDialogExample04 />


    <div style={{height: "50px",}}/>

    <SimpleDialogExample05 />


    
    <div style={{height: "400px", background: "white"}}/>


    <Grid xs={4}>
    <GeneratorDetailsForRepoElementShortVersion/>
    </Grid>

    <div style={{height: "50px",}}/>

    <Grid xs={3}>
    <GeneratorDetailsForRepoElementShortVersion/>
    </Grid>

    <div style={{height: "50px",}}/>

    <Grid xs={2}>
    <GeneratorDetailsForRepoElementShortVersion/>
    </Grid>

  
    <div style={{height: "50px",}}/>


    <input style={{fontSize: "16px", width: "30ch", backgroundColor: "white", }} type="text" placeholder="Test this, bitch!"/>

    <div>
        <TableComponent02 data ={data}/>
      </div>


      <div style={{height: "50px",}}/>



      <div>
        <TableComponent/>
      </div>


      <div style={{height: "100px", background: "white"}}/>


      <div>
        <TableSubComponent/>
      </div>
 
      <div style={{height: "100px", background: "white"}}/>

      <div>
        <TableSubComponent02/>
      </div>

      <div style={{height: "100px", background: "white"}}/>


      {/*}
      <div>
        <TableSubComponent03/>
      </div>
  */}

 {/*}
      <div style={{height: "100px", background: "white"}}/>


      <GeneratorDetailsForRepoElement/>

      <div style={{height: "100px", background: "white"}}/>

      <PaddingDropDownElement/>


      <div style={{height: "850px",}}/>
   
    <CentralButtonGroup/>
    <div>Hi, this is just the beginning!</div>
    <CustomDialogExample/>
    <div style={{height: "40px",}}/>
    <div style={{height: "40px",}}/>
    <GeneratorDetailsForRepoElement/>
    <div style={{height: "40px",}}/>
    <SchemaCardForRepo input={schemaDescriptionShort}/>
    <div style={{height: "40px",}}/>
    <GeneratorCardForRepo data={generatorDescriptions}/>
    <div style={{height: "40px",}}/>
    <GeneratorCardForRepo02/>
    <div style={{height: "40px",}}/>
    <CustomDialogExample02 input={schemaDescriptions}/>
    <div style={{height: "40px",}}/>
    <div>
        <DefaultVariablesComponent02/>
      </div>
      <div>
        <CustomVariablesContainer var = {customSystemVariables}/>
      </div>
      <div>
        <CustomVariablesSubComponent input = {customSystemVariable}/>
      </div>
      <div>
        <DefaultVariablesComponent/>
      </div>
      <div>
        <PropsTest value = "ABCD">
          <div>{props.value}</div>
        </PropsTest>
      </div>




  */}

   





</>
  );
}

export default App;
