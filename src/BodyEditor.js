import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import EditorButtonGroup from "./EditorButtonGroup";
import DefaultVariablesComponent02 from "./DefaultVariablesComponent02";
import CustomVariablesContainer from "./CustomVariablesContainer";
import {customSystemVariables, emptySchema, emptySchema2, generatorDescriptions, rawGeneratorDescriptions} from "./data.js"; 
import SchemaNameElement from "./SchemaNameElement";
import TableComponent from "./TableComponent";
import Button from "@material-ui/core/Button";
import DialogGeneratorSelection from "./DialogGeneratorSelection";
import DialogRawGeneratorSelection from "./DialogRawGeneratorSelection";




export default function BodyEditor(props){
    const inititalStateIsOpenVariablePlate = true;
    const [isOpenVariablePlate, setIsOpenVariablePlate] = useState(inititalStateIsOpenVariablePlate);
    const initialCurrentSchemaLocal = props.currentSchema;
    const [currentSchemaLocal, setCurrentSchemaLocal] = useState(initialCurrentSchemaLocal);
    const initialTableCount = 2; 
    const [tableCounter, setTableCounter] = useState(initialTableCount);
    const defaultTableSize = 10;
    const [fairyDust, setFairyDust] = useState("nextone: isOpenGeneratorDialog");
    const [isOpenGeneratorDialog, setIsOpenGeneratorDialog] = useState(false);
    const [isOpenRawGeneratorDialog, setIsOpenRawGeneratorDialog] = useState(false);



    const fairy = () => {
        alert("Current Fairy Dust Color: " + fairyDust);
        return null
    }




    const addNewTableHandler = () => {
        let schemaNew = {...currentSchemaLocal};
        let newTableName = "Table " + tableCounter;
        let newTableJSON = {          
                tableName: newTableName, 
                tableSize: defaultTableSize, 
                tableId: tableCounter,
                rowCounter: 1,
                tableItems: [
                    {
                        tableId: 1, 
                        rowId: 1, 
                        fieldName: "Changed?", 
                        generator: "Gen01", 
                        isKey: "false"},
                ],
                functions: {},
            };
        setTableCounter(tableCounter + 1);
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
            fieldName: "Enter Name", 
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



    const addCustomVariableHandler = () => {
        let schemaNew = {...currentSchemaLocal};
        const extraInputElement =  {name: "Enter Name", value: "Enter Value", type: "Enter Type"};
        schemaNew.variables.customVariables.push(extraInputElement);
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
        let variableIndex = schemaNew.variables.customVariables.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables[variableIndex].name = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }


    const customSystemVariableValueChangedHandler = (event, variableId) => {
        let schemaNew = {...currentSchemaLocal};
        let variableIndex = schemaNew.variables.customVariables.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables[variableIndex].value = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }


    const customSystemVariableTypeChangedHandler = (event, variableId) => {
        let schemaNew = {...currentSchemaLocal};
        let variableIndex = schemaNew.variables.customVariables.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables[variableIndex].type = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }


    const deleteCustomSystemVariableHandler = (variableId) => {
        let schemaNew = {...currentSchemaLocal};
        let customVariablesWithout = schemaNew.variables.customVariables.filter(x => x.variableId !== variableId);
        schemaNew.variables.customVariables = customVariablesWithout;
        setCurrentSchemaLocal(schemaNew);
    }

    // reset operation
    const resetEditor = () => {
        setCurrentSchemaLocal(emptySchema2);
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









    return(
        <div>
            <Grid container display="flex" direction="row" justify="flex-start" alignContent="flex-start" xs={12} spacing = {0} style={{background: "white", height: "90vh"}}>
               
               {/*first row*/}
               <Grid container item xs={12} style={{height: "350px"}} >
                    <Grid container item xs={9} justify="flex-start" alignContent="flex-end" style={{backgroundColor: "yellow", paddingBottom: "20px", paddingLeft:"20px"}}>
                        <SchemaNameElement schemaName={currentSchemaLocal.info.schemaName} schemaNameChangedHandler = {schemaNameChangedHandler}/>
                    </Grid>
                    <Grid container item xs={3} direction="row" justify="flex-end" alignContent="center"  style={{background: "lightyellow", paddingRight: "20px"}}>
                        <EditorButtonGroup 
                            addNewTableHandler = {addNewTableHandler}
                            resetEditor ={resetEditor}
                            fairy ={fairy}/>
                    </Grid>
                </Grid>

                 {/*second row*/}
                <Grid container item xs={12}>  
                    <Grid container item xs={10} display="flex" direction="row" justify="center" alignContent="center"  style={{ backgroundColor: "white", padding: "20px", borderColor: "black", borderStyle: "dashed", borderWidth: "1px", flexWrap: "wrap" }}>
                    {currentSchemaLocal.tables.map(table => {return( 
                            <TableComponent 
                                data={table} 
                                deleteTableHandler={deleteTableHandler} 
                                addTableRowHandler={addTableRowHandler} 
                                deleteTableRowHandler={deleteTableRowHandler}
                                tableNameChangedHandler={tableNameChangedHandler}
                                tableSizeChangedHandler ={tableSizeChangedHandler}
                                fieldNameChangedHandler ={fieldNameChangedHandler}
                                fairy = {fairy}
                                handleClickOpenGeneratorDialog = {handleClickOpenGeneratorDialog}
                                handleCloseGeneratorDialog = {handleCloseGeneratorDialog}
                                isOpenGeneratorDialog = {isOpenGeneratorDialog}


                            />
                        )})
                    }
                    </Grid>
                    {(isOpenVariablePlate? (
                    <Grid container item xs={2} direction="column" justify="flex-start" alignContent="flex-end" style={{ backgroundColor: "white" }}> 
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
                                customSystemVariableNameChangedHandler = {customSystemVariableNameChangedHandler}
                                customSystemVariableValueChangedHandler = {customSystemVariableValueChangedHandler}
                                customSystemVariableTypeChangedHandler = {customSystemVariableTypeChangedHandler}
                                deleteCustomSystemVariableHandler = {deleteCustomSystemVariableHandler}
                            />

                        </Grid>
                    </Grid>) : null)}
                </Grid>   
                
                {/*<Button onClick={()=>{handleClickOpenRawGeneratorDialog()}}>
                    Open RawDialog</Button>         

                    <Button onClick={handleClickOpenGeneratorDialog}>
                    Open Dialog</Button>     


                    <Button onClick={handleClickOpenRawGeneratorDialog}>
                    least v1</Button>  
                    */}
            </Grid>      
            
            
            
            <DialogGeneratorSelection  isOpenGeneratorDialog={isOpenGeneratorDialog} handleCloseGeneratorDialog={handleCloseGeneratorDialog} data={generatorDescriptions} handleClickOpenRawGeneratorDialog={handleClickOpenRawGeneratorDialog} />                   
            <DialogRawGeneratorSelection  isOpenRawGeneratorDialog={isOpenRawGeneratorDialog} handleCloseRawGeneratorDialog={handleCloseRawGeneratorDialog} data={rawGeneratorDescriptions} handleClickOpenGeneratorDialog={handleClickOpenGeneratorDialog}/>
        
        
        
        </div>
    )

}

