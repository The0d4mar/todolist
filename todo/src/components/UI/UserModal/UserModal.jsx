import React, { Component, useState } from 'react'
import classes from './UserModal.module.css'
const UserModal = ({useradr, ness, user, onLogout, closeModal}) =>{

    function handleLogout(e){
        e.preventDefault();
        onLogout();
    }

    function closeBtn(e){
        closeModal(e, 0);
    }

    return(
        <div className={classes.accountModal}>
                <div className={classes.accountModal__cont}>
                    <div className={classes.accountModal__email}>
                        {useradr? useradr : 'не найден'}
                    </div>
                    <div className={classes.accountModal__nameBlock}>
                        <div className={classes.accountModal__info}>
                            <div className={classes.accountModal__name}>
                                {user}
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
                        <button className={classes.accountModal__btn} onClick={ e=> {handleLogout(e)}}>
                            <span className={classes.accountModal__btnText}>Log out</span>
                        </button>

                        <button className={classes.accountModal__btn} onClick={ e=> {closeBtn(e)}}>
                            <span className={classes.accountModal__btnText}>Close</span>
                        </button>
                    </div>
                </div>

        </div>
    );
}

export default UserModal;