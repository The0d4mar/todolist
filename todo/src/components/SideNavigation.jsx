import React from 'react'
import MyButton from './UI/myBtn/MyButton'
import MyImg from './UI/myImg/MyImg'
import homeIcon from '../images/svg/sidenav_navig/home_n78899yzxc0v.svg'
import todoIcon from '../images/svg/sidenav_navig/list_9dz8e9dwd7n1.svg'
import notesIcon from '../images/svg/sidenav_navig/notes_fsol639dsv10.svg'
import filterIcon from '../images/svg/sidenav_navig/filter_qw3op9gs6awt.svg'
import settingIcon from '../images/svg/sidenav_navig/setting_fbx632naln18.svg'
import styles from './SideNavigation.module.css'

const SideNavigation = ({standartImgWidth, Appearance, addToDo}) =>{
    return(
        <div className={styles.sidenav__navigation}>
            <MyButton
            children={<MyImg img = {homeIcon} width={standartImgWidth} height={standartImgWidth} alt = {'Main page'}/>}
            add = 'Home'
            link = '/homePage'
            mainStyle = {Appearance}
            />
             <MyButton
            children={<MyImg img = {todoIcon} width={standartImgWidth} height={standartImgWidth} alt = {'Main page'}/>}
            add = 'ToDo List'
            mainStyle = {Appearance}
            link = '/todoList'
            />
             <MyButton
            children={<MyImg img = {notesIcon} width={standartImgWidth} height={standartImgWidth} alt = {'Main page'}/>}
            add = 'My notes'
            mainStyle = {Appearance}
            link = '/notes'
            />
            <MyButton
            children={<MyImg img = {filterIcon} width={standartImgWidth} height={standartImgWidth} alt = {'Main page'}/>}
            add = 'Filters'
            mainStyle = {Appearance}
            />
            <MyButton
            children={<MyImg img = {settingIcon} width={standartImgWidth} height={standartImgWidth} alt = {'Main page'}/>}
            add = 'Settings'
            mainStyle = {Appearance}
            />
        </div>
    );
}

export default SideNavigation;