import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import BodyEditor from "../BodyEditor";


export default function EditorPage(props){
    return(
        <div styles={{height: "120vh", width: "100vw", background: "white", padding: "5px" }}>
        <Header/>
        <BodyEditor currentSchema = {props.currentSchema} data={props.data}/>
        <Footer/>
        </div>
    )
}