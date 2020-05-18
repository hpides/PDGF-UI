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
import DialogFormDoubleGenerator from "./DialogFormDoubleGenerator";
import SimpleDialogExample05 from "./SimpleDialogExample05";
import DialogBlank from "./DialogBlank";
import DialogFormLongGenerator from "./DialogFormLongGenerator";
import DialogFormDateTimeGenerator from "./DialogFormDateTimeGenerator";
import DialogFormRandomStringGenerator from "./DialogFormRandomStringGenerator";
import DialogFormRandomSentenceGenerator from "./DialogFormRandomSentenceGenerator";
import DialogSaveSchema from "./DialogSaveSchema";




export default function BodyEditor(props){
    const [isOpenSideBarRight, setIsOpenSideBarRight] = useState(true);
    const initialCurrentSchemaLocal = props.currentSchema;
    const [currentSchemaLocal, setCurrentSchemaLocal] = useState(initialCurrentSchemaLocal);
    const defaultTableSize = 10;
    const [isOpenGeneratorDialog, setIsOpenGeneratorDialog] = useState(false);
    const [isOpenRawGeneratorDialog, setIsOpenRawGeneratorDialog] = useState(false);
    const [isOpenDictListGenerator, setIsOpenDictListGenerator] = useState(false);
    const [isOpenDialogSaveSchema, setIsOpenDialogSaveSchema] = useState(false);
    const [isOpenIdGenerator, setIsOpenIdGenerator] = useState(false);
    const [isOpenLongGenerator, setIsOpenLongGenerator] = useState(false);
    const [isOpenDoubleGenerator, setIsOpenDoubleGenerator] = useState(false);
    const [isOpenDateTimeGenerator, setIsOpenDateTimeGenerator] = useState(false);
    const [isOpenRandomStringGenerator, setIsOpenRandomStringGenerator] = useState(false);
    const [isOpenRandomSentenceGenerator, setIsOpenRandomSentenceGenerator] = useState(false);
    const [isOpenDummy03, setIsOpenDummy03] = useState(false);
    const [isOpenBlank, setIsOpenBlank] = useState(false);
    const [tableFocus, setTableFocus] = useState({});


   
    const selectRawGeneratorHandler = (uid) => {
        const string = "setIsOpen" + uid;
        setIsOpenRawGeneratorDialog(false);
        eval(string+"(true)"); 
    };


    const selectGeneratorHandler = (uid) => {
        //alert("uid passed: " + uid);
        const schemaNew = {...currentSchemaLocal};
        const tableIndex = schemaNew.tables.findIndex(x => x.tableIndex === tableFocus.tableIndex);
        //alert("tableIndex:   " + tableIndex);
        const rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x=> x.rowId === tableFocus.rowId);
        //alert("rowIndex:   " + rowIndex);
        const generatorRepo = JSON.parse(localStorage.getItem("generatorRepository"));
        //alert("generatorRepo: " + generatorRepo);
        const indexGenerator = generatorRepo.findIndex(x=> x.uid === uid);
        //alert("generatorIndex:   " + indexGenerator);
        schemaNew.tables[tableIndex].tableItems[rowIndex].generator = generatorRepo[indexGenerator];
        //alert("operation done!")
    };








    // set Focus on table rows

    const setTableFocusHandler = (tableId, rowId) => {
        setTableFocus({tableId: tableId, rowId: rowId});
    };


    const resetTableFocusHandler = () => {
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
        let schemaNew = {...currentSchemaLocal};
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        let rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x => x.rowId === rowId);
        schemaNew.tables[tableIndex].tableItems.splice(rowIndex,1);
        setCurrentSchemaLocal(schemaNew);
    }


    const tableNameChangedHandler = (event, tableId) => {
        let schemaNew = {...currentSchemaLocal};
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        schemaNew.tables[tableIndex].tableName = event.target.value;
        setCurrentSchemaLocal(schemaNew); 
    };



    const tableSizeChangedHandler = (event, tableId) => {
        let schemaNew = {...currentSchemaLocal};
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        schemaNew.tables[tableIndex].tableSize = event.target.value;
        setCurrentSchemaLocal(schemaNew); 
    };


    const fieldNameChangedHandler = (event, tableId, rowId) => {
        let schemaNew = {...currentSchemaLocal};
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        let rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x => x.rowId === rowId);
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
    };


    // Browser Store for Generator
    const saveGeneratorInBrowserStorage =(generatorObject) => {
        alert("in saveGeneratorInBrowserStorage");
        if (localStorage.getItem("generatorRepository") === null) {
            alert("generatorRepo === null");
            let generatorRepository = [];
            generatorRepository.push(generatorObject);
            localStorage.setItem("generatorRepository", JSON.stringify(generatorRepository));
        } else {
            let generatorRepository = JSON.parse(localStorage.getItem("generatorRepository"));
            alert("generatorRepo !== null");
            generatorRepository.push(generatorObject);
            localStorage.setItem("generatorRepository", JSON.stringify(generatorRepository));
        }
    }

/*
    const loadGeneratorFromBrowserStorage = () => {
        let generatorReloadedStringified = localStorage.getItem('generatorRepo');
        console.log("generatorStringified: " + generatorReloadedStringified); 
        let generatorReloaded = JSON.parse(generatorReloadedStringified);
        console.log("schema: " + generatorReloaded);
        setCurrentSchemaLocal(generatorReloaded);
    }

*/







    // Browser Store operations

   const saveSchemaInBrowserStorage = () => {
    let currentSchema = {...currentSchemaLocal};
    let schemaRepositoryStringified = localStorage.getItem("schemaRepository");
        if (schemaRepositoryStringified === null) {
            let schemaRepository = [];
            schemaRepository.push(currentSchema);
            localStorage.setItem("schemaRepository", JSON.stringify(schemaRepository));
        } else {
            let schemaRepository = JSON.parse(localStorage.getItem("schemaRepository"));
            schemaRepository.push(currentSchema);
            localStorage.setItem("schemaRepository", JSON.stringify(schemaRepository));
        }
    
    }
  

    // Load Schema from Browser Storage
    const loadSchemaFromRepo = (schemaUid) => {
        let schemaRepo = JSON.parse(localStorage.getItem("schemaRepo"));
        let schemaIndex = schemaRepo.findIndex(x => x.uid === schemaUid);
        setCurrentSchemaLocal(schemaRepo[schemaIndex]);
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

// DialogFormDoubleGenerator
    
const handleCloseDoubleGenerator = () => {
    setIsOpenDoubleGenerator(false);
    return null;
}

const handleClickOpenDoubleGenerator = () => {
    setIsOpenDoubleGenerator(true);
    return null;
}

// DialogFormDateTimeGenerator
    
const handleCloseDateTimeGenerator = () => {
    setIsOpenDateTimeGenerator(false);
    return null;
}

const handleClickOpenDateTimeGenerator = () => {
    setIsOpenDateTimeGenerator(true);
    return null;
}

// DialogFormRandomStringGenerator
    
const handleCloseRandomStringGenerator = () => {
    setIsOpenRandomStringGenerator(false);
    return null;
}

const handleClickOpenRandomStringGenerator = () => {
    setIsOpenRandomStringGenerator(true);
    return null;
}

// DialogFormRandomSentenceGenerator
    
const handleCloseRandomSentenceGenerator = () => {
    setIsOpenRandomSentenceGenerator(false);
    return null;
}

const handleClickOpenRandomSentenceGenerator = () => {
    setIsOpenRandomSentenceGenerator(true);
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




    // Date Time operations
    const printTimeStamp = () => {
        const d = new Date();
        let timeStamp = d.getDate();
        return timeStamp;
    }


    // 
    const infoObjectChangedHandler = (infoObject) => {
    const schemaNew ={...currentSchemaLocal};
    schemaNew.info = infoObject;
    setCurrentSchemaLocal(schemaNew); 
    }


    // DialogSaveSchema
    
    const handleCloseDialogSaveSchema = () => {
        setIsOpenDialogSaveSchema(false);
        return null;
    }

    const handleClickOpenDialogSaveSchema = () => {
        setIsOpenDialogSaveSchema(true);
        return null;
    }


    // Change Handler for DialogSaveSchema
    const schemaNameChangedHandler = (event) => {
        const schemaNew = {...currentSchemaLocal};
        schemaNew.info.schemaName = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    };

 
    const descriptionChangedHandler = (event) => {
        const schemaNew = {...currentSchemaLocal};
        schemaNew.info.description = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    };

   
    const authorChangedHandler = (event) => {
        const schemaNew = {...currentSchemaLocal};
        schemaNew.info.author = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    };

     
     const lastEditedChangedHandler = (event) => {
        const schemaNew = {...currentSchemaLocal};
        schemaNew.info.lastEdited = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    };









    // toggle SideBar on right side

    const toggleSidebarRight = () => {
        setIsOpenSideBarRight(!isOpenSideBarRight);
    }


    // createSchemaUid -> uid = Milli-Sekunden seit dem 01.01.2020

    const addUidToSchema = () => {
        const miliSecondsFrom1970To2020 = 1577785488*1000;
        const uid = Date.now() - miliSecondsFrom1970To2020; 
        const currentSchema = {...currentSchemaLocal};
        currentSchema.uids.schemaUid = uid;
        setCurrentSchemaLocal(currentSchema);
        return null;
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
                        
                    </div>
                        <SchemaNameElement schemaName={currentSchemaLocal.info.schemaName} schemaNameChangedHandler = {schemaNameChangedHandler}/>
                       
                    </Grid>
                    <Grid container item xs={3} direction="row" justify="flex-end" alignContent="center"  style={{background: "white", paddingRight: "20px"}}>
                        <EditorButtonGroup 
                            addNewTableHandler = {addNewTableHandler}
                            resetEditor ={resetEditor}
                            toggleSidebarRight = {toggleSidebarRight}
                            handleClickOpenDialogSaveSchema={handleClickOpenDialogSaveSchema}
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
                            
            <DialogGeneratorSelection  
                isOpenGeneratorDialog={isOpenGeneratorDialog} 
                handleCloseGeneratorDialog={handleCloseGeneratorDialog} 
                data={generatorDescriptions} 
                handleClickOpenRawGeneratorDialog={handleClickOpenRawGeneratorDialog}
                selectGeneratorHandler={selectGeneratorHandler} 
            />                   
            <DialogRawGeneratorSelection  
                isOpenRawGeneratorDialog={isOpenRawGeneratorDialog} 
                handleCloseRawGeneratorDialog={handleCloseRawGeneratorDialog} 
                data={rawGeneratorDescriptions} 
                handleClickOpenGeneratorDialog={handleClickOpenGeneratorDialog} 
                selectRawGeneratorHandler={selectRawGeneratorHandler}
            />
            <DialogFormDictListGenerator 
                isOpenDictListGenerator={isOpenDictListGenerator} 
                handleCloseDictListGenerator={handleCloseDictListGenerator}
                saveGeneratorHandler={saveGeneratorHandler}
                saveGeneratorInBrowserStorage={saveGeneratorInBrowserStorage}
            />
            <DialogFormIdGenerator 
                isOpenIdGenerator={isOpenIdGenerator} 
                handleCloseIdGenerator={handleCloseIdGenerator}
                saveGeneratorHandler={saveGeneratorHandler}
                saveGeneratorInBrowserStorage={saveGeneratorInBrowserStorage}
            />
            <DialogFormLongGenerator 
                isOpenLongGenerator={isOpenLongGenerator} 
                handleCloseLongGenerator={handleCloseLongGenerator}
                saveGeneratorHandler={saveGeneratorHandler}
                saveGeneratorInBrowserStorage={saveGeneratorInBrowserStorage}
            />
            <DialogFormDoubleGenerator 
                isOpenDoubleGenerator={isOpenDoubleGenerator} 
                handleCloseDoubleGenerator={handleCloseDoubleGenerator}
                saveGeneratorHandler={saveGeneratorHandler}
                saveGeneratorInBrowserStorage={saveGeneratorInBrowserStorage}
            />
            <DialogFormDateTimeGenerator 
                isOpenDateTimeGenerator={isOpenDateTimeGenerator} 
                handleCloseDateTimeGenerator={handleCloseDateTimeGenerator}
                saveGeneratorHandler={saveGeneratorHandler}
                saveGeneratorInBrowserStorage={saveGeneratorInBrowserStorage}
            />
             <DialogFormRandomStringGenerator 
                isOpenRandomStringGenerator={isOpenRandomStringGenerator} 
                handleCloseRandomStringGenerator={handleCloseRandomStringGenerator}
                saveGeneratorHandler={saveGeneratorHandler}
                saveGeneratorInBrowserStorage={saveGeneratorInBrowserStorage}
            />
            <DialogFormRandomSentenceGenerator 
                isOpenRandomSentenceGenerator={isOpenRandomSentenceGenerator} 
                handleCloseRandomSentenceGenerator={handleCloseRandomSentenceGenerator}
                saveGeneratorHandler={saveGeneratorHandler}
                saveGeneratorInBrowserStorage={saveGeneratorInBrowserStorage}
            />
            <DialogBlank 
                isOpenBlank={isOpenBlank} 
                handleCloseBlank={handleCloseBlank}
            />
              <DialogSaveSchema 
                isOpenDialogSaveSchema={isOpenDialogSaveSchema} 
                handleCloseDialogSaveSchema={handleCloseDialogSaveSchema}
                saveSchemaInBrowserStorage={saveSchemaInBrowserStorage}
                schemaInfoObject={currentSchemaLocal.info}
                schemaNameChangedHandler={schemaNameChangedHandler}
                descriptionChangedHandler={descriptionChangedHandler}
                authorChangedHandler={authorChangedHandler}
                lastEditedChangedHandler={lastEditedChangedHandler}
                addUidToSchema={addUidToSchema}

            />

          
        </div>
    )

}

