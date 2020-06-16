import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import EditorButtonGroup from "./EditorButtonGroup";
import DefaultVariablesComponent from "./deprecated/DefaultVariablesComponentb"
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
import "./CustomScrollbar.css";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button";
import DraggableCore from "react-draggable";
import Hotkeys from "react-hot-keys";
import {useHotkeys} from "react-hotkeys-hook";
import VariablesSidebar from "./VariablesSidebar";
import {saveAs} from 'file-saver';






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
    const [dragTableEnabled, setDragTableEnabled] = useState(true);
    const [dragButtonGroupEnabled, setDragButtonGroupEnabled] = useState(true);
    const [tableCounter, setTableCounter] = useState(1);


    const nodeRef = React.useRef(null);


    useHotkeys("alt+a", (event)=>{addNewTableHandler2()} );
    useHotkeys("ctrl+k", (event)=>{event.preventDefault(); resetEditor()} );
    useHotkeys("ctrl+c", (event)=>{event.preventDefault(); addNewTableHandler2()} );
    useEffect(() => increaseTableCounter(), [tableCounter]);


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
            
        
    
    const increaseTableCounter = () => {
        const schemaNew = cloneDeep(currentSchemaLocal);
        schemaNew.uids.tableCounter = tableCounter;
        setCurrentSchemaLocal(schemaNew);
    }

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
        console.log("uid passed: " + uid);
        const schemaNew = cloneDeep(currentSchemaLocal);
        const tableIndex = schemaNew.tables.findIndex(x => x.tableId === fieldInFocus.tableId);
        console.log("tableIndex:   " + tableIndex);
        const rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x=> x.rowId === fieldInFocus.rowId);
        console.log("rowIndex:   " + rowIndex);
        const generatorRepo = JSON.parse(localStorage.getItem("generatorRepository"));
        console.log("generatorRepo: " + generatorRepo);
        const indexGenerator = generatorRepo.findIndex(x=> x.uid === uid);
        console.log("generatorIndex:   " + indexGenerator);
        schemaNew.tables[tableIndex].tableItems[rowIndex].generator = generatorRepo[indexGenerator];
        setCurrentSchemaLocal(schemaNew);
        console.log("operation done!");
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
        console.log("addGeneratorToSchema tableIndex: " + tableIndex);
        let rowIndex = schemaNew.tables[tableIndex].tableItems.findIndex(x => x.rowId === fieldInFocus.rowId);
        schemaNew.tables[tableIndex].tableItems[rowIndex].generator = generatorObject;
        setCurrentSchemaLocal(schemaNew);
    }


    const addNewTableHandler = () => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tableCounter = parseInt(schemaNew.uids.tableCounter);
        console.log("tableCounter: " + tableCounter);
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



    const addNewTableHandler2 = () => {
        console.log("yoyo in da house!! - addNewTableHandler2");
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
                        fieldName: "Enter Table Name", 
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
        let schemaNew = cloneDeep(currentSchemaLocal);
        let tables = schemaNew.tables;
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
            generator: {}, 
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


    const customSystemVariableDataTypeChangedHandler = (event, variableId) => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        let variableIndex = schemaNew.variables.customVariables.variableItems.findIndex( x => x.variableId === variableId);
        schemaNew.variables.customVariables.variableItems[variableIndex].dataType = event.target.value;
        setCurrentSchemaLocal(schemaNew);
    }


    const addCustomVariableHandler = () => {
        let schemaNew = cloneDeep(currentSchemaLocal);
        const variableCounter = schemaNew.variables.customVariables.variableCounter
        const variableCounterNew = variableCounter +1;
        const extraInputElement =  {
            name: "Enter Name", 
            value: "Enter Value", 
            dataType: "Enter Type",
            variableId: variableCounterNew };
        schemaNew.variables.customVariables.variableItems.push(extraInputElement);
        schemaNew.variables.customVariables.variableCounter = variableCounterNew;
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
        console.log("deleteSchemaFromRepoCalled");
        console.log("SchemaUid: " + schemaUid);
        let schemaRepo = JSON.parse(localStorage.getItem("schemaRepository"));
        let schemaIndex = schemaRepo.findIndex(x => x.uids.schemaUid === schemaUid);
        console.log("schemaIndex: " + schemaIndex);
        schemaRepo.splice(schemaIndex, 1);
        localStorage.setItem("schemaRepository", JSON.stringify(schemaRepo));
    };



    //create and download file with schema JSON-object
    const exportSchemaAsJSON = () => {
        let allDataObject = currentSchemaLocal;
        let json = JSON.stringify(allDataObject);
        let blob = new Blob ([json], {type: "text/plain;charset=utf-8"});
        saveAs(blob, `${currentSchemaLocal.info.schemaName}_${Date()}_schemaObject_pdgf.txt`);
      }


    // DialogGenerator Selection Operations
    
    const handleClickOpenGeneratorSelectionDialog = () => {
        setIsOpenRawGeneratorDialog(false); // maybe unexepected side effect ...
        setIsOpenGeneratorDialog(true);
        
        return null;
    };
    
    const handleCloseGeneratorSelectionDialog = () => {
        setIsOpenGeneratorDialog(false);
        return null;
    };



    // RawDialogGenerator Selection Operations
    
    const handleClickOpenRawGeneratorSelectionDialog = () => {
        setIsOpenGeneratorDialog(false); // maybe unexepected side effect ...
        setIsOpenRawGeneratorDialog(true);
        return null;
    };
    
    const handleCloseRawGeneratorSelectionDialog = () => {
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
        console.log("In addVidToSchema. Uid Added: " + currentSchema.uids.schemaUid);
        return null;
    };



    // loadGeneratorToEditDialog
   
    const loadGeneratorToEditDialog = (tableId, rowId, generatorType) => {
        let tableIndex = currentSchemaLocal.tables.findIndex( x => x.tableId === tableId);
        let rowIndex = currentSchemaLocal.tables[tableIndex].tableItems.findIndex(x => x.rowId === rowId);
        console.log("GeneratorData: " + JSON.stringify(currentSchemaLocal.tables[tableIndex].tableItems[rowIndex].generator));
        (Object.keys(currentSchemaLocal.tables[tableIndex].tableItems[rowIndex].generator).length !==0)? setUpEditDialog(tableId, rowId, generatorType) : console.log("You have first to select a generator before you can edit it!")
        console.log("length generator object: " + Object.keys(currentSchemaLocal.tables[tableIndex].tableItems[rowIndex].generator).length)};

    const setUpEditDialog = (tableId, rowId, generatorType) => {
        console.log("Entered loadGeneratorToEditDialog");
        setFieldInFocus({tableId: tableId, rowId: rowId});
        console.log("field in focus: tableId: " + tableId + "   / rowId: " + rowId);
        setUniversalGeneratorFormMode("edit");
        console.log("Mode set to: " + universalGeneratorFormMode);
        setSelectedGeneratorType(generatorType);
        console.log("generator type set to: " + generatorType);
        setIsOpenDialogUniGenForm(true);
        console.log("isOpenDialogUniGenForm set to: " + isOpenDialogUniGenForm);
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
        console.log("entered: in handleCloseDialogUniGenForm");
        setIsOpenDialogUniGenForm(false);
    };



    const bringToFront = (event) => {
        let elems = document.getElementsByClassName('react-draggable');
        for(let i=0; i< elems.length; i++){
            elems[i].style.zIndex = 1;
            event.currentTarget.style.zIndex = 2;
            }
    }





    // Create PDGF-XML code

    const createXmlForPDGF = () => {
        console.log("in create Xml for PDGF");
        const xmlVersionTag = String.raw`<?xml version="1.0" encoding="UTF-8" standalone="no"?>`;
        let schemaName = currentSchemaLocal.info.schemaName;
        let xmlSchemaTagOpen = String.raw`<schema xmlns:doc="http://bankmark.de/pdgf/doc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name=${schemaName} xsi:noNamespaceSchemaLocation="structure/pdgfSchema.xsd">`;
        let xmlSchemaTagClose = String.raw`</schema>`;
        const seedValue = currentSchemaLocal.variables.defaultVariables[0].value;
        let seedValueTag = String.raw`<seed>${seedValue}</seed>`;
        let rngType = `PdgfDefaultRandom`
        let rngTypeTag = String.raw`<rng name=${rngType}/>`;
        let scaleFactor = currentSchemaLocal.variables.defaultVariables[1].value;
        let scaleFactorTag = String.raw`<property name="SF" type="double">${scaleFactor}</property>`;
        
    //Hier andere eigens definierte Variablen einfügen!!!
    
    
    
        // other default variables => to Do: Write for loop to generate Variables automatically from State
        //let defaultSystemVariable1 = seedValueTag;
        //let defaultSystemVariable1Tag = String.raw`<property name="def" type="double">${defaultSystemVariable1}</property>`;
        //let defaultSystemVariable2 = defaultScaleFactorTag;
        //let defaultSystemVariable2Tag = String.raw`<property name="SF" type="double">${defaultSystemVariable2}</property>`;
        let stringFields = myTableAggregator(currentSchemaLocal.tables);
        let customSystemVariables = createCustomSystemVariableTags(currentSchemaLocal.variables.customVariables.variableItems);
    
      
      
        
        let stringSchema =      xmlVersionTag + "\r\n" +
                                xmlSchemaTagOpen + "\r\n\r\n" +
                                seedValueTag + "\r\n" +
                                rngTypeTag + "\r\n" +
                                scaleFactorTag + "\r\n" + 
                                customSystemVariables + "\r\n\r\n" +
                                stringFields + 
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
                let tableTagOpen = `<table name=${tableName}>`;
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
            let fieldTagOpen = String.raw`<field name=${fieldName} size="" type="${row.generator.fieldType}">`;
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
                case 'doubleGenerator':
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
      
          //let referenceTable = generator.spec.referenceTable;
          let referenceField = generator.referenceField;
          //let chooseSelection = generator.spec.chooseSelection;
          //let fromSelection = generator.spec.fromSelection;
        
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
                                    `${subGeneratorTag}` + "\r\n\t" +
                                `<postfix>${postFix}</postfix>` + "\r\n" +
                            "</gen_PrePostfix>" + "\r\n";
          return generatorTag;
    }
    
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
      
        let referenceTable = generator.referenceTable;
        let referenceField = generator.referenceField;
        let chooseSelection = generator.chooseBy;
        let fromSelection = generator.selectFrom;
      
        let generatorTag = `<gen_ReferenceValue choose="${chooseSelection}" from="${fromSelection}">` + "\r\n\t" +
                                `<reference field="${referenceField}" table="${referenceTable}"/>` + "\r\n" +
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
        let generatorTag =`<gen_Sequential concatenateResults="${concatenateResults} delimiter="${delimiter}" delimitEmptyValues="${delimitEmptyValues}">` + "\r\n" +
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
      
      
      
      // refactor with exportSchemaAsJSON 
      const writeSchemaToDownloadFile = (schema) => {
        let blob = new Blob ([schema], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "schema_pdgf.txt");
      }  
      
    
      const createDistributionTag = (generator) => {
        switch(generator.distributionVariables.type){
            case "uniformDistribution":
                return `<distribution name="Uniform"/>` 
            case "normalDistribution":
                return `<distribution mean="${generator.distributionVariables.normalDistribution.mean} name="Normal" sd="${generator.distributionVariables.normalDistribution.standardDeviation}"/>` 
            case "exponentialDistribution":
                return `<distribution name="Exponential" lambda="${generator.distributionVariables.exponentialDistribution.lambda}"/>` 
            case "logarithmicDistribution":
                return `<distribution name="Logarithmic" p="${generator.distributionVariables.logarithmicDistribution.p}"/>` 
            case "binomialDistribution":
                return `<distribution name="Binomial" n="${generator.distributionVariables.binomialDistribution.n}" p="${generator.distributionVariables.binomialDistribution.p}"/>` 
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
            
            <Grid container className="outerContainer" display="flex" direction="row" justify="flex-start" alignContent="flex-start" spacing = {0} style={{background: "white", height: "90vh", marginTop: "30px"}}>
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
                                    exportSchemaAsJSON={exportSchemaAsJSON}
                                    createXmlForPDGF={createXmlForPDGF}/>
                            </div>
                        </DraggableCore>
                    </Grid>
                </Grid>

                 {/*second row*/}
                 <Grid container className="secondRowContainer" item xs={12} style={{height: "40px", display: "flex", flexDirection: "row", justifyContent: "flex-end", paddingRight: "45px"}} >
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

                {/*third row*/}

                <Grid 
                    container 
                    className="thirdRowContainer" 
                    display="flex" 
                    flexDirection="row" 
                    justify="space-between" 
                    style={{
                        height: "80vh", 
                        flexWrap: "nowrap"}}>  
                 
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
                                    backgroundColor: "yellow", 
                                    padding: "20px", 
                                    borderColor: "white", 
                                    borderStyle: "dashed", 
                                    borderWidth: "1px", 
                                    flexWrap: "wrap", 
                                    flexGrow: "1",
                                    overflow: "scroll", }}>
                            
                                {currentSchemaLocal.tables.map(table => {return( 
                                    <DraggableCore bounds="parent" onStart={bringToFront} style={{position: "relative"}}>
                                        <div ref={nodeRef}>
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
                                                isOpenGeneratorDialog = {isOpenGeneratorDialog}
                                                setFieldInFocusHandler={setFieldInFocusHandler}
                                                loadGeneratorToEditDialog = {loadGeneratorToEditDialog}
                                            />
                                        </div>
                                    </DraggableCore>
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
                                    backgroundColor: "yellow", 
                                    padding: "20px", 
                                    borderColor: "white", 
                                    borderStyle: "dashed", 
                                    borderWidth: "1px", 
                                    flexWrap: "wrap", 
                                    flexGrow: "1",
                                    overflow: "scroll", }}>
                                
                                        {currentSchemaLocal.tables.map(table => {return( 
                                            <DraggableCore bounds="parent" onStart={bringToFront} style={{position: "relative"}}>
                                                <div ref={nodeRef}>
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
                                                        isOpenGeneratorDialog = {isOpenGeneratorDialog}
                                                        setFieldInFocusHandler={setFieldInFocusHandler}
                                                        loadGeneratorToEditDialog = {loadGeneratorToEditDialog}
                                                    />
                                                </div>
                                            </DraggableCore>
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
                data={generatorDescriptions} 
                handleClickOpenRawGeneratorSelectionDialog={handleClickOpenRawGeneratorSelectionDialog}
                selectGeneratorHandler={selectGeneratorHandler} 
            />                   
            <DialogRawGeneratorSelection  
                isOpenRawGeneratorDialog={isOpenRawGeneratorDialog} 
                handleCloseRawGeneratorSelectionDialog={handleCloseRawGeneratorSelectionDialog} 
                data={rawGeneratorDescriptions} 
                handleClickOpenGeneratorSelectionDialog={handleClickOpenGeneratorSelectionDialog} 
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
                upgradeCopyGeneratorObject={upgradeCopyGeneratorObject}
                resetGeneratorStateVariables={resetGeneratorStateVariables}

            />        

                        

        </div>
        </>
    )

}

