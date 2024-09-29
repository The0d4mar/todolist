import React from 'react'
import classes from './MyButton.module.css'
const MyButton = ({children, add, mainStyle,link = '',  ...props})=>{

    const Mymargin = `${0}px ${0}px ${0}px ${0}px`

    return(

        <button className={mainStyle == 'white' ? classes.myBtn : classes.myBtnBlack} style = {{margin:{Mymargin}}} {...props}>
            {children}
            {add != '' ?
                <div className={classes.myBtn__text}>
                    {link !== '' ? <a href={link} className={classes.myBtn__link}>{add}</a> : add}
                </div>
                : 
                add = ''
            }
        </button>
    );
}

export default MyButton;
