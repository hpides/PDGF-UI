import React from "react";
import Header from "../Header";
import SubHeader from "../SubHeader";
import Footer from "../Footer";
import BodyEditor from "../BodyEditor";


export default function EditorPage(){
    return(
        <div styles={{height: "100vh", width: "100vw", background: "white", padding: "5px" }}>
        <Header/>
        <BodyEditor/>
        <Footer/>
        </div>
    )
}