import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import EditorButtonGroup from "./EditorButtonGroup";
import DefaultVariablesComponent02 from "./DefaultVariablesComponent02";
import CustomVariablesContainer from "./CustomVariablesContainer";
import {customSystemVariables, emptySchema, emptySchema0, generatorDescriptions, rawGeneratorDescriptions, dictListObj} from "./data.js"; 
import SchemaNameElement from "./SchemaNameElement";
import TableComponent from "./TableComponent";
import Button from "@material-ui/core/Button";
import DialogGeneratorSelection from "./DialogGeneratorSelection";
import DialogRawGeneratorSelection from "./DialogRawGeneratorSelection";
import DialogFormDictListGenerator from "./DialogFormDictListGenerator";
import DialogFormIdGenerator from "./DialogFormIdGenerator";

import DialogFormDummy01 from "./DialogFormDummy01";
import DialogFormDummy02 from "./DialogFormDummy02";
import DialogFormDummy03 from "./DialogFormDummy03";

import DialogFormLongGenerator from "./DialogFormLongGenerator_old";
import DialogFormDoubleGenerator from "./DialogFormDoubleGenerator";
import SimpleDialogExample05 from "./SimpleDialogExample05";
import DialogBlank from "./DialogBlank";
import DialogFormLongGeneratorV2 from "./DialogFormLongGeneratorV2";



export default function BodyEditor(props){
    const [isOpenSideBarRight, setIsOpenSideBarRight] = useState(true);
    const initialCurrentSchemaLocal = props.currentSchema;
    const [currentSchemaLocal, setCurrentSchemaLocal] = useState(initialCurrentSchemaLocal);
    const defaultTableSize = 10;
    const [isOpenGeneratorDialog, setIsOpenGeneratorDialog] = useState(false);
    const [isOpenRawGeneratorDialog, setIsOpenRawGeneratorDialog] = useState(false);
    const [isOpenDictListGenerator, setIsOpenDictListGenerator] = useState(false);
    const [isOpenIdGenerator, setIsOpenIdGenerator] = useState(false);
    const [isOpenLongGenerator, setIsOpenLongGenerator] = useState(false);
    const [isOpenDoubleGenerator, setIsOpenDoubleGenerator] = useState(false);
    const [isOpenDummy01, setIsOpenDummy01] = useState(false);
    const [isOpenDummy02, setIsOpenDummy02] = useState(false);
    const [isOpenDummy03, setIsOpenDummy03] = useState(false);
    const [isOpenBlank, setIsOpenBlank] = useState(false);
    const [tableFocus, setTableFocus] = useState({});
    const [isOpenLongGeneratorV2, setIsOpenLongGeneratorV2] = useState(false);


   
    const selectRawGeneratorHandler = (uid) => {
        const string = "setIsOpen" + uid;
        alert(string);
        setIsOpenRawGeneratorDialog(false);
        eval(string+"(true)"); 
    };



    // set Focus on table rows

    const setTableFocusHandler = (tableId, rowId) => {
        setTableFocus({tableId: tableId, rowId: rowId});
    };


    const unsetTableFocusHandler = () => {
        setTableFocus({});
    }


    //  save generators

    const saveGeneratorHandler = (generatorObject) => {
        let schemaNew = {...currentSchemaLocal};
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableFocus.tableId);
        let rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x => x.rowId === tableFocus.rowId);
        schemaNew.tables[tableIndex].tableItems[rowIndex].generator = generatorObject;
        setCurrentSchemaLocal(schemaNew);
        setTableFocus({});
    }


    const addNewTableHandler = () => {
        let schemaNew = {...currentSchemaLocal};
        let tableCounter = parseInt(schemaNew.uids.tableCounter);
        let newTableName = "Table " + (tableCounter+1);
        let newTableJSON = {          
                tableName: newTableName, 
                tableSize: defaultTableSize, 
                tableId: (tableCounter+1),
                rowCounter: 1,
                tableItems: [
                    {
                        tableId: (tableCounter+1), 
                        rowId: 1, 
                        fieldName: "Enter Table Name", 
                        generator: "Gen01", 
                        isKey: "false"},
                ],
                functions: {},
            };
        schemaNew.uids.tableCounter = (tableCounter + 1);
        schemaNew.tables.push(newTableJSON);
        setCurrentSchemaLocal(schemaNew);
    };


    
    const deleteTableHandler = (tableId) => {
        let schemaNew = {...currentSchemaLocal};
        let tables = schemaNew.tables;
        //let index = this.state.tables.findIndex(x => x.id === tableId);
        //let tablesWithout = tables.filter(x => x.id !== tableId);
        let tablesWithTableRemoved = tables.filter(x => x.tableId !== tableId);
        schemaNew.tables = tablesWithTableRemoved;
        setCurrentSchemaLocal(schemaNew);
    };


    const addTableRowHandler = (tableId) => {
        let schemaNew = {...currentSchemaLocal};
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        let rowCounter = schemaNew.tables[tableIndex].rowCounter;
        
        let newRow = {
            tableId: tableId, 
            rowId: rowCounter + 1, 
            fieldName: "Enter Table Name", 
            generator: "Select Generator", 
            isKey: "false",
        };
        schemaNew.tables[tableIndex].tableItems.push(newRow);
        schemaNew.tables[tableIndex].rowCounter = parseInt(rowCounter) + 1; 
        setCurrentSchemaLocal(schemaNew);

    };

   


    const deleteTableRowHandler = (tableId, rowId) => { 
        //alert("Boom    " + tableId + "     " + rowId);
        //alert("in deleteTableRowHandler: " + tableId + "   /    " + rowId);
        let schemaNew = {...currentSchemaLocal};
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        //alert("tableIndex: " + tableIndex);
        let rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x => x.rowId === rowId);
        //alert("rowIndex: " + rowIndex);
        schemaNew.tables[tableIndex].tableItems.splice(rowIndex,1);
        setCurrentSchemaLocal(schemaNew);
    }


    const schemaNameChangedHandler = (event, tableId) => {
        //alert("Entering tableNameChangedHandlerFunction");
        let schemaNew = {...currentSchemaLocal};
        schemaNew.info.schemaName = event.target.value;
        setCurrentSchemaLocal(schemaNew); 
    };


    const tableNameChangedHandler = (event, tableId) => {
        //alert("Entering tableNameChangedHandlerFunction");
        let schemaNew = {...currentSchemaLocal};
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        schemaNew.tables[tableIndex].tableName = event.target.value;
        setCurrentSchemaLocal(schemaNew); 
    };



    const tableSizeChangedHandler = (event, tableId) => {
        //alert("Entering tableNameChangedHandlerFunction");
        let schemaNew = {...currentSchemaLocal};
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        schemaNew.tables[tableIndex].tableSize = event.target.value;
        setCurrentSchemaLocal(schemaNew); 
    };


    const fieldNameChangedHandler = (event, tableId, rowId) => {
        let schemaNew = {...currentSchemaLocal};
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        //alert("Types tid / rid: " + (typeof tableId) + "  /  " + (typeof rowId));
        //alert("tableId: " + tableId + "    tableIndex" + tableIndex + "   JSON: " + JSON.stringify(schemaNew.tables));
        //alert((typeof schemaNew.tables[tableIndex].tableItems.rowId) + "typ  " + JSON.stringify(schemaNew.tables[tableIndex].tableItems.rowId) + " value");
        let rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x => x.rowId === rowId);
        //alert("rowId: " + rowId + "    rowIndex: " + rowIndex);
        //alert("TableIndex: " + tableIndex + " RowIndex: " + rowIndex + " Event : " + event.target.value);
        schemaNew.tables[tableIndex].tableItems[rowIndex].fieldName = event.target.value;
        setCurrentSchemaLocal(schemaNew); 
    };


    const defaultSystemVariableValueChangedHandler = (event, variableId) => {
        let schemaNew = {...currentSchemaLocal};
        let variableIndex = schemaNew.variables.defaultVariables.findIndex( x => x.variableId === variableId);
        schemaNew.variables.defaultVariables[variableIndex].value = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }


    const customSystemVariableNameChangedHandler = (event, variableId) => {
        let schemaNew = {...currentSchemaLocal};
        let variableIndex = schemaNew.variables.customVariables.variableItems.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables.variableItems[variableIndex].name = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }


    const customSystemVariableValueChangedHandler = (event, variableId) => {
        let schemaNew = {...currentSchemaLocal};
        let variableIndex = schemaNew.variables.customVariables.variableItems.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables.variableItems[variableIndex].value = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }


    const customSystemVariableTypeChangedHandler = (event, variableId) => {
        let schemaNew = {...currentSchemaLocal};
        let variableIndex = schemaNew.variables.customVariables.variableItems.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables.variableItems[variableIndex].type = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }


    const addCustomVariableHandler = () => {
        let schemaNew = {...currentSchemaLocal};
        const variableCounter = schemaNew.variables.customVariables.variableCounter
        const variableCounterNew = variableCounter +1;
        schemaNew.variables.customVariables.variableCounter = variableCounterNew;
        const extraInputElement =  {
            name: "Enter Name", 
            value: "Enter Value", 
            type: "Enter Type",
            variableId: variableCounterNew, };
        schemaNew.variables.customVariables.variableItems.push(extraInputElement);
        setCurrentSchemaLocal(schemaNew);
    };


    const deleteCustomSystemVariableHandler = (variableId) => {
        let schemaNew = {...currentSchemaLocal};
        let customVariablesWithout = schemaNew.variables.customVariables.variableItems.filter(x => x.variableId !== variableId);
        schemaNew.variables.customVariables.variableItems = customVariablesWithout;
        setCurrentSchemaLocal(schemaNew);
    }

    // reset operation
    const resetEditor = () => {
        setCurrentSchemaLocal(emptySchema0);
    }


    // Local Store operations

    const saveDataInLocalStore = () => {
        let schema = {...currentSchemaLocal};
        localStorage.setItem("MySchema", JSON.stringify(schema));
    }
    
    const loadDataFromLocalStore = () => {
        let schemaReloadedStringified = localStorage.getItem('MySchema');
        console.log("schemaStringified: " + schemaReloadedStringified); 
        let schemaReloaded = JSON.parse(schemaReloadedStringified);
        console.log("schema: " + schemaReloaded);
        setCurrentSchemaLocal(schemaReloaded);
    }
  


    // DialogGenerator Selection Operations
    
    const handleClickOpenGeneratorDialog = () => {
        setIsOpenRawGeneratorDialog(false); // maybe unexepected side effect ...
        setIsOpenGeneratorDialog(true);
        
        return null;
    };
    
    const handleCloseGeneratorDialog = () => {
        setIsOpenGeneratorDialog(false);
        return null;
    };



    // RawDialogGenerator Selection Operations
    
    const handleClickOpenRawGeneratorDialog = () => {
        setIsOpenGeneratorDialog(false); // maybe unexepected side effect ...
        setIsOpenRawGeneratorDialog(true);
        return null;
    };
    
    const handleCloseRawGeneratorDialog = () => {
        setIsOpenRawGeneratorDialog(false);
        return null;
    };



    // DialogFormDictListGenerator
    
    const handleCloseDictListGenerator = () => {
        setIsOpenDictListGenerator(false);
        return null;
    }

    const handleClickOpenDictListGenerator = () => {
        setIsOpenDictListGenerator(true);
        return null;
    }


// DialogFormIdGenerator
    
    const handleCloseIdGenerator = () => {
        setIsOpenIdGenerator(false);
        return null;
    }

    const handleClickOpenIdGenerator = () => {
        setIsOpenIdGenerator(true);
        return null;
    }

// DialogFormLongGenerator
    
    const handleCloseLongGenerator = () => {
        setIsOpenLongGenerator(false);
        return null;
    }

    const handleClickOpenLongGenerator = () => {
        setIsOpenLongGenerator(true);
        return null;
    }


// DialogFormLongGeneratorV2
    
const handleCloseLongGeneratorV2 = () => {
    setIsOpenLongGeneratorV2(false);
    return null;
}

const handleClickOpenLongGeneratorV2 = () => {
    setIsOpenLongGeneratorV2(true);
    return null;
}






// DialogFormDoubleGenerator
    
const handleCloseDoubleGenerator = () => {
    setIsOpenDoubleGenerator(false);
    return null;
}

const handleClickOpenDoubleGenerator = () => {
    setIsOpenDoubleGenerator(true);
    return null;
}


// DialogFormDummy01Generator
    
const handleCloseDummy01 = () => {
    setIsOpenDummy01(false);
    return null;
}

const handleClickOpenDummy01 = () => {
    setIsOpenDummy01(true);
    return null;
}


// DialogFormDummy02Generator
    
const handleCloseDummy02 = () => {
    setIsOpenDummy02(false);
    return null;
}

const handleClickOpenDummy02 = () => {
    setIsOpenDummy02(true);
    return null;
}


// DialogFormDummy03Generator
    
const handleCloseDummy03 = () => {
    setIsOpenDummy03(false);
    return null;
}

const handleClickOpenDummy03 = () => {
    setIsOpenDummy03(true);
    return null;
}


// DialogBlank
    
const handleCloseBlank = () => {
    setIsOpenBlank(false);
    return null;
}

const handleClickOpenBlank = () => {
    setIsOpenBlank(true);
    return null;
}










    // toggle SideBar on right side

    const toggleSidebarRight = () => {
        setIsOpenSideBarRight(!isOpenSideBarRight);
    }




    return(
        <div>
            <Grid container display="flex" direction="row" justify="flex-start" alignContent="flex-start" xs={12} spacing = {0} style={{background: "white", height: "90vh"}}>
               {/*first row*/}
               <Grid container item xs={12} style={{height: "250px"}} >
                    <Grid container item xs={9} justify="flex-start" alignContent="flex-end" style={{backgroundColor: "white", paddingBottom: "20px", paddingLeft:"20px"}}>
                    
                    <div> 
                        <Button onClick={()=>setIsOpenDictListGenerator(true)}>open Dialog DictList Spec</Button>
                        <Button onClick={()=>setIsOpenIdGenerator(true)}>open Dialog Id Spec</Button>
                        <Button onClick={()=>setIsOpenLongGenerator(true)}>open Dialog Long Spec</Button>
                        <Button onClick={()=>setIsOpenDoubleGenerator(true)}>open Dialog Double Spec</Button>

                        <Button onClick={()=>setIsOpenDummy01(true)}>open Dialog Dummy01</Button>
                        <Button onClick={()=>setIsOpenDummy02(true)}>open Dialog Dummy02</Button>
                        <Button onClick={()=>setIsOpenDummy03(true)}>open Dialog Dummy03</Button>
                        <Button onClick={()=>setIsOpenBlank(true)}>open Dialog Blank</Button>




                    </div>
                        <SchemaNameElement schemaName={currentSchemaLocal.info.schemaName} schemaNameChangedHandler = {schemaNameChangedHandler}/>
                       
                    </Grid>
                    <Grid container item xs={3} direction="row" justify="flex-end" alignContent="center"  style={{background: "white", paddingRight: "20px"}}>
                        <EditorButtonGroup 
                            addNewTableHandler = {addNewTableHandler}
                            resetEditor ={resetEditor}
                            toggleSidebarRight = {toggleSidebarRight}
                        />
                    </Grid>
                </Grid>

                 {/*second row*/}
                 
                <Grid container item xs={12} style={{height: "80vh"}}>  
                    {(isOpenSideBarRight? (
                    <Grid container item xs={10} display="flex" direction="row" justify="center" alignContent="center"  style={{ backgroundColor: "yellow", padding: "20px", borderColor: "white", borderStyle: "dashed", borderWidth: "1px", flexWrap: "wrap" }}>
                    {currentSchemaLocal.tables.map(table => {return( 
                            <TableComponent 
                                data={table} 
                                deleteTableHandler={deleteTableHandler} 
                                addTableRowHandler={addTableRowHandler} 
                                deleteTableRowHandler={deleteTableRowHandler}
                                tableNameChangedHandler={tableNameChangedHandler}
                                tableSizeChangedHandler ={tableSizeChangedHandler}
                                fieldNameChangedHandler ={fieldNameChangedHandler}
                                handleClickOpenGeneratorDialog = {handleClickOpenGeneratorDialog}
                                handleCloseGeneratorDialog = {handleCloseGeneratorDialog}
                                isOpenGeneratorDialog = {isOpenGeneratorDialog}
                                setTableFocusHandler={setTableFocusHandler}



                            />
                        )})
                    }
                    </Grid>):
                    (<Grid container item xs={12} display="flex" direction="row" justify="center" alignContent="center"  style={{ backgroundColor: "yellow", padding: "20px", borderColor: "white", borderStyle: "dashed", borderWidth: "1px", flexWrap: "wrap" }}>
                    {currentSchemaLocal.tables.map(table => {return( 
                            <TableComponent 
                                data={table} 
                                deleteTableHandler={deleteTableHandler} 
                                addTableRowHandler={addTableRowHandler} 
                                deleteTableRowHandler={deleteTableRowHandler}
                                tableNameChangedHandler={tableNameChangedHandler}
                                tableSizeChangedHandler ={tableSizeChangedHandler}
                                fieldNameChangedHandler ={fieldNameChangedHandler}
                                handleClickOpenGeneratorDialog = {handleClickOpenGeneratorDialog}
                                handleCloseGeneratorDialog = {handleCloseGeneratorDialog}
                                isOpenGeneratorDialog = {isOpenGeneratorDialog}
                                setTableFocusHandler={setTableFocusHandler}


                            />
                        )})
                    }
                    </Grid>))}


                    {(isOpenSideBarRight? (
                    <Grid container item xs={2} direction="column" justify="flex-start" alignContent="flex-end" style={{ backgroundColor: "green" }}> 
                        <Grid item  >
                            <DefaultVariablesComponent02 
                                variables={currentSchemaLocal.variables}
                                defaultSystemVariableValueChangedHandler ={defaultSystemVariableValueChangedHandler}
                            />
                        </Grid>
                        <Grid item style = {{width: "300px", height: "50vh",  overflow: "scroll" }}>
                            <CustomVariablesContainer 
                                variables={currentSchemaLocal.variables} 
                                addCustomVariableHandler = {addCustomVariableHandler}
                                deleteCustomSystemVariableHandler = {deleteCustomSystemVariableHandler}
                                customSystemVariableNameChangedHandler = {customSystemVariableNameChangedHandler}
                                customSystemVariableValueChangedHandler = {customSystemVariableValueChangedHandler}
                                customSystemVariableTypeChangedHandler = {customSystemVariableTypeChangedHandler}
                                
                            />

                        </Grid>
                    </Grid>) : null)}
                </Grid>   
                          
               
            </Grid>      
                            
            <DialogGeneratorSelection  isOpenGeneratorDialog={isOpenGeneratorDialog} handleCloseGeneratorDialog={handleCloseGeneratorDialog} data={generatorDescriptions} handleClickOpenRawGeneratorDialog={handleClickOpenRawGeneratorDialog} />                   
            <DialogRawGeneratorSelection  
                isOpenRawGeneratorDialog={isOpenRawGeneratorDialog} 
                handleCloseRawGeneratorDialog={handleCloseRawGeneratorDialog} 
                data={rawGeneratorDescriptions} 
                handleClickOpenGeneratorDialog={handleClickOpenGeneratorDialog} 
                selectRawGeneratorHandler={selectRawGeneratorHandler}/>
            <DialogFormDictListGenerator 
                isOpenDictListGenerator={isOpenDictListGenerator} handleCloseDictListGenerator={handleCloseDictListGenerator}/>
            <DialogFormIdGenerator 
                isOpenIdGenerator={isOpenIdGenerator} 
                handleCloseIdGenerator={handleCloseIdGenerator}
                saveGeneratorHandler={saveGeneratorHandler}/>
            <DialogFormLongGenerator 
                isOpenLongGenerator={isOpenLongGenerator} 
                handleCloseLongGenerator={handleCloseLongGenerator}/>
             <DialogFormLongGeneratorV2 
                isOpenLongGeneratorV2={isOpenLongGeneratorV2} 
                handleCloseLongGeneratorV2={handleCloseLongGeneratorV2}
                saveGeneratorHandler={saveGeneratorHandler}/>    
            <DialogFormDoubleGenerator 
                isOpenDoubleGenerator={isOpenDoubleGenerator} 
                handleCloseDoubleGenerator={handleCloseDoubleGenerator}/>
            <DialogFormDummy01 
                isOpenDummy01={isOpenDummy01} 
                handleCloseDummy01={handleCloseDummy01}
                saveGeneratorHandler={saveGeneratorHandler}/>
            <DialogFormDummy02 
                isOpenDummy02={isOpenDummy02} 
                handleCloseDummy02={handleCloseDummy02}
                saveGeneratorHandler={saveGeneratorHandler}/>
            <DialogFormDummy03 
                isOpenDummy03={isOpenDummy03} 
                handleCloseDummy03={handleCloseDummy03}
                saveGeneratorHandler={saveGeneratorHandler}/>
            <DialogBlank 
                isOpenBlank={isOpenBlank} 
                handleCloseBlank={handleCloseBlank}/>

          
        </div>
    )

}

