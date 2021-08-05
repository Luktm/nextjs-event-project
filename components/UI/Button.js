import Link from 'next/link'
import React from 'react'

import classes from './Button.module.css';

export default function Button(props) {

    if(props.link) {
        return (
            <Link href={props.link}>
                {/* provide a tag, else link will render a under the hood */}
                <a className={classes.btn}>{props.children}</a>
            </Link>
        );
    }
    
    return (
        <button 
            className={classes.btn} 
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
    
}
