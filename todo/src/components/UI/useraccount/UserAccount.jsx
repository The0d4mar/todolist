import React, { Component, useState } from 'react'
import classes from './UserAccount.module.css'
import person from '../../../images/svg/person/person.png'
import MyImg from '../myImg/MyImg';
import MyButton from '../myBtn/MyButton';
import UserModal from '../UserModal/UserModal';

const UserAccount = ({ness, appearance})=>{

    const accountModal = [];
    let modalFlag = 0;
    function Modal(modalFlag){
        if(modalFlag){
            accountModal.push(<UserModal ness/>)
            modalFlag = 1;
        }
        else{
            accountModal.pop(<UserModal ness/>)
            modalFlag = 0
        }
        
    }
    return(
        <div className={classes.user} onClick={Modal(modalFlag)}>
            <div className={classes.userImg}>
                <MyImg
                    img = {person}
                    width={ness.standartImgWidth}
                    height={ness.standartImgWidth}
                    alt={'Person'}
                />
            </div>
            <div className={appearance =='black' ? classes.user__name : classes.user__name_white}>
                Владимир
            </div>

            {accountModal[0]}
        </div>
    );
}

export default UserAccount;