import React, { Component } from 'react'
import classes from './MyImg.module.css'

const MyImg = ({img, width = '25px', height = '25px', alt = 'nothing'})=>{
 return(
    <img src={img} alt ={alt} className={classes.myImg}/>
 );
}

export default MyImg;
