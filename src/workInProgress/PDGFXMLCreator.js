// PDGF-XML Creation

const createXmlForPDGF = () => {
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
    let customSystemVariables = createCustomSystemVariableTags(currentSchemaLocal.variables.customVariables);

  
  
    
    let stringSchema =      xmlVersionTag + "\r\n" +
                            xmlSchemaTagOpen + "\r\n\r\n" +
                            seedValueTag + "\r\n" +
                            rngTypeTag + "\r\n" +
                            defaultScaleFactorTag + "\r\n" + 
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
            //console.log(output);
            result = result + output;
            return output; // ist die Zeile notwendig?
        })
        return result;
    }
  
    const myTableAggregator = (tables) => {
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
  
          return stringTable;
    }
   

    const aggregateFieldTags = (table) => {
        let aggregatedFieldTag ="";
        table.tableItems.forEach(row => {
        let fieldName = row.fieldName;
        let fieldTagOpen = String.raw`<field name=${fieldName} size="" type="${row.fieldType}">`;
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
                                        `<disableRng>${randomNumberGeneratorOff}</disableRng>` + "\r\n\t" +
                                      "</gen_DateTime>" + "\r\n";
      return generatorTag;
  }


  const gen_dictListGenerator = (generator) => {
      let dictionary = generator.spec.dictionary;
      let size = generator.spec.size;
      let separator = generator.spec.separator;
      let distribution = generator.spec.distribution;
      let uniqueValues = generator.spec.uniqueValues;
      let rngOff = generator.spec.rngOff;
      let distributionTag = createDistributionTag(generator);
      let generatorTag = "<gen_DictList>" + "\r\n\t" +
                              `<size>${size}</size>` + "\r\n\t" +
                              `<separator>${separator}</separator>` + "\r\n\t" +
                              `<unique>${uniqueValues} </unique>` + "\r\n\t" + 
                              `<disableRng>${rngOff}</disableRng>` + "\r\n\t" +
                              `<file>dicts/${dictionary}.dict</file>` + "\r\n" +
                              `${distributionTag}` +  + "\r\n" +
                          "</gen_DictList>" + "\r\n";
      return generatorTag;                           
  }
  

  const gen_doubleNumberGenerator = (generator) => {
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
                              `<decimalPlaces>${numberDecimalPlaces}</decimalPlaces>` + "\r\n" +
                              `<locale>${locale}</locale>` + "\r\n" +
                              `${distributionTag}` +  + "\r\n" +
                          "</gen_DoubleNumber>" + "\r\n";
      return generatorTag;                              
  }


  const gen_idGenerator = (generator) => {
      let minimum = generator.minimum;
      // eslint-disable-next-line
      let generatorTag ="<gen_Id>" + "\r\n\t" +
                              `<min>${minimum}</min>` + "\r\n" + 
                        "</gen_Id>" + "\r\n";
      return generatorTag;
  }
  
  
  const gen_longNumberGenerator = (generator) => {
      let minimum = generator.minimum;
      let maximum = generator.maximum;
      let distinctValues = generator.distinctValues;
      let distributionTag = createDistributionTag(generator);
      
      let generatorTag =  "<gen_LongNumberGenerator>" + "\r\n\t" +
                              `<minD>${minimum}</minD>` + "\r\n\t" +
                              `<maxD>${maximum}</maxD>` + "\r\n\t" +
                              `<distinct>${distinctValues}</distinct>` + "\r\n\t" +
                              `${distributionTag}` +  + "\r\n" +
                          "</gen_LongNumberGenerator>"+ "\r\n";
    return generatorTag;                              
  }
  

  const gen_otherFieldValueGenerator = (generator) => {
  
      //let referenceTableId = generator.spec.referenceTableId;
      let referenceField = generator.spec.referenceField;
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
      let generatorTag = createGeneratorXML(generator);
      // eslint-disable-next-line
      let generatorTag ="<gen_PrePostfix>" + "\r\n\t" +
                            `<prefix>${preFix}</prefix>` + "\r\n\t" +
                                `${generatorTag}` + "\r\n\t" +
                            `<postfix>${postFix}</postfix>` + "\r\n\t" +
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
  
    let min = generator.min;
    let max = generator.max;
    let distinctCharacters = generator.distinctCharacters;
    let distributionTag = createDistributionTag(generator);

    let generatorTag =  "<gen_RandomSentence>" + "\r\n\t" +
                            `<min>${min}</min>` + "\r\n\t" +
                            `<max>${max}</max>` + "\r\n\t" +
                            `<distinct>${distinctCharacters}</distinct>` + "\r\n" +
                            `${distributionTag}` +  + "\r\n" +
                        "</gen_RandomSentence>" + "\r\n";
    return generatorTag;
}


  const gen_randomStringGenerator = (generator) => {
  
    let min = generator.min;
    let max = generator.max;
    let characters = generator.characters;
  
  
    let generatorTag = "<gen_RandomString>" + "\r\n\t" +
                            `<min>${min}</min>` + "\r\n\t" +
                            `<max>${max}</max>` + "\r\n\t" +
                            `<characters>${characters}</characters>` + "\r\n\t" +
                        "</gen_RandomString>" + "\r\n";
    return generatorTag;
  }
  

//todo: currently only easy case
const gen_referenceValueGenerator = (generator) => {
  
    let referenceTableId = generator.referenceTableId;
    let referenceField = generator.referenceField;
    let chooseSelection = generator.chooseSelection;
    let fromSelection = generator.fromSelection;
  
    let generatorTag = `<gen_ReferenceValue choose="${chooseSelection}" from="${fromSelection}">` + "\r\n\t" +
                            `<reference field="${referenceField}" table="${referenceTableId}"/>` + "\r\n" +
                        "</gen_ReferenceValue>" + "\r\n";
    return generatorTag;
  }
  
/*
const gen_sequentialGenerator = (generator) => {
    let delimiter = generator.delimiter;
    let concatenateResults = generator.concatenateResults;
    let delimitEmptyValues = generator.delimitEmptyValues;
    let subGeneratorTag = generator.generators.map(generator => { 
        let a = createSubGeneratorTag(generator)};
    // eslint-disable-next-line
    let generatorTag =`<gen_Sequential concatenateResults="${concatenateResults} delimiter="${deimiter} delimitEmptyValues="${delimitEmptyValues}>` + "\r\n\t" +

                            `${subGeneratorTag}` + "\r\n" + 
                      "</gen_Sequential>" + "\r\n";
    return generatorTag;
}

*/
  
const gen_staticValueGenerator = (generator) => {
      let staticValue = generator.staticValue;
      // eslint-disable-next-line
      let generatorTag ="<gen_StaticValue>" + "\r\n\t" +
                              `<value>${staticValue}</value>` + "\r\n" + 
                        "</gen_Id>" + "\r\n";
      return generatorTag;
  }  
  

const gen_switchGenerator = (generator) => {
    let generator = generator.generator;
    let defaultGeneratorTag = createGeneratorXML(generator);
    let caseOutcomeSets = generator.caseOutcomeSets;
    let caseGeneratorTags = createCaseGeneratorXML(caseOutcomeSets);
        
    // eslint-disable-next-line
    let generatorTag ="<gen_Switch>" + "\r\n\t" +
                            `<value>${staticValue}</value>` + "\r\n" + 
                        "</gen_Id>" + "\r\n";
    return generatorTag;
}  
  
  
const gen_uuidGenerator = (generator) => {
    
    let generatorTag ="<gen_UUID>" + "\r\n\t" +
                      "</gen_UUID>" + "\r\n";
    return generatorTag; 
}  
  
  
  
 
  
  
  
  
  
  
  
  
  
  // refactor with exportCurrentSchemaAsJSON 
  const writeSchemaToDownloadFile = (schema) => {
    let blob = new Blob ([schema], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "schema_pdgf.txt");
  }  
  
  
  const exportCurrentSchemaAsJSON = () => {
    let allDataObject = state;
    let json = JSON.stringify(allDataObject);
    let blob = new Blob ([json], {type: "text/plain;charset=utf-8"});
    saveAs(blob, `${state.schemaName} schemaObject_pdgf.txt`);
  }
  


  const createDistributionTag = (generator) => {
    switch(generator.generatorType){
        case "uniformDistribution":
            return ``
        case "normalDistribution":
            return `<distribution mean="${generator.distributionVariables.mean} name="Normal" sd="${generator.distributionVariables.standardDeviation}"/>` 
        case "exponentialDistribution":
            return `<distribution mean="${generator.distributionVariables.mean} name="Exponential" lambda="${generator.distributionVariables.lambda}"/>` 
        case "logarithmicDistribution":
            return `<distribution mean="${generator.distributionVariables.mean} name="Logarithmic" p="${generator.distributionVariables.p}"/>` 
        case "binomialDistribution":
            return `<distribution mean="${generator.distributionVariables.mean} name="Binomial" n="${generator.distributionVariables.n}" p="${generator.distributionVariables.n}"/>` 
        
    }
  }


  const createCaseGeneratorXML = (caseOutcomeSets) => {
        let generatorTag = "";  
        caseOutcomeSets.map(caseOutcomeSet =>{ 
            let case = caseOutcomeSet.case;
            let caseTagOpen = `<case value="${case}">`;
            let caseTagClose = `</case>`
            let outcomeGenerator = caseOutcomeSet.outcomeGenerator;
            let outcomeGeneratorTag = createGeneratorXML(outcomeGenerator);

            const subGeneratorTag = caseTagOpen + "\r\n\t" + outcomeGeneratorTag + "\r\n\t" + caseTagClose +  "\r\n\t";
            generatorTag.concat(subGeneratorTag);                           
        });
        return generatorTag;
  }




/* Kopie Probability Generator
  
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
  
  
  */
  