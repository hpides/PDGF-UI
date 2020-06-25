 // function for creating a PdGF xml-specification for the current Schema
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
    let xmlForTablesAndFields = myTableAggregator(currentSchemaLocal.tables);
    let xmlForCustomSystemVariables = createCustomSystemVariableTags(currentSchemaLocal.variables.customVariables.variableItems);

  
  
    
    let stringSchema =      xmlVersionTag + 
                            xmlSchemaTagOpen +
                            seedValueTag + 
                            rngTypeTag + 
                            scaleFactorTag + 
                            xmlForCustomSystemVariables + 
                            xmlForTablesAndFields + 
                            xmlSchemaTagClose;
  
                    
    writeSchemaToDownloadFile(stringSchema);
  
    };
  
  

    // new function processing customVariables
    const createCustomSystemVariableTags = (customSystemVariables) => {
        let result = "";
        customSystemVariables.map((variable) => {
            let output = `<property name= "${variable.name}" type="${variable.dataType}">${variable.value}</property>`;
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
    
            let tempString =  tableTagOpen +
                              tableSizeTag + 
                              aggregateFieldTags(table) + //hier kommen die Infos zu den Feldern/Reihen
                              tableTagClose;
            
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
        let tempString = fieldTagOpen +
                        createGeneratorXML(row.generator) +
                        fieldTagClose;
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
      let generatorTag = "<gen_DateTime>" + 
                                        `<outputFormat>yyyy-MM-dd</outputFormat>` + 
                                        `<inputFormat>yyyy-MM-dd</inputFormat>` + 
                                        `<startDate>${startDate}</startDate>` + 
                                        `<endDate>${endDate}</endDate>` +
                                        `<useFixedStepSize>${fixedStepSizeOn}</useFixedStepSize>` + 
                                        `<disableRng>${randomNumberGeneratorOff}</disableRng>` + 
                                      "</gen_DateTime>";
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
      let generatorTag = "<gen_DictList>" +
                              `<size>${size}</size>` +
                              `<separator>${separator}</separator>` +
                              `<unique>${uniqueValues}</unique>` +  
                              `<disableRng>${rngOff}</disableRng>` +
                              `<file>dicts/${dictionary}.dict</file>` +
                              `${distributionTag}` +
                          "</gen_DictList>" + 
  }
  

  const gen_doubleNumberGenerator = (generator) => {
    console.log("entered gen_doubleNumber");
        let minimum = generator.minimum;
      let maximum = generator.maximum;
      let distinctValues = generator.hasAllDistinctValues;
      let numberDecimalPlaces = generator.decimalPlaces;
      let locale = generator.locale;
      let distributionTag = createDistributionTag(generator);
   
      let generatorTag = "<gen_DoubleNumber>" +
                              `<minD>${minimum}</minD>` +
                              `<maxD>${maximum}</maxD>` + 
                              `<distinct>${distinctValues}</distinct>` + 
                              `<decimalPlaces>${numberDecimalPlaces}</decimalPlaces>` + 
                              `<locale>${locale}</locale>` +
                          "</gen_DoubleNumber>";
      return generatorTag;                              
  }


  const gen_idGenerator = (generator) => {
    console.log("entered gen_id");  
    let minimum = generator.minimum;
      // eslint-disable-next-line
      let generatorTag ="<gen_Id>" + 
                              `<min>${minimum}</min>` +
                        "</gen_Id>" + 
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
    let generatorTag =  "<gen_If>" +
                            subGeneratorTag + 
                            `<if>![CDATA[${ifExpression}]]</if>` +
                                `<then>` + 
                                    thenValueTag +
                                `</then>` + 
                                `<else>`  +
                                    elseValueTag + 
                                `</else>` + 
                        "</gen_If>";         
    return generatorTag;
}


  const gen_longNumberGenerator = (generator) => {
        console.log(" entered in LongNumberGen");
        console.log("object: " + JSON.stringify(generator));
        let minimum = generator.minimum;
      let maximum = generator.maximum;
      let distinctValues = generator.numberOfDistinctCharacters;
      let distributionTag = createDistributionTag(generator);
      
      let generatorTag =  "<gen_LongNumberGenerator>" +
                              `<minD>${minimum}</minD>` +
                              `<maxD>${maximum}</maxD>` + 
                              `<distinct>${distinctValues}</distinct>` +
                              `${distributionTag}` +
                          "</gen_LongNumberGenerator>";
    return generatorTag;                              
  }
  

  const gen_otherFieldValueGenerator = (generator) => {
  
      let referenceField = generator.referenceField;  
      let generatorTag = `<gen_otherFieldValue>` +  `<reference field="${referenceField}"/>` </gen_otherFieldValue>"
      return generatorTag;
  }


  const gen_prePostFixGenerator = (generator) => {
      let preFix = generator.preFix;
      let postFix = generator.postFix;
      let subGeneratorTag = createGeneratorXML(generator.subGeneratorObject);
      // eslint-disable-next-line
      let generatorTag ="<gen_PrePostfix>" +
                            `<prefix>${preFix}</prefix>` +
                                `${subGeneratorTag}` +
                            `<postfix>${postFix}</postfix>` + 
                        "</gen_PrePostfix>";
      return generatorTag;
}

// NOCH IN KONZEPTION ...
const gen_probabilityGenerator = (generator) => {
    let disableShuffling = generator.spec.disableShuffling;
    let valueProbabilityRows = generator.spec.valueProbabilityRows;
    let generator_outer_open = `<gen_Probability>`;
    let generator_outer_close = `</gen_Probability>`;
    let rngSwitch = `<disableRng>${disableShuffling}</disableRng>`;

    let innerStuff = "";
    let i, tempString;

    
    //abarbeiten alle ValueOptionen bis auf die letzte
    for (i = 0; i < valueProbabilityRows.length-1; i++) {
        tempString =  `<probability value= "${valueProbabilityRows[i].probability}">` +
                          `<gen_StaticValue>` +
                          `<value>${valueProbabilityRows[i].value}</value>` +
                          `</gen_StaticValue>` +
                          `</probability>`;
    innerStuff =   innerStuff.concat(tempString);
    }


  // abarbeiten letze ValueOption
  tempString =  `<probability value= "${valueProbabilityRows[valueProbabilityRows.length-1].probability}">` +
                          `<gen_StaticValue>` + 
                          `<value>${valueProbabilityRows[valueProbabilityRows.length-1].value}</value>` +
                          `</gen_StaticValue>` +                          `</probability>`;
    innerStuff =   innerStuff.concat(tempString);
  

    let generatorTag = generator_outer_open + rngSwitch + innerStuff + generator_outer_close;
    return generatorTag;
}


const gen_randomSentenceGenerator = (generator) => {
  
    let min = generator.minimum;
    let max = generator.maximum;
    let distinctCharacters = generator.numberOfDistinctCharacters;
    let distributionTag = createDistributionTag(generator);

    let generatorTag =  "<gen_RandomSentence>" +
                            `<min>${min}</min>` + 
                            `<max>${max}</max>` + 
                            `<distinct>${distinctCharacters}</distinct>` +
                            `${distributionTag}` +
                        "</gen_RandomSentence>";
    return generatorTag;
}


  const gen_randomStringGenerator = (generator) => {
  
    let min = generator.minimum;
    let max = generator.maximum;
    let characters = generator.characterSet;
  
  
    let generatorTag = "<gen_RandomString>" + 
                            `<min>${min}</min>` +
                            `<max>${max}</max>` + 
                            `<characters>${characters}</characters>` +
                        "</gen_RandomString>";
    return generatorTag;
  }
  

//todo: currently only easy case
const gen_referenceValueGenerator = (generator) => {
  
    let referenceTableId = generator.referenceTableId;
    let referenceField = generator.referenceField;
    let chooseSelection = generator.chooseBy;
    let fromSelection = generator.selectFrom;
  
    let generatorTag = `<gen_ReferenceValue choose="${chooseSelection}" from="${fromSelection}">` +
                            `<reference field="${referenceField}" table="${referenceTableId}"/>` + 
                        "</gen_ReferenceValue>";
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
    let generatorTag =`<gen_Sequential concatenateResults="${concatenateResults} delimiter="${delimiter}" delimitEmptyValues="${delimitEmptyValues}">` +
                            subGeneratorTag  +
                      "</gen_Sequential>" + 
    return generatorTag;
}


  
const gen_staticValueGenerator = (generator) => {
    console.log("entered gen_staticValueGenerator: " + JSON.stringify(generator));  
    let staticValue = generator.staticValue;
      // eslint-disable-next-line
      let generatorTag ="<gen_StaticValue>" +
                              `<value>${staticValue}</value>` +
                        "</gen_StaticValue>";
      return generatorTag;
  }  
  

const gen_switchGenerator = (generator) => {
    let subGenerator = generator.subGeneratorObject;
    let subGeneratorTag = createGeneratorXML(subGenerator);
    let defaultGenerator = generator.default;
    let defaultGeneratorTag = createGeneratorXML(defaultGenerator);
    let caseOutcomeSets = generator.caseOutcomeSets;
    console.log("Ausdruck caseOutcomeSets:" + JSON.stringify(caseOutcomeSets));
    let reducer = (acc, curr) => { return (acc.concat(`<case value="${curr.caseValue}">` + `${createGeneratorXML(curr)} </case>`))};
    //let reducer = (acc, curr) => { return (acc.concat(`<case value="${curr.caseValue}"> ${createGeneratorXML(curr)} </case>`))};
    // leere elemente ab 2. let reducer = (acc, curr) => acc.concat(`<case value="${curr.caseValue}"> ${createGeneratorXML(curr)} </case>`);
    //let reducer = (acc, curr) => acc.concat(createGeneratorXML(curr));
    let caseOutcomeSetsTag = caseOutcomeSets.reduce(reducer, "");
        
    // eslint-disable-next-line
    let generatorTag ="<gen_Switch>" +
                            subGeneratorTag +
                            `<default>` +
                                defaultGeneratorTag +
                            `</default>`  +
                            caseOutcomeSetsTag + 
                        "</gen_Switch>";
    return generatorTag;
}  
  
  
const gen_uuidGenerator = (generator) => {
    
    let generatorTag ="<gen_UUID>" +
                      "</gen_UUID>";
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

            const subGeneratorTag = caseTagOpen + outcomeGeneratorTag + caseTagClose;
            generatorTag.concat(subGeneratorTag);                           
        });
        return generatorTag;
  }

