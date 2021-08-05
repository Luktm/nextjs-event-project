import React from 'react';
import Image from 'next/image';

import classes from './EventItem.module.css';
import Button from '../UI/Button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

export default function EventItem({ title, image, date, location, id }) {

    // transfer to human readable date.
    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        // configure make it more beautiful.
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    /**
     * replace 'New Wall Street 5, 98765 New Work' =>  'New Wall Street 5\n98765 New Work'
     * replace it to line break
     */
    const formateedAddress = location.replace(', ', '\n');

    // file path in pages/events/[eventid], and then use useRouter hook to retrive id
    const exploreLink = `/events/${id}`;

    return (
        <li className={classes.item}>
            {/* dont need to put public, next js auto search public foleder */}
            <Image src={'/' + image} alt={title} width={250} height={160} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formateedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={classes.icon}>
                            <ArrowRightIcon />
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    );
}
