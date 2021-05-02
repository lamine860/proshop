import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader  from "react-loader-spinner";

/* eslint-disable */
export default function (){
    return (  
        <Loader
        className="text-center"
        type="TailSpin"
        color="#00BFFF"
        height={80}
        width={80}
      />
    )
}
 