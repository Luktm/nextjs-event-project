import React from 'react';
import Link from 'next/link';

import classes from './MainHeader.module.css';

export default function MainHeader() {
    return (
        <header className={classes.header}>
            {/* logo */}
            <div className={classes.logo}>
                <Link href="/">NextEvents</Link>
            </div>
            <nav className={classes.navigation}>
                <ul>
                    <li>
                        <Link href="/events">Browse All Events</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
