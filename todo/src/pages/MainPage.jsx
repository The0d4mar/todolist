import React from "react";
import classes from './MainPage.module.css'

const MainPage = () =>{
    return(
        <div className={classes.mainpage}>
            <div className={classes.mainpage__cont}>
                <div className={classes.mainpage__title}>
                    Главная страница
                </div>
                <div className={classes.mainpage__desc}>
                    Добро пожаловать на главную страницу моего ToDoList, который я сделал в качестве первого pet-project. Я постарался реализовать здесь все функции, которые по моему мнению удобны. Приятного использования
                </div>
            </div>
        </div>
    );
}

export default MainPage;