import { useState } from "react";

export default function Square({value , onhandleclick}){
    
    return(
        <button className="Square" onClick={onhandleclick}>{value}</button>
    )
}