import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import EditorButtonGroup from "./EditorButtonGroup";
import DefaultVariablesComponent02 from "./DefaultVariablesComponent02";
import CustomVariablesContainer from "./CustomVariablesContainer";
import {emptySchema,  generatorDescriptions, rawGeneratorDescriptions, emptyGenerator} from "./data.js"; 
import SchemaNameElement from "./SchemaNameElement";
import TableComponent from "./TableComponent";
import DialogGeneratorSelection from "./DialogGeneratorSelection";
import DialogRawGeneratorSelection from "./DialogRawGeneratorSelection";
import DialogBlank from "./DialogBlank";
import DialogSaveSchema from "./DialogSaveSchema";
import DialogStartPage from "./DialogStartPage";
import DialogUniversalGeneratorForm from "./DialogUniversalGeneratorForm";
import cloneDeep from 'lodash/cloneDeep';
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
        setSelectedGeneratorType("BlankPage");
    }



    // set Focus on table rows

    const setFieldInFocusHandler = (tableId, rowId) => {
        setFieldInFocus({tableId: tableId, rowId: rowId});
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
            fieldName: "Enter Field Name", 
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
  
    const deleteSchemaFromRepo = (schemaUid) => {
        alert("deleteSchemaFromRepoCalled");
        alert("SchemaUid: " + schemaUid);
        let schemaRepo = JSON.parse(localStorage.getItem("schemaRepository"));
        let schemaIndex = schemaRepo.findIndex(x => x.uids.schemaUid === schemaUid);
        alert("schemaIndex: " + schemaIndex);
        schemaRepo.splice(schemaIndex, 1);
        localStorage.setItem("schemaRepository", JSON.stringify(schemaRepo));
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



    return(

        <>
        <div>
            
              

             


            <Grid container display="flex" direction="row" justify="flex-start" alignContent="flex-start" spacing = {0} style={{background: "white", height: "90vh"}}>
               {/*first row*/}
               <Grid container item xs={12} style={{height: "250px"}} >
                    <Grid item xs={9} style={{backgroundColor: "white", paddingBottom: "20px", paddingLeft:"20px"}}>
                    
                        <SchemaNameElement schemaName={currentSchemaLocal.info.schemaName} schemaNameChangedHandler = {schemaNameChangedHandler}/>
                       
                    </Grid>
                    <Grid item xs={3} style={{background: "white", paddingRight: "20px"}}>
                        <EditorButtonGroup 
                            addNewTableHandler = {addNewTableHandler}
                            resetEditor ={resetEditor}
                            toggleSidebarRight = {toggleSidebarRight}
                            handleClickOpenDialogSaveSchema={handleClickOpenDialogSaveSchema}
                            openDialogSchemaSelection={openDialogSchemaSelection}
                            setIsOpenRawGeneratorDialog={setIsOpenRawGeneratorDialog}
                            isOpenRawGeneratorDialog={isOpenRawGeneratorDialog}
                        ><div></div>
                        </EditorButtonGroup>
                    </Grid>
                </Grid>

                 {/*second row*/}
                 
                <Grid item xs={12} style={{height: "80vh"}}>  
                    {(isOpenSideBarRight? (
                    <div fullWidth style={{ display: "flex",  flexDirection: "row",  justifyContent: "center", alignItems: "center", alignContent:"center", backgroundColor: "yellow", padding: "20px", borderColor: "white", borderStyle: "dashed", borderWidth: "1px", flexWrap: "wrap", flexGrow: "1" }}>    
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
                    </div>):
                    (<Grid item xs={12}  style={{ backgroundColor: "yellow", padding: "20px", borderColor: "white", borderStyle: "dashed", borderWidth: "1px", flexWrap: "wrap" }}>
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
                    <div   style = {{display: "flex", flexDirection: "column", justify: "flex-start", width: "300px", backgroundColor: "green" }}> 
                        <div  style = {{width: "300px" }}>
                            <DefaultVariablesComponent02 
                                variables={currentSchemaLocal.variables}
                                defaultSystemVariableValueChangedHandler ={defaultSystemVariableValueChangedHandler}
                            />
                        </div>
                        <div style = {{width: "300px", height: "50vh",  overflow: "scroll" }}>
                            <CustomVariablesContainer 
                                variables={currentSchemaLocal.variables} 
                                addCustomVariableHandler = {addCustomVariableHandler}
                                deleteCustomSystemVariableHandler = {deleteCustomSystemVariableHandler}
                                customSystemVariableNameChangedHandler = {customSystemVariableNameChangedHandler}
                                customSystemVariableValueChangedHandler = {customSystemVariableValueChangedHandler}
                                customSystemVariableTypeChangedHandler = {customSystemVariableTypeChangedHandler}
                                
                            />

                        </div>
                    </div>) : null)}
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

