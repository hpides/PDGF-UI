import React from "react";
import FormIdGeneratorExtraAttributes from "./FormIdGenerator";
import FormGeneratorDetailsRepoElement from "./FormGeneratorDetailsRepoElement";
import FormNullValuesElement from "./FormNullValuesElement";
import PaddingDropDownElement from "./PaddingDropDownElement";



export default function FormAggregationTest01(){
    return (
        <div>
            <FormIdGeneratorExtraAttributes/>
            <FormNullValuesElement/>
            <FormGeneratorDetailsRepoElement/>
            <PaddingDropDownElement/>
        </div>
    )
}