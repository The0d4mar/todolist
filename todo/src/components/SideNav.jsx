import React, { useState } from 'react';
import sideNavClose from '../images/svg/ArrowImg/arrow-left.svg';
import newNoteImg from '../images/svg/addNote/sidenav__newNote.svg';
import UserAccount from './UI/useraccount/UserAccount';
import MyButton from './UI/myBtn/MyButton';
import MyImg from './UI/myImg/MyImg';

import classes from './SideNav.module.css';
import SideNavigation from './SideNavigation';

const SideNav = ({standartImgWidth, Appearance, addToDo, useracc}) => {
    const [status, setStatus] = useState(0);
    const [sidebarWidth, setSidebarWidth] = useState(284); // Начальная ширина бокового меню
    const [isResizing, setIsResizing] = useState(false);

    // Начинаем процесс изменения ширины
    const handleMouseDown = () => {
        setIsResizing(true);
    };

    // Обрабатываем изменение ширины при перемещении мыши
    const handleMouseMove = (e) => {
        if (isResizing) {
            const newWidth = e.clientX; // Получаем текущую позицию мыши по оси X
            if (newWidth >= 237 && newWidth <= 500) { // Ограничиваем минимальную и максимальную ширину
                setSidebarWidth(newWidth);
            }
        }
    };

    // Завершаем процесс изменения ширины
    const handleMouseUp = () => {
        setIsResizing(false);
    };

    // Добавляем глобальный слушатель мыши при изменении размера
    React.useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    return (
        <div className={classes.sidenav} style={{ width: `${sidebarWidth}px` }}>
            <div className={Appearance === "black" ? classes.sidenav__cont : classes.sidenav__cont_white} style={{ width: `${sidebarWidth - 5}px` }}>
                <div className={classes.sidenav__mainPart}>
                    <div className={classes.sidenav__header}>
                        <UserAccount
                            ness={standartImgWidth}
                            appearance={Appearance}
                            user = {useracc}
                            />
                        <div className={classes.sidenav__headerBtn}>
                            <MyButton
                                add=''
                                mainStyle={Appearance}
                                
                            >
                                <MyImg
                                    img={sideNavClose}
                                    width={standartImgWidth}
                                    height={standartImgWidth}
                                    alt={'Close SideNav'}
                                />
                            </MyButton>
                            <MyButton
                                add=''
                                mainStyle={Appearance}
                            >
                                <MyImg
                                    img={newNoteImg}
                                    width={standartImgWidth}
                                    height={standartImgWidth}
                                    alt={'Create new note'}
                                    mainStyle={Appearance}
                                />
                            </MyButton>
                        </div>
                    </div>
                    <SideNavigation
                        standartImgWidth={standartImgWidth}
                        Appearance={Appearance}
                        addToDo={addToDo}
                    />
                </div>
                {/* Добавляем линию-разделитель для изменения ширины */}
                <div className={classes.verticalLine} onMouseDown={handleMouseDown}></div>
            </div>
        </div>
    );
}

export default SideNav;
