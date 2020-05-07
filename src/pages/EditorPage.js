import React from "react";
import Header from "../Header";
import SubHeader from "../SubHeader";
import Footer from "../Footer";
import BodyEditor from "../BodyEditor";


export default function EditorPage(props){
    return(
        <div styles={{height: "120vh", width: "100vw", background: "white", padding: "5px" }}>
        <Header/>
        <BodyEditor data={props.data}/>
        <Footer/>
        <div>Here is where the footer should be ending!</div>
        </div>
    )
}