import React from "react";
import FormIdGeneratorExtraAttributes from "./FormIdGenerator";
import FormGeneratorDetailsRepoElement_deprecated from "./FormGeneratorDetailsRepoElement_deprecated";
import FormNullValuesElement from "./FormNullValuesElement";
import PaddingDropDownElement from "./PaddingDropDownElement";



export default function FormAggregationTest01(){
    return (
        <div>
            <FormIdGeneratorExtraAttributes/>
            <FormNullValuesElement/>
            <FormGeneratorDetailsRepoElement_deprecated/>
            <PaddingDropDownElement/>
        </div>
    )
}