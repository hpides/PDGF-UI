export const schemaDescriptions = [{name: "Uni-Schema", description: "A schema that describes all the constitutents and the resources in an university context. Containing tables for professors, students, assistants, offices, lecture halls, lectures.", author: "Art Vandalay", date: "05/01/2020"},
{name: "Uni-Schema", description: "If these instructions, at any time during the term of this license do not download or use a modified version that you provide valid instructions or cease distribution within thirty (30) days of becoming aware of such a Package may be distributed and modified, as well as conditions under which a given Package.", author: "Art Vandalay", date: "05/01/2020"},
{name: "Big-Bench-Schema", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.", author: "Art Vandalay", date: "05/01/2020"},
{name: "TCP-E-Schema", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.", author: "Art Vandalay", date: "05/01/2020"},
{name: "Web-Shop 01", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua..", author: "Art Vandalay", date: "05/01/2020"},
{name: "Web-Shop 02", description: "Target rich environment. Workflow ecosystem punter or a tentative event rundown is attached for your reference, including other happenings on the day you are most welcome to join us beforehand for a light lunch we would also like to invite you to other activities on the day.", author: "Art Vandalay", date: "05/01/2020"},
{name: "Network Analysis 01", description: "I'm baby messenger bag cloud bread irony etsy snackwave pop-up. Tilde sriracha trust fund paleo yr distillery umami listicle disrupt. Gastropub unicorn 8-bit, health goth raw denim listicle artisan waistcoat messenger bag aesthetic.", author: "Art Vandalay", date: "05/01/2020"},
{name: "Network Analysis 02", description: "Cat ipsum dolor sit amet, kitten is playing with dead mouse or sleep nap massacre a bird in the living room and then look like the cutest and most innocent animal on the planet.", author: "Art Vandalay", date: "05/01/2020"},
{name: "Royalty-Schema", description: "Bacon ipsum dolor amet meatball venison ground round fatback boudin buffalo ball tip tenderloin sausage alcatra shankle tri-tip pork loin chicken salami. Shank short ribs ham hock, venison sausage bresaola beef ribs kevin porchetta shankle pork belly fatback chicken.", author: "Art Vandalay", date: "05/01/2020"}];


export const schemaDescription = {name: "Uni-Schema", description: "A schema that describes all the constitutents and the resources in an university context. Containing tables for professors, students, assistants, offices, lecture halls, lectures.", author: "Art Vandalay", date: "05/01/2020"}

export const schemaDescriptionShort = {name: "Uni-Schema", description: "A schema that describes all the constitutents", author: "Art Vandalay", date: "05/01/2020"}

export const colors2 = [ '#e6194B', 
                        '#3cb44b', 
                        '#ffe119', 
                        '#4363d8', 
                        '#f58231', 
                        '#911eb4', 
                        '#42d4f4', 
                        '#f032e6', 
                        '#bfef45', 
                        '#fabed4', 
                        '#469990', 
                        '#dcbeff', 
                        '#9A6324', 
                        '#fffac8', 
                        '#800000', 
                        '#aaffc3', 
                        '#808000', 
                        '#ffd8b1', 
                        '#000075', 
                        '#a9a9a9'];


export const colors = [ '#e6194B', 
'#ffe119', 
'#f58231', 
'#42d4f4', 
'#f032e6', 
'#bfef45',  
'#469990', 
'#9A6324', 
'#aaffc3', 
'#808000', 
'#3cb44b', 
];


export const enterDelayTime = 700;



export const defaultSystemVariables = [
    {name: "Root-Seed", value: "123456789", type: "number", tooltipName: "The root seed is the seed that is used to initialize the first random number generator. All the other seeds and calculations refer back to him. If you use the same root-seed you will always get the exact same data generated.", tooltipValue: "You are free to choose any value between 1 and 10.000.000."},
    {name: "ScalingFactor", value: "1", type: "number", tooltipName: "The scaling factor is used to increase the number of data over all tables in a realistic way. For each table it is determined to which amount its will partizipate with the scaling. E.g. some tables will keep the same size while others will grow in same amount or even faster." , tooltipValue: "You are free to choose any value larger than 0."},
    ] ;



export const customSystemVariables = [
    {name: "Umtauschkurs EUR-USD", value: "0.97", type: "double"},
    {name: "Umtauschkurs EUR-SF", value: "1.97", type: "double"},
    {name: "Umtauschkurs EUR-CYN", value: "2.97", type: "double"},
    {name: "Umtauschkurs EUR-RR", value: "3.97", type: "double"},
    {name: "Umtauschkurs EUR-BR", value: "4.97", type: "double"},
    {name: "Umtauschkurs EUR-AD", value: "5.97", type: "double"},
    {name: "Umtauschkurs EUR-BCN", value: "6.97", type: "double"},
    {name: "Umtauschkurs EUR-DM", value: "7.97", type: "double"} ];



 export const customSystemVariable = 
    {name: "Umtauschkurs EUR-USD", value: "0.97", type: "double"};


 export const dummyText = {text: "Dumm Dummy Dummy"};



 export const generatorDescription = {name: "SimpleID", description: "Generates consecutive numbers from 0.", examples: "0,1,2,3,4,..."};

 export const generatorDescriptions =[
    {name: "SimpleID", description: "Generates consecutive numbers from 0.", examples: "0,1,2,3,4,..."},
    {name: "Address_German", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "Street_German", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "Name_German", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "Address_US", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "Street_US", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "Name_US", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "Address_Chinese", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "Street_Chinese", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "Name_Chinese", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "IBAN", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "ISBN", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "Telephone_Intl", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "Adress_Intl", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "Name_Intl", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
    {name: "Street_Intl", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt", examples: "example1, example2, example3, example4"},
 ];

 


export const rawGeneratorDescriptions = [
   {name: "IdGenerator", 
               description: "The Id Generator creates consecutives Ids from 0 (default) or any other natural number.", 
               examples: "0,1,2,3,4,...", 
               onClickFunction: "()=>handleClickOpenDummy01", uid: "idGenerator",},
   {name: "DoubleNumberGenerator", description: "The double number generator generates a series of 64 bit floating point values from a specified range. Besides the range,  the number of distinct values to be used as well as the distribution of the generated values can be provided. ", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "doubleNumberGenerator",},
   {name: "LongNumberGenerator", description: "The long number generator generates a series of 64 bit integer numbers from a specified range, whereby the range,  the distribution of values, the number of distinct values and  whether each value has to be unique, can be decided by the user.", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "longNumberGenerator",},
   {name: "DateTimeGenerator", description: "The dateTime generator generates a series of date values from a specified range, whereby the order (random or continously) and the  distance between the single elements can be determined by the user.", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "dateTimeGenerator",},
   {name: "RandomStringGenerator", description: "The random string generator generates a series of strings (combinations of letters) of a certain length range (determined by the min and max lenght attributes) using a specified set of characters.", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "randomStringGenerator",},
   {name: "RandomSentenceGenerator", description: "The random sentence generator generates a series of sentences within a defined size range (determined by the min and max lenght attributes) using a pseudo text grammar. ", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "randomSentenceGenerator",},
   {name: "DictListGenerator", description: "The dictlist generator generates a series of single values or combination of single values (eg. lists) from a dictionary. Combination of values are of a defined size and are separated by a defined separator.", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "dictListGenerator",},
   {name: "ReferenceValueGenerator", description: "The reference generator produces a series of values from the value set (rows) of the referenced table and field (following a specified distribution).", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "referenceValueGenerator",},
   {name: "IfGenerator", description: "The if generator generates a series of values depending on the outcome of one or more sub-generators. It returns the value specified in the then attribut if the if-expression is true and the value from the else-attribut otherwise.", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "ifGenerator",},
   {name: "StaticValueGenerator", description: "The static value generator produces the value specified in the static-value-attribute constantly (eg. for all rows).", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "staticValueGenerator",},
   {name: "PrePostFixGenerator", description: "The pre-post-fix generator pre- or postfixes a generated value (of another generator) with a static string.", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "prePostFixGenerator",},
   {name: "SequentialGenerator", description: "The sequential generator runs multiple generators one after another and optionally chains interim results.", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "sequentialGenerator",},
   {name: "SwitchGenerator", description: "The switch generator generates a value based on the output of a sub-generator. For that reason the user provides a mapping of  concrete outputs of the sub-generator to the output of the switch-generator and a default value.", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "switchGenerator",},
   {name: "Probability", description: "The probability generator takes in a set of outputs and their respective probabilites and generates a series of values that reflect that probability function.", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "probabilityGenerator",},
   {name: "OtherFieldValueGenerator", description: "The other field value generator produces  a copy of the value of  a specified field in the same table.", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "otherFieldValueGenerator",},
   {name: "UUIDGenerator", description: "The UUID generator generates a 128 bit universally unique identifier (UUID).", examples: "0,1,2,3,4,...", onClickFunction: "()=>handleClickOpenDummy01", uid: "uuidGenerator",},
];


export const rawGeneratorExplanations = {
   
idGenerator: 
`
You can use the id-generator to produce consecutive ids from 0 (default) or any other natural number.

By inserting 1 for the minimum, the generator will first produce the number one, than the number two, then the number three, … .

Obligatory Fields: minimum

Ids are e.g. used to give a key to the objects in a table. (E.g. invoice number, customer number) and link information from different tables together.`,
 
doubleNumberGenerator:
`You can use the double-number-generator to produce floating point numbers of practically every relevant size. 

Use the attributes minimum and maximum to define the smallest and the largest value that the generator may produce. With the attribut distinct values you can you limit how many different values will be produced. If you don't want to produce every value in the range with the same probabiliy, you can specify the underlying distribution.

Obligatory Fields: minimum, maximum.

The double-number generator can be used to generate all kinds of values like e.g. prices, bank balances,  measurements, grades … . `,

longNumberGenerator: 
`You can use the long number generator to produce natural numbers of practically every relevant size. 

Use the attributes minimum and maximum to define the smallest and the largest value that the generator may produce. With the attribut „distinct values“ you can you limit how many different values will be produced. By checking „unique“ you can make the generater produce each number only once. If you don't want to produce every value in the range with the same probabiliy, you can specify the underlying distribution.

Obligatory fields: minimum, maximum.

The longNumber generator can be used to generate a wide range of data (e.g. number of articles, hours, days worked …). Besides it can be used as  sub-generator for if- or switch-generators (randomly generating 0s and 1s for assigning  male and female objects. `
};

//to do weitere ergänzen, bzw für den Rest Platzhalter einfügen.




export const infoTexts = {
   dialogRawGeneratorSelection: "PDGF offers a wide variety of base generators for your data generation needs. Base generators are blueprints for special use cases that are easily customizable. If you need to generate ids the id-generator or the uuid-generator are at your service. For natural numbers there is the longNumber-generator and for floating point numbers the doubleNumber-generator. Dates can be easily generated with the dateTime-generator. When it comes to words you want to have a look at the randomString-generator and for sentences the randomSentence-generator helps you. With the dictList generator you can use dictionaries to generate real world data such as names, streets, cities etc. Learn more about these and many more complex generators in the descriptions below and on the dedicated generator pages.",
   dialogGeneratorSelection: "In the list below you see all the generators that are currently saved in the in the generator repository. If you created a brilliant generator that you want to use in other schemas, you can save that generator in the generator repository. The repository is hosted in the local storage of your browser. It will stay there over several sessions until you clear your browser cache. If you want to save your generators more reliably, you can save them on your computer and upload them as needed. If you click on one of the buttons below, the specific generator will be copied to your schema. If you have to make some alterations, you can do so in the edit mode (just push the symbol with the wrench).",

}







export const rawGeneratorList = [
   "Id", 
   "Double", 
   "Long", 
   "Date-Time", 
   "Random String", 
   "Random-Sentence", 
   "Random-Sentence", 
   "Reference", 
   "Sequential",
]



export const dictListObj = [
   {value: "Vornamen", label: "Vornamen"},
   {value: "Nachnamen", label: "Nachnamen"},
   {value: "Strassennamen", label: "Strassennamen"},
   {value: "Ort", label: "Ort"},
   {value: "PLZ", label: "PLZ"},
   {value: "Telefon-Nummern", label: "Telefon-Nummern"},
   {value: "IBAN", label: "IBAN"},
   {value: "Länder", label: "Länder"},
   {value: "Sozialversicherungs-Nummern", label: "Sozialversicherungs-Nummern"},
   {value: "Steuer-Nummern", label: "Steuer-Nummern"},
   {value: "Bankunternehmen", label: "Bankunternehmen"},
]


export const dictList = [
   "Vornamen",
   "Nachnamen",
   "Strassennamen",
   "Ort",
   "PLZ",
   "Telefon-Nummern",
   "IBAN",
   "Länder",
   "Sozialversicherungs-Nummern",
   "Steuer-Nummern",
   "Bankunternehmen",
]


export const localeList = [
   "en_UK",
   "en_US",
   "de_DE",
   "es_ES",
   "fr_FR",
   "ru_RU",
]

export const chooseByOptionList = [
   "random",
   "randomShuffle",
   "permutationRandom",
   "sameChoiceAs",
   "relativeRowMapping",
   "relativeUnique",
];

export const selectFromOptionList = [
   "historical",
   "atInsert",
   "fixedTimeFrame",
   "sameTimeFrame",
   "relativeTimeFrame",
];




 export const tableItemsLong = [
    {fieldName: "Name", generator: "Gen01", isKey: true},
    {fieldName: "Street", generator: "Gen", isKey: false},
    {fieldName: "Postcode", generator: "Gen", isKey: false},
    {fieldName: "Country", generator: "Gen", isKey: false},
    {fieldName: "IBAN", generator: "Gen", isKey: false},
    {fieldName: "Salary", generator: "Gen", isKey: false},
    {fieldName: "Gender", generator: "Gen", isKey: false}
   ];


   export const tableItemsShort = [
      {fieldName: "Name", generator: "Gen01", isKey: true},
      {fieldName: "Street", generator: "Gen", isKey: false},
      {fieldName: "Postcode", generator: "Gen", isKey: false},
     ];   



     export const tableDataShort = {
        tableName: "", 
        tableSize: "", 
        tableItems: [
         {fieldName: "Name", generator: "Gen01", isKey: true},
         {fieldName: "Street", generator: "Gen", isKey: false},
         {fieldName: "Postcode", generator: "Gen", isKey: false},
        ]
      };



      export const tableDataLong = {
         tableName: "TestItem", 
         tableSize: "1", 
         tableItems: [
            {fieldName: "Name", generator: "Gen01", isKey: true},
            {fieldName: "Street", generator: "Gen", isKey: false},
            {fieldName: "Postcode", generator: "Gen", isKey: false},
            {fieldName: "Country", generator: "Gen", isKey: false},
            {fieldName: "IBAN", generator: "Gen", isKey: false},
            {fieldName: "Salary", generator: "Gen", isKey: false},
            {fieldName: "Gender", generator: "Gen", isKey: false},
         ]
      };



      export const tableDataLong_1_Array = [{
         tableName: "TestItem", 
         tableSize: "1", 
         tableItems: [
            {fieldName: "Name", generator: "Gen01", isKey: true},
            {fieldName: "Street", generator: "Gen", isKey: false},
            {fieldName: "Postcode", generator: "Gen", isKey: false},
            {fieldName: "Country", generator: "Gen", isKey: false},
            {fieldName: "IBAN", generator: "Gen", isKey: false},
            {fieldName: "Salary", generator: "Gen", isKey: false},
            {fieldName: "Gender", generator: "Gen", isKey: false},
         ]
      }];


      export const tableDataLong_2_Array = [{
         tableName: "Table A", 
         tableSize: "1", 
         tableItems: [
            {fieldName: "Name", generator: "Gen01", isKey: true},
            {fieldName: "Street", generator: "Gen", isKey: false},
            {fieldName: "Postcode", generator: "Gen", isKey: false},
            {fieldName: "Country", generator: "Gen", isKey: false},
            {fieldName: "IBAN", generator: "Gen", isKey: false},
            {fieldName: "Salary", generator: "Gen", isKey: false},
            {fieldName: "Gender", generator: "Gen", isKey: false},
         ]
         },
         {
         tableName: "Table B", 
         tableSize: "22", 
         tableItems: [
            {fieldName: "Name", generator: "Gen01", isKey: true},
            {fieldName: "Street", generator: "Gen", isKey: false},
            {fieldName: "Postcode", generator: "Gen", isKey: false},
            {fieldName: "Country", generator: "Gen", isKey: false},
            {fieldName: "IBAN", generator: "Gen", isKey: false},
            {fieldName: "Salary", generator: "Gen", isKey: false},
            {fieldName: "Gender", generator: "Gen", isKey: false},
         ]
         }
      ];




      export const tableDataLong_5_Array = [{
         tableName: "Table A", 
         tableSize: "111", 
         tableItems: [
            {fieldName: "Name", generator: "Gen01", isKey: true},
            {fieldName: "Street", generator: "Gen", isKey: false},
            {fieldName: "Postcode", generator: "Gen", isKey: false},
            {fieldName: "Country", generator: "Gen", isKey: false},
            {fieldName: "IBAN", generator: "Gen", isKey: false},
            {fieldName: "Salary", generator: "Gen", isKey: false},
            {fieldName: "Gender", generator: "Gen", isKey: false},
         ]
         },
         {
         tableName: "Table B", 
         tableSize: "222", 
         tableItems: [
            {fieldName: "Name", generator: "Gen01", isKey: true},
            {fieldName: "Street", generator: "Gen", isKey: false},
            {fieldName: "Postcode", generator: "Gen", isKey: false},
            {fieldName: "Country", generator: "Gen", isKey: false},
            {fieldName: "IBAN", generator: "Gen", isKey: false},
            {fieldName: "Salary", generator: "Gen", isKey: false},
            {fieldName: "Gender", generator: "Gen", isKey: false},
         ]
         },
         {
            tableName: "Table C", 
            tableSize: "333", 
            tableItems: [
               {fieldName: "Name", generator: "Gen01", isKey: true},
               {fieldName: "Street", generator: "Gen", isKey: false},
               {fieldName: "Postcode", generator: "Gen", isKey: false},
            ]
            },
            {
            tableName: "Table D", 
            tableSize: "444", 
            tableItems: [
               
               {fieldName: "Salary", generator: "Gen", isKey: false},
               {fieldName: "Gender", generator: "Gen", isKey: false},
            ]
            },
            {
               tableName: "Table E", 
               tableSize: "555", 
               tableItems: [
                  {fieldName: "Name", generator: "Gen01", isKey: true},
                  {fieldName: "Street", generator: "Gen", isKey: false},
                  {fieldName: "Postcode", generator: "Gen", isKey: false},
                  {fieldName: "Country", generator: "Gen", isKey: false},
                  {fieldName: "IBAN", generator: "Gen", isKey: false},
                  {fieldName: "Salary", generator: "Gen", isKey: false},
                  {fieldName: "Gender", generator: "Gen", isKey: false},
               ]
               },
      ];




export const emptySchema = {
   uids: {
      schemaUid: 42,
      tableCounter: 1,
   },
   info: {
      schemaName: "",
      description: "",
      author: "",
      lastEdited: "",
   },
   tables: 
      [
         {
            tableName: "Table_1", 
            tableSize: 10, 
            tableId: 1,
            rowCounter: 1,
            tableItems: [
               {tableId: 1, rowId: 1, fieldName: "", generator: {}, isKey: false},
            ],
         }
      ],
   functions: {},
   variables: {
      defaultVariables: [
         {variableId: 1, name: "Root-Seed", value: "123456789", dataType: "long", tooltipName: "The root seed is the seed that is used to initialize the first random number generator. All the other seeds and calculations refer back to him. If you use the same root-seed you will always get the exact same data generated.", tooltipValue: "You are free to choose any value between 1 and 10.000.000."},
         {variableId: 2, name: "ScalingFactor", value: "1", dataType: "double", tooltipName: "The scaling factor is used to increase the number of data over all tables in a realistic way. For each table it is determined to which amount its will partizipate with the scaling. E.g. some tables will keep the same size while others will grow in same amount or even faster." , tooltipValue: "You are free to choose any value larger than 0."},
      ],
      customVariables:
         {variableCounter: 1,
         variableItems: [
            {variableId: 1, 
            name: "", 
            value: "", 
            dataType: ""},
         ],
      },
   }
}



export const specificGeneratorAttributes = {
   dateTimeGenerator: {fieldType: "DATE", startDate: "", endDate: "", disableRng: false, fixedStepSize: false},
   dictListGenerator: {fieldType: "VARCHAR", dictionary: "", size: 1, separator: "", disableRng: false, distribution: "", uniqueEntries: false},
   doubleNumberGenerator: {fieldType: "DOUBLE", minD: "", maxD: "", decimalPlaces: "", locale: "en-US", distinctValues: "", distribution: ""},
   idGenerator: {fieldType: "NUMERIC",minimum: 0},
   ifGenerator: {fieldType: "",generators: [], if: "", then: "", else: ""},
   longNumberGenerator: {fieldType: "NUMERIC",minimum: "", maximum: "", numberOfDistinctCharacters:"", distribution: ""},
   otherFieldValueGenerator: {fieldType: "", referenceField: ""},
   prePostFixGenerator: {fieldType: "", preFix: "", postFix: "", generator: {}},
   probabilityGenerator: {fieldType: "", disableShuffling: false, probabilityValueSets: []},
   randomSentenceGenerator: {fieldType: "VARCHAR", minimumNumberOfCharacters: "", maximumNumberOfCharacters: "",  numberOfDistinctCharacters: "", unique: "", distribution: {}},
   randomStringGenerator: {fieldType: "VARCHAR", minimumNumberOfCharacters: "", maximumNumberOfCharacters: "", charachters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W","X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]},
   referenceValueGenerator: {fieldType: "", referenceTable: "", referenceField: "", chooseBy: "", selectFrom: ""},
   sequentialGenerator: {fieldType: "VARCHAR", concatenateResults: false, delimiter: "", delimitEmptyValues: true, generators: {}}, 
   staticValueGenerator: {fieldType: "", staticValue: ""},
   switchGenerator: {fieldType: "", generator: {}, caseSwitchSets: [], default: ""},
   uuidGenerator: {fieldType: "VARCHAR", },
}


/*
distributionVariables: {
   type: "uniformDistribution",
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
   },



   distributionVariables: {type: "uniformDistribution", normalDistribution: {standardDeviation: "", mean: "",},binomialDistribution: {n: "",p: "",}, exponentialDistribution: {lambda: "",},logarithmicDistribution: {p: ""}, },



*/





export const commonGeneratorAttributes = {
   
      nullValues: {
         withNullValues: false,
         percentNullValues: 0,
      },
      paddingVariables: {
            withPadding: false,
            numberCharacters: "",
            fillCharacter: "",
            fromLeft: true,
      },
      repoVariables: {
            saveInRepo: false,
            name: "",
            description: "",
            examples: "",
            uid: "",
            generatorType: "",
            isRawGenerator: false,
      },
}







export const emptyGenerator = {
   isRawGenerator: false,
   uid: "",
   uniqueEntries: false,
   generatorType: "", 
   dataType: "",
   characterSet: "",
   minimum: "",
   maximum: "",
   dictionary: "",
   size: "",
   separator: "",
   decimalPlaces: "",
   locale: "",
   fixedStepSize: "",
   hasAllDistinctValues: false,
   startDate: "",
   endDate: "",
   disableRng: false,
   numberOfCharacters: "",
   numberOfDistinctCharacters: "",
   generatorList: [{name: null, uid: null}],
   if: "",
   else: "",
   then: "",
   referenceTable: 1,
   referenceField: "",
   preFix: "",
   postFix: "",
   probabilityList: [],
   disableShuffling: "",
   concatenateResults: false,
   delimiter: "",
   delimitEmptyValues: true,
   subGenerator: "",
   subGeneratorObject: {},
   valueProbabilitySets: [{id: 0, value: "another Value", probability: "another Probability",}],
   caseOutcomeSets: [{id: 0, caseValue: "", outcomeGeneratorObject: "", generatorType: "staticValueGenerator", staticValue: ""}],
   staticValue: "",
   default: {generatorType: "staticValueGenerator", staticValue: ""},
   //ggf id zur Refernzierung von Feldern.

   distributionVariables: {
         type: "uniformDistribution",
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
   },
   nullValues: {
      withNullValues: false,
      percentNullValues: 0,
   },
   paddingVariables: {
         withPadding: false,
         numberCharacters: "",
         fillCharacter: "",
         fromLeft: true,
   },
   repoVariables: {
         saveInRepo: false,
         name: "",
         description: "",
         examples: "",
   },
}; 





/*


dateTimeGenerator : {
   startDate: "",
   endDate: "",
   disableRng: false,
   useFixedStepSize: false,

   outputFormat:  "yyyy-MM-dd H:mm:ss",
   inputFormat: "yyyy-MM-dd H:mm:ss",
}


dictListGenerator: {
   dictionary: "",
   size: 0,
   separator: "",
   unique: false,
   disableRng: false,
   distribution: {uniformDistribution},
   
}

doubleNumberGenerator: {
   minD: "",
   maxD: "",
   decimalPlaces: -1,
   locale: "en-US",
   distinct: 0,
   distribution: {uniformDistribution},

   format:
}

idGenerator: {
   minimum: 0,

}

ifGenerator: {
   generators: {},
   _if: "",
   _then: "",
   _else: "", 
     

}

longNumberGenerator: {
   max: "",
   min: "",
   unique: false,
   distinct: 0,
   distribution: {uniformDistribution},
}


otherFieldValueGenerator: {
   reference: "",
}

prePostFixGenerator: {
   preFix:
   postFix:
   generator: 
}


probabilityGenerator: {
   disableRng: false,
   valueProbabilitySets: {},

}


randomSentenceGenerator: {
   min: "",
   max: "",
   unique: false,
   distinct: 0,
   distribution: {uniformDistribution},

}

randomStringGenerator: {
   min: "",
   max: "",
   characters:  [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
}


referenceValueGenerator: {
   referenceField: "",
   referenceTable: "",
   choose: "",
   from: "",

}


switchGenerator: {
   generator: {},
   _case: {},
   default: {}
}



UUID Generator: {

}







}



inputFormatArray = [ ""]



*/