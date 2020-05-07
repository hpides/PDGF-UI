import React from "react";




export default function PropsTest(props){
    return(
        <>
        <div> This is the heading! </div>
        <div> And this is the sub-heading</div>
        <div>... and here are all the children </div>
        {props.children}
        </> 
    )
}