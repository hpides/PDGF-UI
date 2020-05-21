// PDGF-XML Creation

createXmlForPDGF = () => {
    const xmlVersion = String.raw`<?xml version="1.0" encoding="UTF-8" standalone="no"?>`;
    let schemaName = currentSchemaLocal.info.schemaName;
    let xmlSchemaTag_open = String.raw`<schema xmlns:doc="http://bankmark.de/pdgf/doc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name=${schemaName} xsi:noNamespaceSchemaLocation="structure/pdgfSchema.xsd">`;
    let xmlSchemaTag_close = String.raw`</schema>`;
    const seedValue = currentSchemaLocal.variables.defaultVariables[0].value;
    let seedValueTag = String.raw`<seed>${seedValue}</seed>`;
    let rngType = currentSchemaLocal.variables.defaultVariables[2].value;
    let rngTypeTag = String.raw`<rng name=${rngType}/>`;
    let scaleFactor = currentSchemaLocal.variables.defaultVariables[1].value;;// Name ist missverständlich -> ändern
    let scaleFactorTag = String.raw`<property name="SF" type="double">${scaleFactor}</property>`;
    
    // other default variables => to Do: Write for loop to generate Variables automatically from State
    //let defaultSystemVariable1 = seedValueTag;
    //let defaultSystemVariable1Tag = String.raw`<property name="def" type="double">${defaultSystemVariable1}</property>`;
    //let defaultSystemVariable2 = defaultScaleFactorTag;
    //let defaultSystemVariable2Tag = String.raw`<property name="SF" type="double">${defaultSystemVariable2}</property>`;
    let stringFields = myTableAggregator(currentSchemaLocal.tables);
    let customSystemVariables = createCustomSystemVariableTags(currentSchemaLocal.variables.customVariables);
  
  
    
    let stringSchema =      xmlVersion + "\r\n" +
                            xmlSchemaTag_open + "\r\n\r\n" +
                            seedValueTag + "\r\n" +
                            rngTypeTag + "\r\n" +
                            defaultScaleFactorTag + "\r\n" + 
                            //defaultSystemVariable1Tag + "\r\n" + 
                            //defaultSystemVariable2Tag  + "\r\n\r\n" + 
                            customSystemVariables + "\r\n\r\n" +
                            stringFields + 
                            xmlSchemaTag_close + "\r\n";
  
  
    writeSchemaToDownloadFile(stringSchema);
  
    };
  
  

    // new function processing customVariables
    const createCustomSystemVariableTags = (customSystemVariables) => {
      let result = "";
      customSystemVariables.map((variable) => {
      //alert(variable.name + " " + variable.type + " " + variable.value);
      let output = `<property name= "${variable.name}" type="${variable.type}">${variable.value}</property>` + `\r\n`;
      //alert(output);
      result = result + output;
      return output;
    })
    return result;
  }
  
  
  
  
  
    const myTableAggregator = (tables) => {
      let stringTable = "";
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
          
          stringTable = stringTable.concat(tempString);
        });
  
          return stringTable;
          
    
    }
   
    const aggregateFieldTags = (table) => {
        let aggregatedFieldTag ="";
        table.tableItems.forEach(row => {
        let fieldName = row.fieldName;
        let fieldTagOpen = String.raw`<field name=${fieldName} size="" type="NUMERIC">`;
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
        switch (generator.type) {
            case 'idGenerator':
            tempString = this.gen_idGenerator(generator);
            return tempString;
            case 'doubleNumberGenerator':
            tempString = this.gen_doubleNumberGenerator(generator);
            return tempString;
            case 'longNumberGenerator':
            tempString = this.gen_longNumberGenerator(generator);
            return tempString;
            case 'dateTimeGenerator':
            tempString = this.gen_dateTimeGenerator(generator);
            return tempString;  
            case 'dictListGenerator':
                tempString = this.gen_dictListGenerator(generator);
                return tempString;  
            case  'randomStringGenerator': 
            tempString = this.gen_randomStringGenerator(generator);
            return tempString;
            case  'randomSentenceGenerator': 
            tempString = this.gen_randomSentenceGenerator(generator);
            return tempString;
    
            case  'referenceValueGenerator': 
            tempString = this.gen_referenceValueGenerator(generator);
            return tempString;
            case  'probabilityGenerator': 
            tempString = this.gen_probabilityGenerator(generator);
            return tempString;
            case  'staticValueGenerator': 
            tempString = this.gen_staticValueGenerator(generator);
            return tempString;
            case  'otherFieldValueGenerator': 
            tempString = this.gen_otherFieldValueGenerator(generator);
            return tempString;

  
            default:  
            return "";  
        }    
    } 
  
  
  const gen_idGenerator = (generator) => {
    let minimum = generator.minimum;
    // eslint-disable-next-line
    let generatorTag = "<gen_Id>" + "\r\n\t" +
                                    `<min>${minimum}</min>` + "\r\n" + 
                                    "</gen_Id>" + "\r\n";
    return generatorTag;
  }
  
  // output und input-Format aktuell noch nicht veränderbar!
  const gen_dateTimeGenerator = (generator) => {
    let startDate = generator.startDate;
    let endDate = generator.endDate;
    let fixedStepSizeOn = generator.fixedStepSize;
    let randomNumberGeneratorOff = generator.disableRNG;
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
  
  const gen_doubleNumberGenerator = (generator) => {
    let minimum = generator.minimum;
    let maximum = generator.maximum;
    let distinctValues = generator.hasAllDistinctValues;
    let numberDecimalPlaces = generator.decimalPlaces;
  
    let generatorTag = "<gen_DoubleNumber>" + "\r\n\t" +
                                    `<minD>${minimum}</minD>` + "\r\n\t" +
                                    `<maxD>${maximum}</maxD>` + "\r\n\t" +
                                    `<distinct>${distinctValues}</distinct>` + "\r\n\t" +
                                    `<decimalPlaces>${numberDecimalPlaces}</decimalPlaces>` + "\r\n" +
                                  "</gen_DoubleNumber>" + "\r\n";
    return generatorTag;                              
  }
  
  
  const gen_longNumberGenerator = (generator) => {
    let minimum = generator.minimum;
    let maximum = generator.maximum;
    let distinctValues = generator.distinctValues;
    let distribution = generator.distributionVariables;
    

    type: "equalDistribution",
    normalDistribution: {
      standardDeviation: "",
      mean: "",
    },
    binomialDistribution: {
      n: "",
      p: "",
    },
    exponentialDistribution: {
      lambda: "",
    },
    logarithmicDistribution: {
      p: "",
    },



    
    switch(distribution.type){
        case normalDistribution:
            const distribution = "normal";
            const mean = distribution.normalDistribution.mean;
            const sd = distribution.normalDistribution.standardDeviation;
            break;
        case equalDistribution:
            const distribution = "equal";
            break;
        case binomialDistribution:
            const distribution = "binomial";
            const p = distribution.binomialDistribution.p;
            const n = distribution.binomialDistribution.n;
            break;
        case exponentialDistribution:
            const lambda = distribution.exponentialDistribution.lambda;
            
            break;
        case logarithmicDistribution:
            const p = distribution.logarithmicDistribution.p;
            break;
        
    //to do
  
    // <field name="random_double_fmt_dist" size="" type="DOUBLE"></field>
  
    let generatorTag = "<gen_LongGenerator>" + "\r\n\t" +
                                    `<minD>${minimum}</minD>` + "\r\n\t" +
                                    `<maxD>${maximum}</maxD>` + "\r\n\t" +
                                    `<distinct>${distinctValues}</distinct>` + "\r\n\t" +
                                    `<distribution> ${distribution} </distribution>` + "\r\n" +    // to do <distribution mean="5" name="Normal" sd="2"/>    
                                  "</gen_LongGenerator>"+ "\r\n";
    return generatorTag;                              
  }
  
  
  const gen_dictListGenerator = (generator) => {
    let dictionary = generator.spec.dictionary;
    let size = generator.spec.size;
    let separator = generator.spec.separator;
    //let distribution = generator.spec.distribution;
    let uniqueValues = generator.spec.uniqueValues;
    let rngOff = generator.spec.rngOff;
    let generatorTag = "<gen_DictList>" + "\r\n\t" +
                                      `<size>${size}</size>` + "\r\n\t" +
                                      `<separator>${separator}</separator>` + "\r\n\t" +
                                      `<unique>${uniqueValues} </unique>` + "\r\n\t" + 
                                      `<disableRng>${rngOff}</disableRng>` + "\r\n\t" +
                                      `<file>dicts/${dictionary}</file>` + "\r\n" +
                                    "</gen_DictList>" + "\r\n";
    return generatorTag;
                                      
  }
  
  
  const gen_randomStringGenerator = (generator) => {
  
    let min = generator.spec.min;
    let max = generator.spec.max;
    let characters = generator.spec.characters;
  
  
    let generatorTag = "<gen_RandomString>" + "\r\n\t" +
                                      `<min>${min}</min>` + "\r\n\t" +
                                      `<max>${max}</max>` + "\r\n\t" +
                                      `<characters>${characters}</characters>` + "\r\n\t" +
                                    "</gen_RandomString>" + "\r\n";
    return generatorTag;
  }
  
  
  
  const gen_randomSentenceGenerator = (generator) => {
  
    let min = generator.spec.min;
    let max = generator.spec.max;
    let distinctCharacters = generator.spec.distinctCharacters;
    //let distribution = generator.spec.distribution;
  
    let generatorTag = "<gen_RandomSentence>" + "\r\n\t" +
                                      `<min>${min}</min>` + "\r\n\t" +
                                      `<max>${max}</max>` + "\r\n\t" +
                                      `<distinct>${distinctCharacters}</distinct>` + "\r\n" +
                                      /*
                                      `<distribution>${TODO}</distribution>` + "\r\n\t" +
                                        */
                                    "</gen_RandomSentence>" + "\r\n";
    return generatorTag;
  }
  
  
  
  
  
  
  
  
  //todo: currently only easy case
  const gen_referenceValueGenerator = (generator) => {
  
    let referenceTable = generator.spec.referenceTable;
    let referenceField = generator.spec.referenceField;
    let chooseSelection = generator.spec.chooseSelection;
    let fromSelection = generator.spec.fromSelection;
  
  
    let generatorTag = `<gen_ReferenceValue choose="${chooseSelection}" from="${fromSelection}">` + "\r\n\t" +
                                      `<reference field="${referenceField}" table="${referenceTable}"/>` + "\r\n" +
                                    "</gen_ReferenceValue>" + "\r\n";
    return generatorTag;
  }
  
  
  const gen_otherFieldValueGenerator = (generator) => {
  
    
    //let referenceTable = generator.spec.referenceTable;
    let referenceField = generator.spec.referenceField;
    //let chooseSelection = generator.spec.chooseSelection;
    //let fromSelection = generator.spec.fromSelection;
  
  
    let generatorTag = `<gen_otherFieldValue>` + "\r\n\t" +
                            `<reference field="${referenceField}"/>` + "\r\n" +
                       "</gen_otherFieldValue>" + "\r\n";
  
    console.log(generatorTag);
    return generatorTag;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
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
  
  
  const gen_staticValueGenerator = (generator) => {
  
    let staticValue = generator.spec.staticValue;
    
  
    let generatorTag =  `<gen_StaticValue>` + "\r\n\t\t" +
                        `<value>${staticValue}</value>` + "\r\n" +
                        `</gen_StaticValue>` + "\r\n";
  
    return generatorTag;
  }
  
  
  
  
  
  // refactor with exportSchemaAsJSON 
  const writeSchemaToDownloadFile = (schema) => {
    let blob = new Blob ([schema], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "schema_pdgf.txt");
  }  
  
  
  const exportSchemaAsJSON = () => {
    let allDataObject = this.state;
    let json = JSON.stringify(allDataObject);
    let blob = new Blob ([json], {type: "text/plain;charset=utf-8"});
    saveAs(blob, `${this.state.schemaName} schemaObject_pdgf.txt`);
  }
  