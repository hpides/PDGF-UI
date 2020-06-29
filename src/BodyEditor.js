/*
 * WALT - A realistic load generator for web applications.
 *
 * Copyright 2020 Eric Ackermann <eric.ackermann@student.hpi.de>, Hendrik Bomhardt
 * <hendrik.bomhardt@student.hpi.de>, Benito Buchheim
 * <benito.buchheim@student.hpi.de>, Juergen Schlossbauer
 * <juergen.schlossbauer@student.hpi.de>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useState, useEffect, useContext} from "react";
import {TooltipContext} from "./App";
import CustomTooltip from "./CustomTooltip";
import Grid from "@material-ui/core/Grid";
import EditorButtonGroup from "./EditorButtonGroup";
import {emptySchema, emptyGenerator, rawGeneratorDescriptions} from "./data.js"; 
import SchemaNameElement from "./SchemaNameElement";
import TableComponent from "./TableComponent";
import DialogGeneratorSelection from "./DialogGeneratorSelection";
import DialogRawGeneratorSelection from "./DialogRawGeneratorSelection";
import DialogBlank from "./DialogBlank";
import DialogSaveSchema from "./DialogSaveSchema";
import DialogStartPage from "./DialogStartPage";
import DialogUniversalGeneratorForm from "./DialogUniversalGeneratorForm";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import cloneDeep from 'lodash/cloneDeep';
import DialogSchemaSelection from "./DialogSchemaSelection";
import "./CustomScrollbar.css";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import DraggableCore from "react-draggable";
import Hotkeys from "react-hot-keys";
import {useHotkeys} from "react-hotkeys-hook";
import VariablesSidebar from "./VariablesSidebar";
import {saveAs} from 'file-saver';
import format from "xml-formatter";
import background from "./assets/graphPaper1.svg";
import {infoBlue} from "./styles";


export default function BodyEditor(props){
    const [isOpenSideBarRight, setIsOpenSideBarRight] = useState(false);
    const initialCurrentSchemaLocal = emptySchema;
    const [currentSchemaLocal, setCurrentSchemaLocal] = useState(initialCurrentSchemaLocal);
    const defaultTableSize = 10;
    const [isOpenGeneratorDialog, setIsOpenGeneratorDialog] = useState(false);
    const [isOpenRawGeneratorDialog, setIsOpenRawGeneratorDialog] = useState(false);
    const [isOpenDialogSaveSchema, setIsOpenDialogSaveSchema] = useState(false);
    const [isOpenBlank, setIsOpenBlank] = useState(false);
    const [universalGeneratorFormMode, setUniversalGeneratorFormMode] = useState("create");
    const [isOpenDialogStartPage, setIsOpenDialogStartPage] = useState(true);
    const [isOpenDialogSchemaSelection, setIsOpenDialogSchemaSelection] = useState(false);
    const [selectedGeneratorType, setSelectedGeneratorType] = useState("switchGenerator");
    const [fieldInFocus, setFieldInFocus] = useState({tableId: "", rowId: ""});
    const [isOpenDialogUniGenForm, setIsOpenDialogUniGenForm] = useState(false);
    const [copyGeneratorObject, setCopyGeneratorObject] = useState({emptyGenerator});
    const [dragTableEnabled, setDragTableEnabled] = useState(false);
    const [dragButtonGroupEnabled, setDragButtonGroupEnabled] = useState(false);
    //  needed in conjunction with addTableHandler2 (hotkey-problem) const [tableCounter, setTableCounter] = useState(1);
    const tooltipVisible = useContext(TooltipContext);

    const nodeRef = React.useRef(null);


    //useHotkeys("ctrl+a", (event)=>{event.preventDefault(); addNewTableHandler2()} );
    useHotkeys("alt+r", (event)=>{event.preventDefault(); resetEditor()} );
    useHotkeys("alt+x", (event)=> {createXmlForPDGF()});
    useHotkeys("alt+s", (event)=>{alert(`
    You can use the following short-keys:
    [alt+s] = Show short-key map
    [alt+r] = Reset Editor
    [alt+a] = Add new table
    [alt+b] = Add current schema to repository
    [alt+x] = Save XML-schemaspecification on disc
    [alt+t] = Save complete app state on disc
    [alt+l] = Load schema from disc`)});
    
    //useHotkeys("ctrl+a", (event)=>{event.preventDefault(); addNewTableHandler()} );
    //useHotkeys("ctrl+b", (event)=>{event.preventDefault(); addNewTableHandler()} );
    //useHotkeys("ctrl+c", (event)=>{event.preventDefault(); addNewTableHandler2()} );
    // => increaseTableCounter(), [tableCounter]);

    




    // files added function for dropzone (drag and drop of external files)
    const filesAddedHandler = (files) => {
        //alert("filesAddesHandlerCalled");
        let file = files[0];
        //alert("file: " + file);
        let textType = /text.*/;
        //alert("match ? : " + file.type.match(textType));

        if (file.type.match(textType)) {
            var reader = new FileReader();
            reader.onload = (e) => {
                let rawText = reader.result;
                let json = JSON.parse(rawText);
                setCurrentSchemaLocal(json);
                setIsOpenDialogStartPage(false);
            }   

            reader.readAsText(file); 

        } else {
           // alert("File not supported!");
        }
        console.log(files);
    }  
            
    

/* needed with addTableHandler2
    // function to keep track of amount of tables generated (each table receives that number as uid) - potentially deprecated
    const increaseTableCounter = () => {
        const schemaNew = cloneDeep(currentSchemaLocal);
        schemaNew.uids.tableCounter = tableCounter;
        setCurrentSchemaLocal(schemaNew);
    }
*/

    // save the current schema with uid to local browser storage (and make it be accessible via schema selection dialog)
    const saveSchemaOnClickHandler = () => {
        addUidToSchema();
        saveSchemaInLocalStorage();
        //setTimeout(()=>{saveSchemaInLocalStorage();}, 4000);
    }


    // probably deprecated -> also delete useState
    /*const upgradeCopyGeneratorObject = (generatorObject) => {
        setCopyGeneratorObject(generatorObject);
    }*/
   

    // set up and open input mask for the selected generator type
    const openInputMaskForSelectedGenerator = (typOfSelectedGenerator) => {
        setSelectedGeneratorType(typOfSelectedGenerator);
        setUniversalGeneratorFormMode("create");
        setIsOpenRawGeneratorDialog(false);
        setIsOpenDialogUniGenForm(true);
    };



    // assigns a preconfigured generator to a field (by copying its specification to its generator attribut) 
    const selectGeneratorHandler = (uid) => {
        //console.log("uid passed: " + uid);
        const schemaNew = cloneDeep(currentSchemaLocal);
        const tableIndex = schemaNew.tables.findIndex(x => x.tableId === fieldInFocus.tableId);
       // console.log("tableIndex:   " + tableIndex);
        const rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x=> x.rowId === fieldInFocus.rowId);
        //console.log("rowIndex:   " + rowIndex);
        const generatorRepo = JSON.parse(localStorage.getItem("generatorRepository"));
        //console.log("generatorRepo: " + generatorRepo);
        const indexGenerator = generatorRepo.findIndex(x=> x.uid === uid);
        //console.log("generatorIndex:   " + indexGenerator);
        schemaNew.tables[tableIndex].tableItems[rowIndex].generator = generatorRepo[indexGenerator];
        setCurrentSchemaLocal(schemaNew);
        //console.log("operation done!");
    };


    //reset the state of DialogUniversalGeneratorForm after finishing generation configuration prozess
    const resetGeneratorStateVariables = () => {
        setFieldInFocus({});
        setUniversalGeneratorFormMode("create");
        setSelectedGeneratorType("BlankPage");
    }



    // fieldInFocus is the variable that keeps track from which table and which field in that table was initiated
    // to be able to copy the configured generator back to the right field
    const setFieldInFocusHandler = (tableId, rowId) => {
        setFieldInFocus({tableId: tableId, rowId: rowId});
    };
    
    // handler to open SchemaSelectionDialog
    const openDialogSchemaSelection = () => {
        setIsOpenDialogSchemaSelection(true);
    };


    //  save current generator to field in focus in current schema
    const addGeneratorToSchema = (generatorObject) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === fieldInFocus.tableId);
        //console.log("addGeneratorToSchema tableIndex: " + tableIndex);
        let rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x => x.rowId === fieldInFocus.rowId);
        schemaNew.tables[tableIndex].tableItems[rowIndex].generator = generatorObject;
        setCurrentSchemaLocal(schemaNew);
    }

    //Table management functions


    // handles the necessary tasks that are needed to add a new table to the schema
    const addNewTableHandler = () => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableCounter = parseInt(schemaNew.uids.tableCounter);
        console.log("tableCounter: " + tableCounter);
        let newTableName = "Table_" + (tableCounter+1);
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
                        generator: {}, 
                        isKey: false},
                ],
                functions: {},
            };
        schemaNew.uids.tableCounter = (tableCounter + 1);
        schemaNew.tables.push(newTableJSON);
        setCurrentSchemaLocal(schemaNew);
    };


/* solution in process for hotkey fire only once problem i
    const addNewTableHandler2 = () => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let t_count = tableCounter;
        console.log("tableCounter: " + t_count);
        let newTableName = "Table " + (t_count+1);
        let newTableJSON = {          
                tableName: newTableName, 
                tableSize: defaultTableSize, 
                tableId: (t_count+1),
                rowCounter: 1,
                tableItems: [
                    {
                        tableId: (tableCounter+1), 
                        rowId: 1, 
                        fieldName: "", 
                        generator: "", 
                        isKey: "false"},
                ],
                functions: {},
            };
        setTableCounter(tableCounter + 1);
        schemaNew.tables.push(newTableJSON);
        setCurrentSchemaLocal(schemaNew);
    };
*/


    //handles the necessary tasks involved with deleting a table from a schema
    const deleteTableHandler = (tableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tables = schemaNew.tables;
        let tablesWithTableRemoved = tables.filter(x => x.tableId !== tableId);
        schemaNew.tables = tablesWithTableRemoved;
        setCurrentSchemaLocal(schemaNew);
    };

    //handles the necessary tasks involved with adding a table field (aka "row" in the displayed table)
    const addTableRowHandler = (tableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        let rowCounter = schemaNew.tables[tableIndex].rowCounter;
        let newRow = {
            tableId: tableId, 
            rowId: rowCounter + 1, 
            fieldName: "", 
            generator: {}, 
            isKey: "false",
        };
        schemaNew.tables[tableIndex].tableItems.push(newRow);
        schemaNew.tables[tableIndex].rowCounter = parseInt(rowCounter) + 1; 
        setCurrentSchemaLocal(schemaNew);

    };

   

    //handles the necessary tasks involved with deleting a field (aka "row" in the dipslay table)
    const deleteTableRowHandler = (tableId, rowId) => { 
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        let rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x => x.rowId === rowId);
        schemaNew.tables[tableIndex].tableItems.splice(rowIndex,1);
        setCurrentSchemaLocal(schemaNew);
    }

    //handler for changes in table name
    const tableNameChangedHandler = (event, tableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        schemaNew.tables[tableIndex].tableName = event.target.value;
        setCurrentSchemaLocal(schemaNew); 
    };


    // handler for changes in table size (e.g. number of rows to be generated in data generation step)
    const tableSizeChangedHandler = (event, tableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        schemaNew.tables[tableIndex].tableSize = event.target.value;
        setCurrentSchemaLocal(schemaNew); 
    };

    // handler for changes in a tables field name
    const fieldNameChangedHandler = (event, tableId, rowId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableIndex = schemaNew.tables.findIndex( x => x.tableId === tableId);
        let rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x => x.rowId === rowId);
        schemaNew.tables[tableIndex].tableItems[rowIndex].fieldName = event.target.value;
        setCurrentSchemaLocal(schemaNew); 
    };




    // System variables management functions


    // handler for changes in value of default system variable
    const defaultSystemVariableValueChangedHandler = (event, variableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let variableIndex = schemaNew.variables.defaultVariables.findIndex( x => x.variableId === variableId);
        schemaNew.variables.defaultVariables[variableIndex].value = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }

    // handler for change in name of custom system variable
    const customSystemVariableNameChangedHandler = (event, variableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let variableIndex = schemaNew.variables.customVariables.variableItems.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables.variableItems[variableIndex].name = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }

    // handler for change in value of custom system variable
    const customSystemVariableValueChangedHandler = (event, variableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let variableIndex = schemaNew.variables.customVariables.variableItems.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables.variableItems[variableIndex].value = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }

    // handler for change in datatype of custom system variable
    const customSystemVariableDataTypeChangedHandler = (event, variableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let variableIndex = schemaNew.variables.customVariables.variableItems.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables.variableItems[variableIndex].dataType = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }

    // handler that takes care of necessary tasks involved with adding a custom variable
    const addCustomVariableHandler = () => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        const variableCounter = schemaNew.variables.customVariables.variableCounter
        const variableCounterNew = variableCounter +1;
        const extraInputElement =  {
            name: "", 
            value: "", 
            dataType: "",
            variableId: variableCounterNew };
        schemaNew.variables.customVariables.variableItems.push(extraInputElement);
        schemaNew.variables.customVariables.variableCounter = variableCounterNew;
        setCurrentSchemaLocal(schemaNew);
    };

    // handler that takes care of necessary tasks involved with deleting a custom system variable
    const deleteCustomSystemVariableHandler = (variableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let customVariablesWithout = schemaNew.variables.customVariables.variableItems.filter(x => x.variableId !== variableId);
        schemaNew.variables.customVariables.variableItems = customVariablesWithout;
        setCurrentSchemaLocal(schemaNew);
    }





    // resets the editor (e.g. removes tables, variables, schemaName) by loading the empty schema
    const resetEditor = () => {
        setCurrentSchemaLocal(emptySchema);
    };


    // saves the generator in local browser storage and makes it available via generator selection dialog and in some meta generator forms.
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

    
    const loadGeneratorFromLocalStorage = () => {
        let generatorReloadedStringified = localStorage.getItem('generatorRepo');
        console.log("generatorStringified: " + generatorReloadedStringified); 
        let generatorReloaded = JSON.parse(generatorReloadedStringified);
        console.log("schema: " + generatorReloaded);
        setCurrentSchemaLocal(generatorReloaded);
    }









    // save the current schema to local browser storage (and make it be accessible via schema selection dialog)
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
  
    // deletes schema from repo (function available in schema selection dialog)
    const deleteSchemaFromRepo = (schemaUid) => {
        console.log("deleteSchemaFromRepoCalled");
        console.log("SchemaUid: " + schemaUid);
        let schemaRepo = JSON.parse(localStorage.getItem("schemaRepository"));
        let schemaIndex = schemaRepo.findIndex(x => x.uids.schemaUid === schemaUid);
        console.log("schemaIndex: " + schemaIndex);
        schemaRepo.splice(schemaIndex, 1);
        localStorage.setItem("schemaRepository", JSON.stringify(schemaRepo));
    };


    //create and download JSON-object file from current schema
    const exportCurrentSchemaAsJSON = () => {
        let allDataObject = currentSchemaLocal;
        let json = JSON.stringify(allDataObject);
        let blob = new Blob ([json], {type: "text/plain;charset=utf-8"});
        saveAs(blob, `SchemaObject_${currentSchemaLocal.info.schemaName}_${Date()}_schemaObject_pdgfgui.txt`);
      };

    //create and download JSON-object file from  schema repository on local storage
    const exportSchemaRepoAsJSON = () => {
        let allDataObject = localStorage.getItem("schemaRepository");
        let blob = new Blob ([allDataObject], {type: "text/plain;charset=utf-8"});
        saveAs(blob, `SchemaRepository_${Date()}_schemaRepoObject_pdgfgui.txt`);
      };


    //create and download JSON-object file from generator repository on local storage
    const exportGeneratorRepoAsJSON = () => {
        let allDataObject = localStorage.getItem("generatorRepository");
        let blob = new Blob ([allDataObject], {type: "text/plain;charset=utf-8"});
        saveAs(blob, `GeneratorRepository_${Date()}_generatorRepoObject_pdgfgui.txt`);
      };


    //create and download JSON-object file from current schema, generator repository and schema repository.
    const exportCompleteAppStateAsJSON = () => {
        const generatorRepo = JSON.parse(localStorage.getItem("generatorRepository"));
        const schemaRepo = JSON.parse(localStorage.getItem("schemaRepository"));
        const currentSchema = currentSchemaLocal;
        const completeState= {generatorRepo: generatorRepo, schemaRepo: schemaRepo, currentSchema: currentSchema};
        let json = JSON.stringify(completeState);
        let blob = new Blob ([json], {type: "text/plain;charset=utf-8"});
        saveAs(blob, `CompleteAppState_${Date()}_completeAppStateObject_pdgfgui.txt`);
      };



    // DialogGenerator Selection Operations
    const handleClickOpenGeneratorSelectionDialog = () => {
        setIsOpenRawGeneratorDialog(false); // maybe unexepected side effect ...
        setIsOpenGeneratorDialog(true);
        
        return null;
    };
    
    // handler for closing generator selection Dialog
    const handleCloseGeneratorSelectionDialog = () => {
        setIsOpenGeneratorDialog(false);
        return null;
    };



    // handler for opening raw-generator selection Dialog
    const handleClickOpenRawGeneratorSelectionDialog = () => {
        setIsOpenGeneratorDialog(false); // maybe unexepected side effect ...
        setIsOpenRawGeneratorDialog(true);
        return null;
    };
    
    // handler for closing raw-generator selection Dialog
    const handleCloseRawGeneratorSelectionDialog = () => {
        setIsOpenRawGeneratorDialog(false);
        return null;
    };


    //  DialogBlank currently not used - potentially deprecated
    const handleCloseBlank = () => {
        setIsOpenBlank(false);
        return null;
    }

    // handler for closing save schema dialog
    const handleCloseDialogSaveSchema = () => {
        setIsOpenDialogSaveSchema(false);
        return null;
    }

    // handler for opening save schema dialog
    const handleClickOpenDialogSaveSchema = () => {
        setIsOpenDialogSaveSchema(true);
        return null;
    }


    // handler for name change in DialogSaveSchema
    const schemaNameChangedHandler = (event) => {
        const schemaNew = cloneDeep(currentSchemaLocal);
        schemaNew.info.schemaName = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    };

    // handler for description change in DialogSaveSchema
    const descriptionChangedHandler = (event) => {
        const schemaNew = cloneDeep(currentSchemaLocal);
        schemaNew.info.description = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    };

    // handler for author change in DialogSaveSchema
    const authorChangedHandler = (event) => {
        const schemaNew = cloneDeep(currentSchemaLocal);
        schemaNew.info.author = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    };

     // handler for author change in DialogSaveSchema
     const lastEditedChangedHandler = (event) => {
        const schemaNew = cloneDeep(currentSchemaLocal);
        schemaNew.info.lastEdited = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    };


    // handler for closing DialogSchemaSelection
    const handleCloseDialogSchemaSelection = () => {
        setIsOpenDialogSchemaSelection(false);
        return null;
    }

    //handler for opening DialogSchemaSelection
    const handleClickOpenDialogSchemaSelection = () => {
        setIsOpenDialogSchemaSelection(true);
        return null;
    }

    // toggle SideBar (container for system variables) on right side
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
        console.log("In addVidToSchema. Uid Added: " + currentSchema.uids.schemaUid);
        return null;
    };


    // when user pushes in Editor view the edit button for a generator, the generator will be loade
    // into the edit mask, so that the user can make changes. this function will be called on the push of the button.
    // included is a check if a generator already has been choosen for that field.
    const loadGeneratorToEditDialog = (tableId, rowId, generatorType) => {
        let tableIndex = currentSchemaLocal.tables.findIndex( x => x.tableId === tableId);
        let rowIndex = currentSchemaLocal.tables[tableIndex].tableItems.findIndex(x => x.rowId === rowId);
        //console.log("GeneratorData: " + JSON.stringify(currentSchemaLocal.tables[tableIndex].tableItems[rowIndex].generator));
        (Object.keys(currentSchemaLocal.tables[tableIndex].tableItems[rowIndex].generator).length !==0)? setUpEditDialog(tableId, rowId, generatorType) : console.log("You have first to select a generator before you can edit it!")
        //console.log("length generator object: " + Object.keys(currentSchemaLocal.tables[tableIndex].tableItems[rowIndex].generator).length)
    };

    // gets called by loadGeneratorToEditDialog and sets up for editing a preexisting generator
    const setUpEditDialog = (tableId, rowId, generatorType) => {
        //console.log("Entered loadGeneratorToEditDialog");
        setFieldInFocus({tableId: tableId, rowId: rowId});
        //console.log("field in focus: tableId: " + tableId + "   / rowId: " + rowId);
        setUniversalGeneratorFormMode("edit");
        //console.log("Mode set to: " + universalGeneratorFormMode);
        setSelectedGeneratorType(generatorType);
        //console.log("generator type set to: " + generatorType);
        setIsOpenDialogUniGenForm(true);
        //console.log("isOpenDialogUniGenForm set to: " + isOpenDialogUniGenForm);
        return null;
    };

    // handler for closing Start Page
    const handleCloseDialogStartPage = () => {
        setIsOpenDialogStartPage(false);
    }

    // load a schema that has been selected in DialogSchemaSelection as current schema.
    const loadSelectedSchema = (schemaUID) => {
        setIsOpenDialogSchemaSelection(false);
        setIsOpenDialogStartPage(false);
        const schemaRepo = JSON.parse(localStorage.schemaRepository);
        const schemaIndex = schemaRepo.findIndex(x=> x.uids.schemaUid === schemaUID);
        setCurrentSchemaLocal(schemaRepo[schemaIndex]);
    };


    // handler for closing DialogUniversalGeneratorForm
    const handleCloseDialogUniGenForm = () => {
        console.log("entered: in handleCloseDialogUniGenForm");
        setIsOpenDialogUniGenForm(false);
    };


    // function for putting the highest z-index to the object just dragged
    const bringToFront = (event) => {
        let elems = document.getElementsByClassName('react-draggable');
        for(let i=0; i< elems.length; i++){
            elems[i].style.zIndex = 1;
            event.currentTarget.style.zIndex = 2;
            }
    }



 //Functions for creating XML-schema specification files for PDGF   
   
 
    // function for creating a PdGF xml-specification for the current Schema
    const createXmlForPDGF = () => {
        console.log("in create Xml for PDGF");
        const xmlVersionTag = String.raw`<?xml version="1.0" encoding="UTF-8"?>`;
        let schemaName = currentSchemaLocal.info.schemaName;
        //let xmlSchemaTagOpen = String.raw`<schema xmlns:doc="http://bankmark.de/pdgf/doc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name=${schemaName} xsi:noNamespaceSchemaLocation="structure/pdgfSchema.xsd">`;
        let xmlSchemaTagOpen = String.raw`<schema name="${schemaName}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="structure/pdgfSchema.xsd">`
        let xmlSchemaTagClose = String.raw`</schema>`;
        const seedValue = currentSchemaLocal.variables.defaultVariables[0].value;
        let seedValueTag = String.raw`<seed>${seedValue}L</seed>`;
        let rngType = "PdgfDefaultRandom"
        let rngTypeTag = String.raw`<rng name="${rngType}"/>`;
        let scaleFactor = currentSchemaLocal.variables.defaultVariables[1].value;
        let scaleFactorTag = String.raw`<property name="SF" type="double">${scaleFactor}</property>`;
        
    //Hier andere eigens definierte Variablen einfügen!!!
    
    
    
        // other default variables => to Do: Write for loop to generate Variables automatically from State
        //let defaultSystemVariable1 = seedValueTag;
        //let defaultSystemVariable1Tag = String.raw`<property name="def" type="double">${defaultSystemVariable1}</property>`;
        //let defaultSystemVariable2 = defaultScaleFactorTag;
        //let defaultSystemVariable2Tag = String.raw`<property name="SF" type="double">${defaultSystemVariable2}</property>`;
        let xmlForTablesAndFields = myTableAggregator(currentSchemaLocal.tables);
        let xmlForCustomSystemVariables = createCustomSystemVariableTags(currentSchemaLocal.variables.customVariables.variableItems);
    
      
      
        
        let stringSchema =      xmlVersionTag + "\r\n" +
                                xmlSchemaTagOpen + "\r\n\r\n" +
                                seedValueTag + "\r\n" +
                                rngTypeTag + "\r\n" +
                                scaleFactorTag + "\r\n" + 
                                xmlForCustomSystemVariables + "\r\n\r\n" +
                                xmlForTablesAndFields + 
                                xmlSchemaTagClose + "\r\n";
      
                        
        writeSchemaToDownloadFile(stringSchema);
      
        };
      
      
    
        // new function processing customVariables
        const createCustomSystemVariableTags = (customSystemVariables) => {
            let result = "";
            customSystemVariables.map((variable) => {
                let output = `<property name= "${variable.name}" type="${variable.dataType}">${variable.value}</property>` + `\r\n`;
                result = result + output;
                return output; // ist die Zeile notwendig?
            })
            return result;
        }
      
        const myTableAggregator = (tables) => {
            console.log("entered myTableAggregator");
            let xmlStringTables = "";
            tables.forEach(table => {
                let tableName = table.tableName;
                let tableTagOpen = `<table name="${tableName}">`;
                let tableTagClose = `</table>`;
                let tableSizeBeforeScaling = table.tableSize;
                let tableSizeTag = `<size>${tableSizeBeforeScaling} * \${SF}</size>`;
        
                let tempString =  tableTagOpen + "\r\n" +
                                  tableSizeTag + "\r\n\r\n" + 
                                  aggregateFieldTags(table) + //hier kommen die Infos zu den Feldern/Reihen
                                  tableTagClose + "\r\n\r\n\r\n";
                
                xmlStringTables = xmlStringTables.concat(tempString);
            });
      
              return xmlStringTables;
        }
       
    
        const aggregateFieldTags = (table) => {
            console.log("entered aggregareFieldTags");
            let aggregatedFieldTag ="";
            table.tableItems.forEach(row => {
            let fieldName = row.fieldName;
            let fieldTagOpen = String.raw`<field name="${fieldName}" size="" type="${row.generator.fieldType}">`;
            let fieldTagClose = String.raw`</field>`;
            let tempString = fieldTagOpen + "\r\n" +
                            createGeneratorXML(row.generator) +
                            fieldTagClose + "\r\n\r\n";
            aggregatedFieldTag = aggregatedFieldTag.concat(tempString);
            });
            return aggregatedFieldTag;
        }
        
        const createGeneratorXML = (generator) => {
    
            let tempString ="";
            console.log("Entering CreateGeneratorXML: " + JSON.stringify(generator));
            switch (generator.generatorType) {
                case 'dateTimeGenerator':
                    tempString = gen_dateTimeGenerator(generator);
                    return tempString;     
                case 'dictListGenerator':
                    tempString = gen_dictListGenerator(generator);
                    return tempString;  
                case 'doubleNumberGenerator':
                    tempString = gen_doubleNumberGenerator(generator);
                    return tempString;
                case 'idGenerator':
                    tempString = gen_idGenerator(generator);
                    return tempString;
                case 'ifGenerator':
                    tempString = gen_ifGenerator(generator);
                    return tempString;
                case 'longNumberGenerator':
                    tempString = gen_longNumberGenerator(generator);
                    return tempString;
                case  'otherFieldValueGenerator': 
                    tempString = gen_otherFieldValueGenerator(generator);
                    return tempString;  
                case  'prePostFixGenerator': 
                    tempString = gen_prePostFixGenerator(generator);
                    return tempString;  
                case  'probabilityGenerator': 
                    tempString = gen_probabilityGenerator(generator);
                    return tempString;
                case  'randomStringGenerator': 
                    tempString = gen_randomStringGenerator(generator);
                    return tempString;
                case  'randomSentenceGenerator': 
                    tempString = gen_randomSentenceGenerator(generator);
                    return tempString;
                case  'referenceValueGenerator': 
                    tempString = gen_referenceValueGenerator(generator);
                    return tempString;
                case  'sequentialGenerator': 
                    tempString = gen_sequentialGenerator(generator);
                    return tempString;
                case  'staticValueGenerator': 
                    tempString = gen_staticValueGenerator(generator);
                    return tempString;
                case  'switchGenerator': 
                    tempString = gen_switchGenerator(generator);
                    return tempString;
                case  'uuidGenerator': 
                    tempString = gen_uuidGenerator(generator);
                    return tempString;
      
                default:  
                return "";  
            }    
        } 
      
      
    
    
    
    
      // output und input-Format aktuell noch nicht veränderbar!!!!!!!!
      const gen_dateTimeGenerator = (generator) => {
          console.log("entered gen_dateTime");
          let startDate = generator.startDate;
          let endDate = generator.endDate;
          let fixedStepSizeOn = generator.fixedStepSize;
          let randomNumberGeneratorOff = generator.disableRng;
          let generatorTag = "<gen_DateTime>" + "\r\n\t" +
                                            `<outputFormat>yyyy-MM-dd</outputFormat>` + "\r\n\t" +                    //to do
                                            `<inputFormat>yyyy-MM-dd</inputFormat>` + "\r\n\t" +                      //to do
                                            `<startDate>${startDate}</startDate>` + "\r\n\t" +
                                            `<endDate>${endDate}</endDate>` + "\r\n\t" +
                                            `<useFixedStepSize>${fixedStepSizeOn}</useFixedStepSize>` + "\r\n\t" + 
                                            `<disableRng>${randomNumberGeneratorOff}</disableRng>` + "\r\n" +
                                          "</gen_DateTime>" + "\r\n";
          return generatorTag;
      }
    
    
      const gen_dictListGenerator = (generator) => {
            console.log("entered gen_dictList");  
            let dictionary = generator.dictionary;
          let size = generator.size;
          let separator = generator.separator;
          let uniqueValues = generator.uniqueEntries;
          let rngOff = generator.disableRng;
          let distributionTag = createDistributionTag(generator);
          let generatorTag = "<gen_DictList>" + "\r\n\t" +
                                  `<size>${size}</size>` + "\r\n\t" +
                                  `<separator>${separator}</separator>` + "\r\n\t" +
                                  `<unique>${uniqueValues}</unique>` + "\r\n\t" + 
                                  `<disableRng>${rngOff}</disableRng>` + "\r\n\t" +
                                  `<file>dicts/${dictionary}.dict</file>` + "\r\n\t" +
                                  `${distributionTag}` + "\r\n" +
                              "</gen_DictList>" + "\r\n";
          return generatorTag;                           
      }
      
    
      const gen_doubleNumberGenerator = (generator) => {
        console.log("entered gen_doubleNumber");
            let minimum = generator.minimum;
          let maximum = generator.maximum;
          let distinctValues = generator.hasAllDistinctValues;
          let numberDecimalPlaces = generator.decimalPlaces;
          let locale = generator.locale;
          let distributionTag = createDistributionTag(generator);
       
          let generatorTag = "<gen_DoubleNumber>" + "\r\n\t" +
                                  `<minD>${minimum}</minD>` + "\r\n\t" +
                                  `<maxD>${maximum}</maxD>` + "\r\n\t" +
                                  `<distinct>${distinctValues}</distinct>` + "\r\n\t" +
                                  `<decimalPlaces>${numberDecimalPlaces}</decimalPlaces>` + "\r\n\t" +
                                  `<locale>${locale}</locale>` + "\r\n\t" +
                                  `${distributionTag}` + "\r\n" +
                              "</gen_DoubleNumber>" + "\r\n";
          return generatorTag;                              
      }
    
    
      const gen_idGenerator = (generator) => {
        console.log("entered gen_id");  
        let minimum = generator.minimum;
          // eslint-disable-next-line
          let generatorTag ="<gen_Id>" + "\r\n\t" +
                                  `<min>${minimum}</min>` + "\r\n" + 
                            "</gen_Id>" + "\r\n";
          return generatorTag;
      }
      
      

      const gen_ifGenerator = (generator) => {
        let subGenerator = generator.generator;
        let subGeneratorTag = createGeneratorXML(subGenerator);
        let ifExpression = generator.if;

        let thenValue = generator.then;
        let thenValueTag = createGeneratorXML(thenValue);
        let elseValue = generator.else;
        let elseValueTag = createGeneratorXML(elseValue);
        // eslint-disable-next-line
        let generatorTag =  "<gen_If>" + "\r\n\t" + 
                                subGeneratorTag + "\r\n\t" + 
                                `<if>![CDATA[${ifExpression}]]</if>` + "\r\n\t" + 
                                    `<then>` + "\r\n\t" + 
                                        thenValueTag + "\r\n\t" +
                                    `</then>` + "\r\n\t" +
                                    `<else>`  + "\r\n\t" +
                                        elseValueTag + "\r\n\t" + 
                                    `</else>` + "\r\n\t" + 
                            "</gen_If>" + "\r\n";
              
        return generatorTag;
    }


      const gen_longNumberGenerator = (generator) => {
            console.log(" entered in LongNumberGen");
            console.log("object: " + JSON.stringify(generator));
            let minimum = generator.minimum;
          let maximum = generator.maximum;
          let distinctValues = generator.numberOfDistinctCharacters;
          let distributionTag = createDistributionTag(generator);
          
          let generatorTag =  "<gen_LongNumberGenerator>" + "\r\n\t" +
                                  `<minD>${minimum}</minD>` + "\r\n\t" +
                                  `<maxD>${maximum}</maxD>` + "\r\n\t" +
                                  `<distinct>${distinctValues}</distinct>` + "\r\n\t" +
                                  `${distributionTag}` +  "\r\n" +
                              "</gen_LongNumberGenerator>"+ "\r\n";
        return generatorTag;                              
      }
      
    
      const gen_otherFieldValueGenerator = (generator) => {
      
          
          let referenceField = generator.referenceField;
      
          let generatorTag = `<gen_otherFieldValue>` + "\r\n\t" +
                                  `<reference field="${referenceField}"/>` + "\r\n" +
                            "</gen_otherFieldValue>" + "\r\n";
          return generatorTag;
      }
    
    
      const gen_prePostFixGenerator = (generator) => {
          let preFix = generator.preFix;
          let postFix = generator.postFix;
          let subGeneratorTag = createGeneratorXML(generator.subGeneratorObject);
          // eslint-disable-next-line
          let generatorTag ="<gen_PrePostfix>" + "\r\n\t" +
                                `<prefix>${preFix}</prefix>` + "\r\n\t" +
                                    `${subGeneratorTag}` +
                                `<postfix>${postFix}</postfix>` + "\r\n" +
                            "</gen_PrePostfix>" + "\r\n";
          return generatorTag;
    }
    

    const gen_probabilityGenerator = (generator) => {
        let disableShuffling = generator.disableShuffling;
        let valueProbabilityRows = generator.valueProbabilitySets;
        let generator_outer_open = `<gen_Probability>` + "\r\n" + "\r\n\t" ;
        let generator_outer_close = `</gen_Probability>` + "\r\n";
        let rngSwitch = generator.disableShuffling? (`<disableRng>true</disableRng>` + "\r\n" + "\r\n\t"): "" ;
        let reducer = (acc, curr, index) => { return (acc.concat(`<probability value="${curr.probability}">` + "\r\n\t" + `<gen_Static_Value>`+ "\r\n\t\t" + `<value>${curr.value}</value>`+ "\r\n\t" + `</gen_Static_Value>` + "\r\n\t" + `</probability>`+ ((generator.valueProbabilitySets.length === index+1)? ("\r\n\r\n"): ("\r\n\r\n\t")) ))};
        let subElementTags = generator.valueProbabilitySets.reduce(reducer, "");    
        
    
        let generatorTag = generator_outer_open + rngSwitch + subElementTags + generator_outer_close;
        return generatorTag;
    
    }
    

{/*}
   // NOCH IN KONZEPTION ...
    const gen_probabilityGenerator = (generator) => {
        let disableShuffling = generator.spec.disableShuffling;
        let valueProbabilityRows = generator.spec.valueProbabilityRows;
        let generator_outer_open = `<gen_Probability>` + "\r\n" + "\r\n\t" ;
        let generator_outer_close = `</gen_Probability>` + "\r\n";
        let rngSwitch = `<disableRng>${disableShuffling}</disableRng>` + "\r\n" + "\r\n\t" ;
    
        let innerStuff = "";
        let i, tempString;
    
        
        //abarbeiten alle ValueOptionen bis auf die letzte
        for (i = 0; i < valueProbabilityRows.length-1; i++) {
            tempString =  `<probability value= "${valueProbabilityRows[i].probability}">` + "\r\n\t" +
                              `<gen_StaticValue>` + "\r\n\t\t" +
                              `<value>${valueProbabilityRows[i].value}</value>` + "\r\n\t" +
                              `</gen_StaticValue>` + "\r\n\t" +
                              `</probability>` + "\r\n\r\n" + "\r\n\t";
        innerStuff =   innerStuff.concat(tempString);
        }
    
    
      // abarbeiten letze ValueOption
      tempString =  `<probability value= "${valueProbabilityRows[valueProbabilityRows.length-1].probability}">` + "\r\n\t" +
                              `<gen_StaticValue>` + "\r\n\t\t" +
                              `<value>${valueProbabilityRows[valueProbabilityRows.length-1].value}</value>` + "\r\n\t" +
                              `</gen_StaticValue>` + "\r\n\t" +
                              `</probability>` + "\r\n\r\n";
        innerStuff =   innerStuff.concat(tempString);
      
    
        let generatorTag = generator_outer_open + rngSwitch + innerStuff + generator_outer_close;
        return generatorTag;
    }
    
    
*/}



    const gen_randomSentenceGenerator = (generator) => {
      
        let min = generator.minimum;
        let max = generator.maximum;
        let distinctCharacters = generator.numberOfDistinctCharacters;
        let distributionTag = createDistributionTag(generator);
    
        let generatorTag =  "<gen_RandomSentence>" + "\r\n\t" +
                                `<min>${min}</min>` + "\r\n\t" +
                                `<max>${max}</max>` + "\r\n\t" +
                                `<distinct>${distinctCharacters}</distinct>` + "\r\n\t" +
                                `${distributionTag}` + "\r\n" +
                            "</gen_RandomSentence>" + "\r\n";
        return generatorTag;
    }
    
    
      const gen_randomStringGenerator = (generator) => {
      
        let min = generator.minimum;
        let max = generator.maximum;
        let characters = generator.characterSet;
      
      
        let generatorTag = "<gen_RandomString>" + "\r\n\t" +
                                `<min>${min}</min>` + "\r\n\t" +
                                `<max>${max}</max>` + "\r\n\t" +
                                `<characters>${characters}</characters>` + "\r\n" +
                            "</gen_RandomString>" + "\r\n";
        return generatorTag;
      }
      
    
    //todo: currently only easy case
    const gen_referenceValueGenerator = (generator) => {
      
        let referenceTableId = generator.referenceTableId;
        console.log("referenceTableId: " + referenceTableId);
        console.log("tables: " + JSON.stringify(currentSchemaLocal.tables));
        let referenceTableName = currentSchemaLocal.tables.filter(x => x.tableId===Number(referenceTableId))[0].tableName;
        let referenceField = generator.referenceField;
        let chooseSelection = generator.chooseBy;
        let fromSelection = generator.selectFrom;
      
        let generatorTag = `<gen_ReferenceValue choose="${chooseSelection}" from="${fromSelection}">` + "\r\n\t" +
                                `<reference field="${referenceField}" table="${referenceTableName}"/>` + "\r\n" +
                            "</gen_ReferenceValue>" + "\r\n";
        return generatorTag;
      }
      
    // needs improvement!!!
    const gen_sequentialGenerator = (generator) => {
        let delimiter = generator.delimiter;
        let concatenateResults = generator.concatenateResults;
        let delimitEmptyValues = generator.delimitEmptyValues;
        let reducer = (acc, curr) => acc.concat(createGeneratorXML(curr));
        let subGeneratorTag = generator.generatorList.reduce(reducer, "");
        //    let a = createSubGeneratorTag(generator)});
        // eslint-disable-next-line
        let generatorTag =`<gen_Sequential concatenateResults="${concatenateResults}" delimiter="${delimiter}" delimitEmptyValues="${delimitEmptyValues}">` + "\r\n" +
                                subGeneratorTag  + "\r\n" + 
                          "</gen_Sequential>" + "\r\n";
        return generatorTag;
    }
    

      
    const gen_staticValueGenerator = (generator) => {
        console.log("entered gen_staticValueGenerator: " + JSON.stringify(generator));  
        let staticValue = generator.staticValue;
          // eslint-disable-next-line
          let generatorTag ="<gen_StaticValue>" + "\r\n\t" +
                                  `<value>${staticValue}</value>` + "\r\n" + 
                            "</gen_StaticValue>" + "\r\n";
          return generatorTag;
      }  
      
    
    const gen_switchGenerator = (generator) => {
        let subGenerator = generator.subGeneratorObject;
        let subGeneratorTag = createGeneratorXML(subGenerator);
        let defaultGenerator = generator.default;
        let defaultGeneratorTag = createGeneratorXML(defaultGenerator);
        let caseOutcomeSets = generator.caseOutcomeSets;
        console.log("Ausdruck caseOutcomeSets:" + JSON.stringify(caseOutcomeSets));
        let reducer = (acc, curr) => { return (acc.concat(`<case value="${curr.caseValue}">` + "\r\n\t" + `${createGeneratorXML(curr)} </case>` + "\r\n"))};
        //let reducer = (acc, curr) => { return (acc.concat(`<case value="${curr.caseValue}"> ${createGeneratorXML(curr)} </case>`))};
        // leere elemente ab 2. let reducer = (acc, curr) => acc.concat(`<case value="${curr.caseValue}"> ${createGeneratorXML(curr)} </case>`);
        //let reducer = (acc, curr) => acc.concat(createGeneratorXML(curr));
        let caseOutcomeSetsTag = caseOutcomeSets.reduce(reducer, "");
            
        // eslint-disable-next-line
        let generatorTag ="<gen_Switch>" + "\r\n" +
                                subGeneratorTag + "\r\n" +
                                `<default>` + "\r\n\t" +
                                    defaultGeneratorTag + "\r\n" +
                                `</default>`  + "\r\n" + 
                                caseOutcomeSetsTag + "\r\n" + 
                            "</gen_Switch>" + "\r\n";
        return generatorTag;
    }  
      
      
    const gen_uuidGenerator = (generator) => {
        
        let generatorTag ="<gen_UUID>" + "\r\n\t" +
                          "</gen_UUID>" + "\r\n";
        return generatorTag; 
    }  
      
      
    //const gen_NullGenerator = ()





      
      // refactor with exportCurrentSchemaAsJSON 
      const writeSchemaToDownloadFile = (schema) => {
        //let formattedSchema = format(schema);
        let blob = new Blob ([schema], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "schema_pdgf.txt");
      }  
      
    
      const createDistributionTag = (generator) => {
        switch(generator.distributionVariables.type){
            case "uniformDistribution":
                return "";
            case "normalDistribution":
                return `<distribution mean="${generator.distributionVariables.normalDistribution.mean}" name="Normal" sd="${generator.distributionVariables.normalDistribution.standardDeviation}"/>` ;
            case "exponentialDistribution":
                return `<distribution name="Exponential" lambda="${generator.distributionVariables.exponentialDistribution.lambda}"/>` ;
            case "logarithmicDistribution":
                return `<distribution name="Logarithmic" p="${generator.distributionVariables.logarithmicDistribution.p}"/>` ;
            case "binomialDistribution":
                return `<distribution name="Binomial" n="${generator.distributionVariables.binomialDistribution.n}" p="${generator.distributionVariables.binomialDistribution.p}"/>` ;
        }
      }
    
    
      const createCaseGeneratorXML = (caseOutcomeSets) => {
            let generatorTag = "";  
            caseOutcomeSets.map(caseOutcomeSet =>{ 
                let caseValue = caseOutcomeSet.caseValue;
                let caseTagOpen = `<case value="${caseValue}">`;
                let caseTagClose = `</case>`
                let outcomeGenerator = caseOutcomeSet.outcomeGenerator;
                let outcomeGeneratorTag = createGeneratorXML(outcomeGenerator);
    
                const subGeneratorTag = caseTagOpen + "\r\n\t" + outcomeGeneratorTag + "\r\n\t" + caseTagClose +  "\r\n\t";
                generatorTag.concat(subGeneratorTag);                           
            });
            return generatorTag;
      }
    
 



    return(

        <>
        <div>
            
            <Grid 
                container 
                className="outerContainer" 
                display="flex" 
                direction="row" 
                justify="flex-start" 
                alignContent="flex-start" 
                spacing = {0} 
                style={{
                    background: "white", 
                    height: "calc(100vh-96px", 
                    paddingTop: "30px"}}>

               {/*first row*/}
               <Grid container className="firstRowContainer" item xs={12} justify="space-between" style={{height: "120px"}} >
                    <Grid item style={{backgroundColor: "white", paddingBottom: "20px", paddingLeft:"40px"}}>
                    
                        <SchemaNameElement schemaName={currentSchemaLocal.info.schemaName} schemaNameChangedHandler = {schemaNameChangedHandler}/>
                       
                    </Grid>
                    <Grid item style={{background: "white", paddingRight: "20px"}}>
                        <DraggableCore onStart={bringToFront} style={{position: "relative"}}>
                            <div ref={nodeRef}>
                                <EditorButtonGroup 
                                    addNewTableHandler = {addNewTableHandler}
                                    resetEditor ={resetEditor}
                                    toggleSidebarRight = {toggleSidebarRight}
                                    handleClickOpenDialogSaveSchema={handleClickOpenDialogSaveSchema}
                                    openDialogSchemaSelection={openDialogSchemaSelection}
                                    setIsOpenRawGeneratorDialog={setIsOpenRawGeneratorDialog}
                                    isOpenRawGeneratorDialog={isOpenRawGeneratorDialog}
                                    exportCurrentSchemaAsJSON={exportCurrentSchemaAsJSON}
                                    exportGeneratorRepoAsJSON={exportGeneratorRepoAsJSON}
                                    exportSchemaRepoAsJSON={exportSchemaRepoAsJSON}
                                    exportCompleteAppStateAsJSON={exportCompleteAppStateAsJSON}
                                    createXmlForPDGF={createXmlForPDGF}/>
                            </div>
                        </DraggableCore>
                    </Grid>
                </Grid>

                 {/*second row*/}
                 <Grid container className="secondRowContainer" item xs={12} style={{height: "40px", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignContent: "center", alignItems: "center", paddingRight: "45px"}} >
                     <Grid container style={{flexDirection: "row", display: "flex", justifyContent: "flex-end", alignContent: "center", alignItems: "center", width: "180px"}} item>
                        <Grid item>
                            <CustomTooltip placement="left" arrow="true" title={tooltipVisible? "Most of the key-words throughout the App have tooltips attached that will show when you hover over them. In these tooltips we explain terms and concepts, tell you what you can and should do and sometimes show you examples of usage. You can use these tooltips when you are new to the program or when you need to look after some information. When you don`t need them anymore, just click the checkbox and make them disappear.": ""}>
                                <Typography>SHOW TOOLTIPS: </Typography>
                            </CustomTooltip>
                        </Grid>
                        <Grid item>
                            <Checkbox 
                                    checked={tooltipVisible}
                                    style={{marginRight: "10px", color: "rgb(56,95,224"}}
                                    onChange={(event)=> {props.tooltipVisibleHandler(event.target.checked)}}
                                    
                                    />
                        </Grid>
                     </Grid>

                     <Grid item >
                        {isOpenSideBarRight? 
                        <div> 
                            <Button
                                variant="outlined"
                                color="inherit"
                                endIcon={<ExpandLessIcon/>}
                                onClick={() => {setIsOpenSideBarRight(false)}}>
                                    Hide Variables
                            </Button>
                            
                        </div> :

                        <div>
                            <Button
                                variant="outlined"
                                color="inherit"
                                endIcon={<ExpandMoreIcon/>}
                                onClick={() => {setIsOpenSideBarRight(true)}}>
                                Show Variables
                            </Button>
                        </div> }
                     </Grid>

                 </Grid>

                {/*third row*/}

                <Grid 
                    container 
                    className="thirdRowContainer" 
                    display="flex" 
                    flexDirection="row" 
                    justify="space-between" 
                    style={{
                        height: "calc(100vh - 256px)", 
                        flexWrap: "nowrap",
                        overflow: "hide",
                          }}>  
                 
                        {(isOpenSideBarRight? (

                             <Grid 
                                container 
                                item
                                className="tableContainer" 
                                display="flex" 
                                flexDirection="row" 
                                justify="center" 
                                alignContent="flex-start"
                                style={{ 
                                    height: "100%", 
                                    //width: "100%", 
                                   // backgroundColor: "yellow", 
                                    padding: "20px", 
                                    borderColor: "white", 
                                    borderStyle: "dashed", 
                                    borderWidth: "1px", 
                                    flexWrap: "wrap", 
                                    flexGrow: "1",
                                    overflow: "scroll",
                                    overflowX: "hidden", }}>
                            
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
                                                handleClickOpenGeneratorSelectionDialog = {handleClickOpenGeneratorSelectionDialog}
                                                handleCloseGeneratorSelectionDialog = {handleCloseGeneratorSelectionDialog}
                                                handleClickOpenRawGeneratorSelectionDialog ={handleClickOpenRawGeneratorSelectionDialog}
                                                handleCloseRawGeneratorSelectionDialog = {handleCloseRawGeneratorSelectionDialog}
                                                isOpenGeneratorDialog = {isOpenGeneratorDialog}
                                                setFieldInFocusHandler={setFieldInFocusHandler}
                                                loadGeneratorToEditDialog = {loadGeneratorToEditDialog}
                                            />
                                       
                                    )})
                                }
                            </Grid>):
                    
                            (<Grid 
                                container 
                                item
                                className="tableContainer" 
                                display="flex" 
                                flexDirection="row" 
                                justify="center" 
                                alignContent="flex-start"
                                style={{ 
                                    height: "100%", 
                                    //width: "100%", 
                                    // backgroundColor: "yellow", 
                                    padding: "20px", 
                                    borderColor: "white", 
                                    borderStyle: "dashed", 
                                    borderWidth: "1px", 
                                    flexWrap: "wrap", 
                                    flexGrow: "1",
                                    overflow: "scroll",
                                    overflowX: "hidden", }}>
                                
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
                                                        handleClickOpenGeneratorSelectionDialog = {handleClickOpenGeneratorSelectionDialog}
                                                        handleCloseGeneratorSelectionDialog = {handleCloseGeneratorSelectionDialog}
                                                        handleClickOpenRawGeneratorSelectionDialog ={handleClickOpenRawGeneratorSelectionDialog}
                                                        handleCloseRawGeneratorSelectionDialog = {handleCloseRawGeneratorSelectionDialog}
                                                        isOpenGeneratorDialog = {isOpenGeneratorDialog}
                                                        setFieldInFocusHandler={setFieldInFocusHandler}
                                                        loadGeneratorToEditDialog = {loadGeneratorToEditDialog}
                                                    />
                                                
                                            )})
                                        }    
        
                            </Grid>     
                        
                        ))}


                    {(isOpenSideBarRight? (

                        <VariablesSidebar
                            defaultSystemVariableValueChangedHandler ={defaultSystemVariableValueChangedHandler}
                            variables={currentSchemaLocal.variables} 
                            currentSchemaLocal={currentSchemaLocal}
                            addCustomVariableHandler = {addCustomVariableHandler}
                            deleteCustomSystemVariableHandler = {deleteCustomSystemVariableHandler}
                            customSystemVariableNameChangedHandler = {customSystemVariableNameChangedHandler}
                            customSystemVariableValueChangedHandler = {customSystemVariableValueChangedHandler}
                            customSystemVariableDataTypeChangedHandler = {customSystemVariableDataTypeChangedHandler}/>

                       
                    ) : null)}
                </Grid>   
                          
               
            </Grid>      
                            
            <DialogGeneratorSelection  
                isOpenGeneratorDialog={isOpenGeneratorDialog} 
                handleCloseGeneratorSelectionDialog={handleCloseGeneratorSelectionDialog} 
                handleClickOpenRawGeneratorSelectionDialog={handleClickOpenRawGeneratorSelectionDialog}
                selectGeneratorHandler={selectGeneratorHandler} 
            />                   
            <DialogRawGeneratorSelection  
                isOpenRawGeneratorDialog={isOpenRawGeneratorDialog} 
                data = {rawGeneratorDescriptions}
                handleCloseRawGeneratorSelectionDialog={handleCloseRawGeneratorSelectionDialog} 
                handleClickOpenGeneratorSelectionDialog={handleClickOpenGeneratorSelectionDialog} 
                openInputMaskForSelectedGenerator={openInputMaskForSelectedGenerator}
            />

            <DialogSchemaSelection   
                handleCloseDialogSchemaSelection={handleCloseDialogSchemaSelection}
                isOpenDialogSchemaSelection={ isOpenDialogSchemaSelection}
                loadSelectedSchema={loadSelectedSchema}
                deleteSchemaFromRepo={deleteSchemaFromRepo}
                setCurrentSchemaLocal={setCurrentSchemaLocal}
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
                setCurrentSchemaLocal={setCurrentSchemaLocal}
                setIsOpenDialogStartPage={setIsOpenDialogStartPage}
                filesAddedHandler={filesAddedHandler}
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
                //upgradeCopyGeneratorObject={upgradeCopyGeneratorObject}
                resetGeneratorStateVariables={resetGeneratorStateVariables}

            />        

                        

        </div>
        </>
    )

}

