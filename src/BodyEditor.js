import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import EditorButtonGroup from "./EditorButtonGroup";
import DefaultVariablesComponent02 from "./DefaultVariablesComponent02";
import CustomVariablesContainer from "./CustomVariablesContainer";
import {customSystemVariables, emptySchema,  generatorDescriptions, rawGeneratorDescriptions, dictListObj, emptyGenerator} from "./data.js"; 
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
import DialogStartPage from "./DialogStartPage";
import DialogUniversalGeneratorForm from "./DialogUniversalGeneratorForm";
import cloneDeep from 'lodash/cloneDeep';
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/Textfield";
import DialogSchemaSelection from "./DialogSchemaSelection";




export default function BodyEditor(props){
    const [isOpenSideBarRight, setIsOpenSideBarRight] = useState(true);
    const initialCurrentSchemaLocal = emptySchema;
    const [currentSchemaLocal, setCurrentSchemaLocal] = useState(initialCurrentSchemaLocal);
    const defaultTableSize = 10;
    const [isOpenGeneratorDialog, setIsOpenGeneratorDialog] = useState(false);
    const [isOpenRawGeneratorDialog, setIsOpenRawGeneratorDialog] = useState(false);
    const [isOpenDialogSaveSchema, setIsOpenDialogSaveSchema] = useState(false);
    const [isOpenBlank, setIsOpenBlank] = useState(false);
    const [tempGeneratorObject, setTempGeneratorObject] = useState({});
    const [universalGeneratorFormMode, setUniversalGeneratorFormMode] = useState("create");
    const [isOpenDialogStartPage, setIsOpenDialogStartPage] = useState(false);
    const [isOpenDialogSchemaSelection, setIsOpenDialogSchemaSelection] = useState(false);
    const [selectedGeneratorType, setSelectedGeneratorType] = useState("");
    const [fieldInFocus, setFieldInFocus] = useState({tableId: "", rowId: ""});
    const [isOpenDialogUniGenForm, setIsOpenDialogUniGenForm] = useState(false);
    const [copyGeneratorObject, setCopyGeneratorObject] = useState({emptyGenerator});




    const saveSchemaOnClickHandler = () => {
        addUidToSchema();
        saveSchemaInLocalStorage();
        //setTimeout(()=>{saveSchemaInLocalStorage();}, 4000);
    }



    const upgradeCopyGeneratorObject = (generatorObject) => {
        setCopyGeneratorObject(generatorObject);
    }
   
    const openInputMaskForSelectedGenerator = (typOfSelectedGenerator) => {
        setSelectedGeneratorType(typOfSelectedGenerator);
        setUniversalGeneratorFormMode("create");
        setIsOpenRawGeneratorDialog(false);
        setIsOpenDialogUniGenForm(true);
    };


    const selectGeneratorHandler = (uid) => {
        alert("uid passed: " + uid);
        const schemaNew = cloneDeep(currentSchemaLocal);
        const tableIndex = schemaNew.tables.findIndex(x => x.tableId === fieldInFocus.tableId);
        alert("tableIndex:   " + tableIndex);
        const rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x=> x.rowId === fieldInFocus.rowId);
        alert("rowIndex:   " + rowIndex);
        const generatorRepo = JSON.parse(localStorage.getItem("generatorRepository"));
        alert("generatorRepo: " + generatorRepo);
        const indexGenerator = generatorRepo.findIndex(x=> x.uid === uid);
        alert("generatorIndex:   " + indexGenerator);
        schemaNew.tables[tableIndex].tableItems[rowIndex].generator = generatorRepo[indexGenerator];
        setCurrentSchemaLocal(schemaNew);
        //alert("operation done!")
    };



    const resetGeneratorStateVariables = () => {
        setFieldInFocus({});
        setUniversalGeneratorFormMode("create");
        //setTempGeneratorObject({});
        setSelectedGeneratorType("BlankPage");
    }



    // set Focus on table rows

    const setFieldInFocusHandler = (tableId, rowId) => {
        setFieldInFocus({tableId: tableId, rowId: rowId});
    };


    const resetFieldInFocusHandler = () => {
        setFieldInFocus({});
    };


    const openDialogSchemaSelection = () => {
        setIsOpenDialogSchemaSelection(true);
    };





    //  save generators

    const addGeneratorToSchema = (generatorObject) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === fieldInFocus.tableId);
        alert("addGeneratorToSchema tableIndex: " + tableIndex);
        let rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x => x.rowId === fieldInFocus.rowId);
        schemaNew.tables[tableIndex].tableItems[rowIndex].generator = generatorObject;
        setCurrentSchemaLocal(schemaNew);
    }


    const addNewTableHandler = () => {
        let schemaNew = cloneDeep(currentSchemaLocal);
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
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tables = schemaNew.tables;
        //let index = this.state.tables.findIndex(x => x.id === tableId);
        //let tablesWithout = tables.filter(x => x.id !== tableId);
        let tablesWithTableRemoved = tables.filter(x => x.tableId !== tableId);
        schemaNew.tables = tablesWithTableRemoved;
        setCurrentSchemaLocal(schemaNew);
    };


    const addTableRowHandler = (tableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
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
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        let rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x => x.rowId === rowId);
        schemaNew.tables[tableIndex].tableItems.splice(rowIndex,1);
        setCurrentSchemaLocal(schemaNew);
    }


    const tableNameChangedHandler = (event, tableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        schemaNew.tables[tableIndex].tableName = event.target.value;
        setCurrentSchemaLocal(schemaNew); 
    };



    const tableSizeChangedHandler = (event, tableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        schemaNew.tables[tableIndex].tableSize = event.target.value;
        setCurrentSchemaLocal(schemaNew); 
    };


    const fieldNameChangedHandler = (event, tableId, rowId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        let rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x => x.rowId === rowId);
        schemaNew.tables[tableIndex].tableItems[rowIndex].fieldName = event.target.value;
        setCurrentSchemaLocal(schemaNew); 
    };


    const defaultSystemVariableValueChangedHandler = (event, variableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let variableIndex = schemaNew.variables.defaultVariables.findIndex( x => x.variableId === variableId);
        schemaNew.variables.defaultVariables[variableIndex].value = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }


    const customSystemVariableNameChangedHandler = (event, variableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let variableIndex = schemaNew.variables.customVariables.variableItems.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables.variableItems[variableIndex].name = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }


    const customSystemVariableValueChangedHandler = (event, variableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let variableIndex = schemaNew.variables.customVariables.variableItems.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables.variableItems[variableIndex].value = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }


    const customSystemVariableTypeChangedHandler = (event, variableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let variableIndex = schemaNew.variables.customVariables.variableItems.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables.variableItems[variableIndex].type = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }


    const addCustomVariableHandler = () => {
        let schemaNew = cloneDeep(currentSchemaLocal);
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
        let schemaNew = cloneDeep(currentSchemaLocal);
        let customVariablesWithout = schemaNew.variables.customVariables.variableItems.filter(x => x.variableId !== variableId);
        schemaNew.variables.customVariables.variableItems = customVariablesWithout;
        setCurrentSchemaLocal(schemaNew);
    }

    // reset operation
    const resetEditor = () => {
        setCurrentSchemaLocal(emptySchema);
    };


    // Browser Store for Generator
    const saveGeneratorInLocalStorage =(generatorObject) => {
        if (localStorage.getItem("generatorRepository") === null) {
            let generatorRepository = [];
            generatorRepository.push(generatorObject);
            localStorage.setItem("generatorRepository", JSON.stringify(generatorRepository));
        } else {
            let generatorRepository = JSON.parse(localStorage.getItem("generatorRepository"));
            generatorRepository.push(generatorObject);
            localStorage.setItem("generatorRepository", JSON.stringify(generatorRepository));
        }
    }

/*
    const loadGeneratorFromLocalStorage = () => {
        let generatorReloadedStringified = localStorage.getItem('generatorRepo');
        console.log("generatorStringified: " + generatorReloadedStringified); 
        let generatorReloaded = JSON.parse(generatorReloadedStringified);
        console.log("schema: " + generatorReloaded);
        setCurrentSchemaLocal(generatorReloaded);
    }

*/







    // Browser Store operations

   const saveSchemaInLocalStorage = () => {
    let currentSchema = cloneDeep(currentSchemaLocal);
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
    
    };
  

    // Load Schema from Browser Storage
    const loadSchemaFromRepo = (schemaUid) => {
        let schemaRepo = JSON.parse(localStorage.getItem("schemaRepository"));
        let schemaIndex = schemaRepo.findIndex(x => x.uids.schemaUid === schemaUid);
        setCurrentSchemaLocal(schemaRepo[schemaIndex]);
    };

    const deleteSchemaFromRepo = (schemaUid) => {
        alert("deleteSchemaFromRepoCalled");
        alert("SchemaUid: " + schemaUid);
        let schemaRepo = JSON.parse(localStorage.getItem("schemaRepository"));
        let schemaIndex = schemaRepo.findIndex(x => x.uids.schemaUid === schemaUid);
        alert("schemaIndex: " + schemaIndex);
        schemaRepo.splice(schemaIndex, 1);
        localStorage.setItem("schemaRepository", JSON.stringify(schemaRepo));
    };


    const deleteGeneratorFromRepo = (generatorUid) => {
        let generatorRepo = JSON.parse(localStorage.getItem("generatorRepository"));
        let generatorIndex = generatorRepo.findIndex(x => x.uid === generatorUid);
        generatorRepo.splice(generatorIndex, 1);
        localStorage.setItem("generatorRepository", JSON.stringify(generatorRepo));
    };






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
    const schemaNew =cloneDeep(currentSchemaLocal);
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
        const schemaNew = cloneDeep(currentSchemaLocal);
        schemaNew.info.schemaName = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    };

 
    const descriptionChangedHandler = (event) => {
        const schemaNew = cloneDeep(currentSchemaLocal);
        schemaNew.info.description = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    };

   
    const authorChangedHandler = (event) => {
        const schemaNew = cloneDeep(currentSchemaLocal);
        schemaNew.info.author = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    };

     
     const lastEditedChangedHandler = (event) => {
        const schemaNew = cloneDeep(currentSchemaLocal);
        schemaNew.info.lastEdited = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    };


    // DialogSaveSchema
    
    const handleCloseDialogSchemaSelection = () => {
        setIsOpenDialogSchemaSelection(false);
        return null;
    }

    const handleClickOpenDialogSchemaSelection = () => {
        setIsOpenDialogSchemaSelection(true);
        return null;
    }



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
        alert("In addVidToSchema. Uid Added: " + currentSchema.uids.schemaUid);
        return null;
    };



    // loadGeneratorToEditDialog
   
    const loadGeneratorToEditDialog = (tableId, rowId, generatorType) => {
        setFieldInFocus({tableId: tableId, rowId: rowId});
        setUniversalGeneratorFormMode("edit");
        alert("generator type: " + generatorType)
        setSelectedGeneratorType(generatorType);
        setIsOpenDialogUniGenForm(true);
       /* 
        const tableIndex = currentSchemaLocal.tables.findIndex(x => x.tableId === tableId);
        alert( "tableIndex: " +tableIndex);
        const rowIndex = currentSchemaLocal.tables[tableIndex].tableItems.findIndex(x => x.rowId === rowId);
        alert( "rowIndex: " +rowIndex);
        const generator = currentSchemaLocal.tables[tableIndex].tableItems[rowIndex].generator;
        const tableIndex = currentSchemaLocal.tables.findIndex(x => x.tableId === tableId);
        alert( "tableIndex: " +tableIndex);
        const rowIndex = currentSchemaLocal.tables[tableIndex].tableItems.findIndex(x => x.rowId === rowId);
        alert( "rowIndex: " +rowIndex);
        const generator = currentSchemaLocal.tables[tableIndex].tableItems[rowIndex].generator;
        setTempGeneratorObject(generator);
        alert( "generator: " + JSON.stringify(generator));
        //setIsInCreateMode(false);
        setIsOpenDialogUniGenForm(true);
        setSelectedGeneratorType(generator.type);
        //eval("setIsOpen" + generator.type+"(true)");// setting the isOpen- Variable for the needed generator to true.
        */
        return null;
    };


    const handleCloseDialogStartPage = () => {
        setIsOpenDialogStartPage(false);
    }


    const loadSelectedSchema = (schemaUID) => {
        setIsOpenDialogSchemaSelection(false);
        setIsOpenDialogStartPage(false);
        const schemaRepo = JSON.parse(localStorage.schemaRepository);
        const schemaIndex = schemaRepo.findIndex(x=> x.uids.schemaUid === schemaUID);
        setCurrentSchemaLocal(schemaRepo[schemaIndex]);
    };



    
    const handleCloseDialogUniGenForm = () => {
        //alert("entered: in handleCloseDialogUniGenForm");
        setIsOpenDialogUniGenForm(false);
    };


    const handleClickOpenDialogUniGenForm = () => {
        setIsOpenDialogUniGenForm(true);
        return null;
    };


    return(

        <>
        <div>
            
              <div style={{display: "flex", flexDirection: "row", justifycontent: "flex-start"}}>
                
                <div>
                    <Typography>UniversalFormMode:</Typography>
                    <Input value={universalGeneratorFormMode}/>
                </div>
                
                <div>
                    <Typography>FieldInFocus:</Typography>
                    <Input value={JSON.stringify(fieldInFocus)}/>
                </div>
                
                <div>
                    <Typography>selectedGeneratorType:</Typography>
                    <Input value={selectedGeneratorType}/>
                </div>
                
                <div>
                    <Typography>TempGeneratorObject:</Typography>
                    <Input value={JSON.stringify(tempGeneratorObject)}/>
                </div>
                {/*} <div>Percent NullValues: {copyGeneratorObject.nullValues.percentNullValues} </div>

                <div>Save in Repo: </div> <Input value={copyGeneratorObject.repoVariables.saveInRepo} />*/}

            </div>
                <div>
                    {JSON.stringify(copyGeneratorObject)}
                </div>
               

             


            <Grid container display="flex" direction="row" justify="flex-start" alignContent="flex-start" spacing = {0} style={{background: "white", height: "90vh"}}>
               {/*first row*/}
               <Grid container item xs={12} style={{height: "250px"}} >
                    <Grid container item xs={9} justify="flex-start" alignContent="flex-end" style={{backgroundColor: "white", paddingBottom: "20px", paddingLeft:"20px"}}>
                    
                        <SchemaNameElement schemaName={currentSchemaLocal.info.schemaName} schemaNameChangedHandler = {schemaNameChangedHandler}/>
                       
                    </Grid>
                    <Grid container item xs={3} direction="row" justify="flex-end" alignContent="center"  style={{background: "white", paddingRight: "20px"}}>
                        <EditorButtonGroup 
                            addNewTableHandler = {addNewTableHandler}
                            resetEditor ={resetEditor}
                            toggleSidebarRight = {toggleSidebarRight}
                            handleClickOpenDialogSaveSchema={handleClickOpenDialogSaveSchema}
                            openDialogSchemaSelection={openDialogSchemaSelection}
                        ><div></div>
                        </EditorButtonGroup>
                    </Grid>
                </Grid>

                 {/*second row*/}
                 
                <Grid container item xs={12} style={{height: "80vh"}}>  
                    {(isOpenSideBarRight? (
                    <Grid container item xs={10} display="flex" direction="row" justify="center" alignContent="center"  style={{ backgroundColor: "yellow", padding: "20px", borderColor: "white", borderStyle: "dashed", borderWidth: "1px", flexWrap: "wrap" }}>    
                    {currentSchemaLocal.tables.map(table => {return( 
                            <TableComponent
                                key={table.tableId} 
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
                                setFieldInFocusHandler={setFieldInFocusHandler}
                                loadGeneratorToEditDialog = {loadGeneratorToEditDialog}
                               

                            />
                        )})
                    }
                    </Grid>):
                    (<Grid container item xs={12} display="flex" direction="row" justify="center" alignContent="center"  style={{ backgroundColor: "yellow", padding: "20px", borderColor: "white", borderStyle: "dashed", borderWidth: "1px", flexWrap: "wrap" }}>
                    {currentSchemaLocal.tables.map(table => {return( 
                            <TableComponent
                                key={table.tableId} 
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
                                setFieldInFocusHandler={setFieldInFocusHandler}
                                loadGeneratorToEditDialog = {loadGeneratorToEditDialog}
                               

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
                openInputMaskForSelectedGenerator={openInputMaskForSelectedGenerator}
            />

            <DialogSchemaSelection   
                handleCloseDialogSchemaSelection={handleCloseDialogSchemaSelection}
                isOpenDialogSchemaSelection={ isOpenDialogSchemaSelection}
                loadSelectedSchema={loadSelectedSchema}
                deleteSchemaFromRepo={deleteSchemaFromRepo}
                />

            {/*
            <DialogFormDictListGenerator 
                isOpenDictListGenerator={isOpenDictListGenerator} 
                handleCloseDictListGenerator={handleCloseDictListGenerator}
                addGeneratorToSchema={addGeneratorToSchema}
                saveGeneratorInLocalStorage={saveGeneratorInLocalStorage}
            />
            <DialogFormIdGenerator 
                isOpenIdGenerator={isOpenIdGenerator} 
                handleCloseIdGenerator={handleCloseIdGenerator}
                addGeneratorToSchema={addGeneratorToSchema}
                saveGeneratorInLocalStorage={saveGeneratorInLocalStorage}
                tempGeneratorObject={tempGeneratorObject}
                isInCreateMode={isInCreateMode}
            />
            <DialogFormLongGenerator 
                isOpenLongGenerator={isOpenLongGenerator} 
                handleCloseLongGenerator={handleCloseLongGenerator}
                addGeneratorToSchema={addGeneratorToSchema}
                saveGeneratorInLocalStorage={saveGeneratorInLocalStorage}
            />
            <DialogFormDoubleGenerator 
                isOpenDoubleGenerator={isOpenDoubleGenerator} 
                handleCloseDoubleGenerator={handleCloseDoubleGenerator}
                addGeneratorToSchema={addGeneratorToSchema}
                saveGeneratorInLocalStorage={saveGeneratorInLocalStorage}
                
            />
            <DialogFormDateTimeGenerator 
                isOpenDateTimeGenerator={isOpenDateTimeGenerator} 
                handleCloseDateTimeGenerator={handleCloseDateTimeGenerator}
                addGeneratorToSchema={addGeneratorToSchema}
                saveGeneratorInLocalStorage={saveGeneratorInLocalStorage}
            />
             <DialogFormRandomStringGenerator 
                isOpenRandomStringGenerator={isOpenRandomStringGenerator} 
                handleCloseRandomStringGenerator={handleCloseRandomStringGenerator}
                addGeneratorToSchema={addGeneratorToSchema}
                saveGeneratorInLocalStorage={saveGeneratorInLocalStorage}
            />
            <DialogFormRandomSentenceGenerator 
                isOpenRandomSentenceGenerator={isOpenRandomSentenceGenerator} 
                handleCloseRandomSentenceGenerator={handleCloseRandomSentenceGenerator}
                addGeneratorToSchema={addGeneratorToSchema}
                saveGeneratorInLocalStorage={saveGeneratorInLocalStorage}
            />

            */}
            <DialogBlank 
                isOpenBlank={isOpenBlank} 
                handleCloseBlank={handleCloseBlank}
            />
              <DialogSaveSchema 
                isOpenDialogSaveSchema={isOpenDialogSaveSchema} 
                handleCloseDialogSaveSchema={handleCloseDialogSaveSchema}
                saveSchemaInLocalStorage={saveSchemaInLocalStorage}
                schemaInfoObject={currentSchemaLocal.info}
                schemaNameChangedHandler={schemaNameChangedHandler}
                descriptionChangedHandler={descriptionChangedHandler}
                authorChangedHandler={authorChangedHandler}
                lastEditedChangedHandler={lastEditedChangedHandler}
                addUidToSchema={addUidToSchema}
                saveSchemaOnClickHandler={saveSchemaOnClickHandler}

            />
            <DialogStartPage 
                isOpenDialogStartPage={isOpenDialogStartPage}
                handleCloseDialogStartPage={handleCloseDialogStartPage}
                handleClickOpenDialogSchemaSelection={handleClickOpenDialogSchemaSelection}
                handleCloseDialogSchemaSelection={handleCloseDialogSchemaSelection}
                isOpenDialogSchemaSelection={ isOpenDialogSchemaSelection}
                loadSelectedSchema={loadSelectedSchema}
                deleteSchemaFromRepo={deleteSchemaFromRepo}
            />
            <DialogUniversalGeneratorForm
               
                isOpenDialogUniGenForm = {isOpenDialogUniGenForm}
                selectedGeneratorType={selectedGeneratorType}
                handleCloseDialogUniGenForm = {handleCloseDialogUniGenForm}
                currentSchemaLocal={currentSchemaLocal}
                addGeneratorToSchema={addGeneratorToSchema}
                saveGeneratorInLocalStorage={saveGeneratorInLocalStorage}
                universalGeneratorFormMode={universalGeneratorFormMode}
                fieldInFocus={fieldInFocus}
                upgradeCopyGeneratorObject={upgradeCopyGeneratorObject}
                resetGeneratorStateVariables={resetGeneratorStateVariables}

            />        
        </div>
        </>
    )

}

