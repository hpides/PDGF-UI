import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from "@material-ui/core/DialogActions";
import FormIdGenerator from "./FormIdGenerator";
import FormLongNumberGenerator from "./FormLongNumberGenerator";
import FormDateTimeGenerator from "./FormDateTimeGenerator";
import FormDoubleNumberGenerator from "./FormDoubleNumberGenerator";
import FormDictListGenerator from "./FormDictListGenerator";
import FormRandomStringGenerator from "./FormRandomStringGenerator";
import FormRandomSentenceGenerator from "./FormRandomSentenceGenerator";
import FormIfGenerator from "./FormIfGenerator";
import FormOtherFieldValueGenerator from "./FormOtherFieldValueGenerator";
import FormStaticValueGenerator from "./FormStaticValueGenerator";
import FormPrePostFixGenerator from "./FormPrePostFixGenerator";
import FormSwitchGenerator from "./FormSwitchGenerator";
import FormSequentialGenerator from "./FormSequentialGenerator";
import FormReferenceValueGenerator from "./FormReferenceValueGenerator";
import FormProbabilityGenerator from "./FormProbabilityGenerator";
import FormUUIDGenerator from "./FormUUIDGenerator";
import {emptyGenerator, commonGeneratorAttributes, specificGeneratorAttributes, rawGeneratorExplanations} from "./data";
import GeneratorFormPaddingExpansion from "./GeneratorFormPaddingExpansion";
import GeneratorFormRepoExpansion  from "./GeneratorFormRepoExpansion";
import GeneratorFormNullValuesElement from "./GeneratorFormNullValuesElement";
import Typography from "@material-ui/core/Typography";
import cloneDeep from 'lodash/cloneDeep';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import Collapse from "@material-ui/core/Collapse";
import {infoBlue} from "./styles";
import {infoTextStyles} from "./styles";

const useStyles = makeStyles({
  infoTextBox: { ... infoTextStyles
  },    
});



export default function DialogUniversalGeneratorForm(props) {
  const classes = useStyles();
  const [infoTextVisible, setInfoTextVisible]  = useState(false);

  const toggleInfoTextVisible = () => {
    setInfoTextVisible(!infoTextVisible);
  };

  const showInfoText = () => {
      setInfoTextVisible(true);
  };

  const hideInfoText = () => {
    setInfoTextVisible(false);
  };

  const [generatorObject, setGeneratorObject]=useState(emptyGenerator);

  const addUidAndTypeToGenerator = () => {
    const miliSecondsFrom1970To2020 = 1577785488*1000;
    const uid = Date.now() - miliSecondsFrom1970To2020; 
    const newGenerator = cloneDeep(generatorObject);
    newGenerator.uid = uid;
    newGenerator.generatorType = props.selectedGeneratorType;
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

 // useEffect(()=>{props.upgradeCopyGeneratorObject(generatorObject)});



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
        console.log("entered renderSwitch-Statement with generatorType: " + props.generatorType);
        switch (props.selectedGeneratorType) {
          
          case "idGenerator":
                return <FormIdGenerator
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}/>;
            case "longNumberGenerator":
                return <FormLongNumberGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}/>;
            case "dateTimeGenerator":
                return <FormDateTimeGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}
                           /> 
            case "randomStringGenerator":
              return <FormRandomStringGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/> 

            case "randomSentenceGenerator":
              return <FormRandomSentenceGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/> 

            case "dictListGenerator":
              return <FormDictListGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/> 

            case "doubleNumberGenerator":
              return <FormDoubleNumberGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/> 

           case "ifGenerator":
              return <FormIfGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/>  

             case "referenceValueGenerator":
              return <FormReferenceValueGenerator
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}
                        currentSchemaLocal={props.currentSchemaLocal}/> 

              case "otherFieldValueGenerator":
                return <FormOtherFieldValueGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}
                          currentSchemaLocal={props.currentSchemaLocal}
                          fieldInFocus={props.fieldInFocus}/> 
      

              case "staticValueGenerator":
              return <FormStaticValueGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/>
            

              case "prePostFixGenerator":
                return <FormPrePostFixGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}/>
               


              case "probabilityGenerator":
                return <FormProbabilityGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}/>
                


              case "sequentialGenerator":
                return <FormSequentialGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}/>
                  


              case "switchGenerator":
              return <FormSwitchGenerator 
                        generatorObject={generatorObject}
                        setGeneratorObject={setGeneratorObjectHandDown}/>
              


              case "uuidGenerator":
                return <FormUUIDGenerator 
                          generatorObject={generatorObject}
                          setGeneratorObject={setGeneratorObjectHandDown}/>



          case "BlankPage":
              return <div>There is nothing to see here...</div>
                      
    

            default:
                return <div>Sorry, but we have not found that type of generator!</div>
        }
    };
       
    const typeTitleMapping = (type) =>{
      switch(type){
        case "dateTimeGenerator":
          return "Date-Time-Generator";
        case "dictListGenerator":
          return "Dictionary-List-Generator";
        case "doubleNumberGenerator":
          return "DoubleNumber-Generator";
        case "idGenerator":
          return "ID-Generator";
        case "ifGenerator":
          return"If-Generator";
        case "longNumberGenerator":
            return"LongNumber-Generator";
        case "otherFieldValueGenerator":
          return"Other-FieldValue-Generator";
        case "prePostFixGenerator":
          return"Pre- and Postfix-Generator";
        case "probabilityGenerator":
          return"Probabiltiy-Generator";
        case "randomSentenceGenerator":
          return"Random-Sentence-Generator";
        case "randomStringGenerator":
          return"Random-String-Generator";
        case "referenceValueGenerator":
          return"Reference-Value-Generator";
        case "sequentialGenerator":
            return"Sequential-Generator";
        case "staticValueGenerator":
          return"Static-Value-Generator";
        case "switchGenerator":
          return"Switch-Generator";
        case "uuidGenerator":
          return"UUID-Generator";  
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
        PaperProps={{elevation: 24 }}
        fullWidth
        maxWidth="md"
        >
      <DialogTitle disableTypography id="simple-dialog-title">
         
          <Grid container display="flex" direction="row" justify="space-between">
                <Grid container xs={12} item justify="flex-start">
                    <Grid item>
                        <Typography style={{fontSize: "30px"}}>{typeTitleMapping(props.selectedGeneratorType)}</Typography>
                    </Grid>

                    <Grid item>
                            <IconButton onClick={toggleInfoTextVisible}>
                                <InfoIcon style={{color: "#385fe0"}}/>
                            </IconButton>
                    </Grid>
                </Grid>
         
                <Grid item xs={12} >
                    <Collapse in={infoTextVisible}>
                      <div className={classes.infoTextBox} onClick={hideInfoText}>
                      {rawGeneratorExplanations[props.selectedGeneratorType]}
                      </div>
                    </Collapse>
                </Grid>
          </Grid>
      </DialogTitle>
      
      <div  style={{overflow: "auto", margin: "auto", paddingLeft: "15px", background: "inherit"}}> 
      
    
          {renderSwitch()}

          <Grid direction="column" container item>
                

                <GeneratorFormNullValuesElement
                    generatorObject={generatorObject}
                    setGeneratorObject={setGeneratorObjectHandDown}
                    withNullValuesChangedHandler={withNullValuesChangedHandler}
                    handleNullValuesSliderChange={handleNullValuesSliderChange}
                    handleNullValuesInputChange={handleNullValuesInputChange}
                    handleBlur={handleBlur}
                    />    

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