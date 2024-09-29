import React, { Component, useState } from 'react'
import classes from './UserModal.module.css'
import person from '../../../images/svg/person/person.png'
import MyImg from '../myImg/MyImg';
import MyButton from '../myBtn/MyButton';
const UserModal = (ness) =>{
    return(
        <div className={classes.accountModal}>
                <div className={classes.accountModal__cont}>
                    <div className={classes.accountModal__email}>
                        vladgorn19@gmail.com
                    </div>
                    <div className={classes.accountModal__nameBlock}>
                        <div className={classes.accountModal__photo}>
                        <MyImg
                            img = {person}
                            width={ness.standartImgWidth}
                            height={ness.standartImgWidth}
                            alt={'Person'}
                        />
                        </div>
                        <div className={classes.accountModal__info}>
                            <div className={classes.accountModal__name}>
                                Владимир
                            </div>
                            <div className={classes.accountModal__plan}>
                                Free plan
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className={classes.accountModal__cont}>
                    <div className={classes.accountModal__btnBlock}>
                        <button className={classes.accountModal__btn}>
                            <span className={classes.accountModal__btnText}>Log out</span>
                        </button>
                    </div>
                </div>

            </div>
    );
}

export default UserModal;