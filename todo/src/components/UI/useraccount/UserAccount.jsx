import React, { Component, useState } from 'react'
import classes from './UserAccount.module.css'
import person from '../../../images/svg/person/person.png'
import MyImg from '../myImg/MyImg';
import UserModal from '../UserModal/UserModal';
import { useNavigate } from 'react-router-dom';

const UserAccount = ({ness, appearance, user, onLogoutlocal, mail})=>{

    const [modalFlag, setModalFlag] = useState(0);
    const navigate = useNavigate();

    const modalRule = (e, num) =>{
        e.preventDefault();
        e.stopPropagation();
        if(user == null){
            navigate('/login');
        }
        else{
            setModalFlag(num);
        }
    }




        
    return(
        <div className={classes.user} onClick={e => {modalRule(e, 1)}}>
            <div className={classes.userImg}>
                <MyImg
                    img = {person}
                    width={ness.standartImgWidth}
                    height={ness.standartImgWidth}
                    alt={'Person'}
                />
            </div>
            <a href='' className={appearance =='black' ? classes.user__name : classes.user__name_white}>
                {user == null ? 'Войти' : user}
            </a>

            {modalFlag == 1 ? <UserModal useradr = {mail} ness = {ness} user = {user} onLogout = {onLogoutlocal} closeModal ={modalRule}/> : ''}
        </div>
    );
}

export default UserAccount;