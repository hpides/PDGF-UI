import React, {useState, useEffect} from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from "@material-ui/core/DialogActions";
import FormIdGenerator from "./FormIdGenerator";
import FormLongGenerator from "./FormLongGenerator";
import FormDateTimeGenerator from "./FormDateTimeGenerator";
import FormDoubleGenerator from "./FormDoubleGenerator";
import FormDictListGenerator from "./FormDictListGenerator";
import FormRandomStringGenerator from "./FormRandomStringGenerator";
import FormRandomSentenceGenerator from "./FormRandomSentenceGenerator";
import FormIfGenerator from "./FormIfGenerator";
import FormOtherFieldValueGenerator from "./FormOtherFieldValueGenerator";
import FormConstantValueGenerator from "./FormConstantValueGenerator";
import FormPrePostFixGenerator from "./FormPrePostFixGenerator";
import FormSwitchGenerator from "./FormSwitchGenerator";
import FormSequentialGenerator from "./FormSequentialGenerator";
import FormReferenceGenerator from "./FormReferenceGenerator";
import FormProbabilityGenerator from "./FormProbabilityGenerator";
import {emptyGenerator} from "./data";
import GeneratorFormPaddingExpansion from "./GeneratorFormPaddingExpansion";
import GeneratorFormRepoExpansion  from "./GeneratorFormRepoExpansion";
import GeneratorFormNullValuesElement from "./GeneratorFormNullValuesElement";
import cloneDeep from 'lodash/cloneDeep';

/*const useStyles = makeStyles({
    input: {
    fontSize: 22,
  },
  inputSelect: {
    fontSize: 22,
  },
});
*/


export default function DialogUniversalGeneratorForm(props) {
  //const classes = useStyles();
      
  const [generatorObject, setGeneratorObject]=useState(emptyGenerator);

  const addUidAndTypeToGenerator = () => {
    const miliSecondsFrom1970To2020 = 1577785488*1000;
    const uid = Date.now() - miliSecondsFrom1970To2020; 
    const newGenerator = cloneDeep(generatorObject);
    newGenerator.uid = uid;
    newGenerator.type = props.selectedGeneratorType;
    setGeneratorObject(newGenerator);
  };


  const copyGeneratorToBeEdited = () => {
    const schema = cloneDeep(props.currentSchemaLocal);
    let tableIndex = schema.tables.findIndex(x=> x.tableId === props.fieldInFocus.tableId);
    let rowIndex = schema.tables[tableIndex].tableItems.findIndex(x=> x.rowId === props.fieldInFocus.rowId);
    setGeneratorObject(schema.tables[tableIndex].tableItems[rowIndex].generator);
    };




  useEffect(()=>{
    (props.universalGeneratorFormMode === "create")? addUidAndTypeToGenerator(): copyGeneratorToBeEdited();

  }, [props.selectedGeneratorType]);

  useEffect(()=>{props.upgradeCopyGeneratorObject(generatorObject)});



  const reSetGeneratorObject = () => {
    setGeneratorObject(emptyGenerator);
  }

 

  const saveGeneratorAndResetState = () => {
    if (generatorObject.repoVariables.saveInRepo === true){
      props.saveGeneratorInLocalStorage(generatorObject);
      props.addGeneratorToSchema(generatorObject);
      props.resetGeneratorStateVariables();
      reSetGeneratorObject();
      props.handleCloseDialogUniGenForm();
    } else {
      props.addGeneratorToSchema(generatorObject);
      reSetGeneratorObject();
      props.resetGeneratorStateVariables();
      props.handleCloseDialogUniGenForm();
    }
  };

  

  const closeGeneratorFormAndResetState = () => {
    reSetGeneratorObject();
    props.resetGeneratorStateVariables();
    props.handleCloseDialogUniGenForm();
  }



  const setGeneratorObjectHandDown = (newGeneratorState) => {
    setGeneratorObject(newGeneratorState);
  };

  //Changed Handler


    // Change Handler Repo Element

    const saveInRepoChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.repoVariables.saveInRepo = (event.target.checked);
      setGeneratorObject(newGenerator);
  };

  const nameChangedHandler = (event)=> {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.repoVariables.name = (event.target.value);
      setGeneratorObject(newGenerator);
  };

  const descriptionChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.repoVariables.description = (event.target.value);
      setGeneratorObject(newGenerator);
  };

  const examplesChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.repoVariables.examples = (event.target.value);
      setGeneratorObject(newGenerator);
  };


      // Change Handler Padding Component

  const withPaddingChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.paddingVariables.withPadding = (event.target.checked);
      setGeneratorObject(newGenerator);
  };

  const numberCharactersChangedHandler = (event)=> {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.paddingVariables.numberCharacters = (event.target.value);
      setGeneratorObject(newGenerator);
  };

  const fillCharacterChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.paddingVariables.fillCharacter = (event.target.value);
      setGeneratorObject(newGenerator);
  };

  const fromLeftChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.paddingVariables.fromLeft = (event.target.value);
      setGeneratorObject(newGenerator);
  };


    // Change Handler NullValues Component


    const withNullValuesChangedHandler = (event) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.nullValues.withNullValues = event.target.checked;
      setGeneratorObject(newGenerator);
    };
  
     const handleNullValuesSliderChange = (event, newValue) => {
      const newGenerator = cloneDeep(generatorObject);
      newGenerator.nullValues.percentNullValues = newValue;
      setGeneratorObject(newGenerator);
    };
  
    const handleNullValuesInputChange = (event) => {
        const newGenerator = cloneDeep(generatorObject);
        newGenerator.nullValues.percentNullValues = (event.target.value === '' ? '99' : Number(event.target.value));
        setGeneratorObject(newGenerator);
    };
  
  
    const handleBlur = () => {
      if (generatorObject.nullValues.percentNullValues < 0) {
        setGeneratorObject.nullValues.percentNullValues(0);
      } else if (generatorObject.nullValues.percentNullValues > 100) {
        setGeneratorObject.nullValues.percentNullValues(100);
      }
    };


    const renderSwitch = () => {
        //alert("entered renderSwitch-Statement with generatorTpye: " + props.generatorType);
        switch (props.selectedGeneratorType) {
          
          case "IdGenerator":
                return <FormIdGenerator
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}/>;
            case "LongGenerator":
                return <FormLongGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}/>;
            case "DateTimeGenerator":
                return <FormDateTimeGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}
                           /> 
            case "RandomStringGenerator":
              return <FormRandomStringGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/> 

            case "RandomSentenceGenerator":
              return <FormRandomSentenceGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/> 

            case "DictListGenerator":
              return <FormDictListGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/> 

            case "DoubleGenerator":
              return <FormDoubleGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/> 

           case "IfGenerator":
              return <FormIfGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/>  

             case "ReferenceGenerator":
              return <FormReferenceGenerator
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}
                        currentSchemaLocal={props.currentSchemaLocal}/> 

              case "OtherFieldValueGenerator":
                return <FormOtherFieldValueGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}
                          currentSchemaLocal={props.currentSchemaLocal}
                          fieldInFocus={props.fieldInFocus}/> 
      

              case "ConstantValueGenerator":
              return <FormConstantValueGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/>
            

              case "PrePostFixGenerator":
                return <FormPrePostFixGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}/>
               


              case "ProbabilityGenerator":
                return <FormProbabilityGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}/>
                


              case "SequentialGenerator":
                return <FormSequentialGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}/>
                  


              case "SwitchGenerator":
              return <FormSwitchGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/>
              

          case "BlankPage":
              return <div>There is nothing to see here...</div>
                      
    

            default:
                return <div>Sorry, but we have not found that type of generator!</div>
        }
    };
       

  return (
    <>
    <Dialog 
        onClose={props.handleCloseDialogUniGenForm} 
        aria-labelledby="simple-dialog-title" 
        open={props.isOpenDialogUniGenForm}
        titel="Dialog"
        keepMounted
        PaperProps={{elevation: "24" }}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle style={{fontSize: 80}} id="simple-dialog-title">{props.selectedGeneratorType}</DialogTitle>
      
      <div  style={{overflow: "auto", margin: "auto", padding: "0px", background: "inherit"}}>

    
          {renderSwitch()}

          <Grid direction="column" container item>
                <GeneratorFormPaddingExpansion 
                    withPaddingChangedHandler={withPaddingChangedHandler}
                    numberCharactersChangedHandler={numberCharactersChangedHandler}
                    fillCharacterChangedHandler={fillCharacterChangedHandler}
                    fromLeftChangedHandler={fromLeftChangedHandler}
                    generatorObject={generatorObject}
                    /> 

                <GeneratorFormRepoExpansion 
                    saveInRepoChangedHandler={saveInRepoChangedHandler}
                    nameChangedHandler={nameChangedHandler}
                    descriptionChangedHandler={descriptionChangedHandler}
                    examplesChangedHandler={examplesChangedHandler}
                    generatorObject={generatorObject}
                    /> 

                <GeneratorFormNullValuesElement
                   generatorObject={generatorObject}
                   setGeneratorObject={setGeneratorObjectHandDown}
                   withNullValuesChangedHandler={withNullValuesChangedHandler}
                   handleNullValuesSliderChange={handleNullValuesSliderChange}
                   handleNullValuesInputChange={handleNullValuesInputChange}
                   handleBlur={handleBlur}
                   />    

            </Grid>           
      
      </div>

      <DialogActions>
          
          <Button onClick={()=> {closeGeneratorFormAndResetState()}} color="primary">
            Cancel
          </Button>
          <Button 
              onClick={ ()=> {saveGeneratorAndResetState()}}
              color="primary">
            Save
          </Button>
      </DialogActions>  

    </Dialog>
    </>
  )
};