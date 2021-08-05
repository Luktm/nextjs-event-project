import React, { Fragment, useContext } from 'react';
import MainHeader from './MainHeader';
import Notification from '../../components/UI/Notification';
import NotificationContext from '../../store/notification-context';

export default function Layout(props) {
    const notificationCtx = useContext(NotificationContext);
    
    // see it at predefined Notficationcontext in store/notification-context.js
    const activeNotfication = notificationCtx.notification;
    
    return (
        <Fragment>
            <MainHeader />
            <main>
                {props.children}
            </main>

            {activeNotfication && <Notification 
                title={activeNotfication.title} 
                message={activeNotfication.message} 
                status={activeNotfication.status} 
            />}
        </Fragment>
    );
}
