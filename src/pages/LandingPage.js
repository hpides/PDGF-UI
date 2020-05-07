import React from "react";
import Header from "../Header";
import SubHeader from "../SubHeader";
import Footer from "../Footer";
import BodyLP from "../BodyLp";




export default function LandingPage(){
    
    
    
    return(
        <div styles={{height: "100vh", width: "100vw", background: "white", padding: "5px" }}>
        <Header/>
        <SubHeader/>
        <BodyLP/>
        <Footer/>
        </div>
    )
}