import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import EventList from '../../components/Events/EventList';
import EventsSearch from '../../components/Events/EventsSearch';
import eventRepository from '../../repository/event-repository';

export default function AllEventsPage(props) {

    const { events } = props;

    const router = useRouter();
    // const events = getAllEvents();

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    }

    return (
        <Fragment>
            <Head>
                <title>All Events</title>
                <meta
                    name="description"
                    content="Find a lot of great events that allow you to evolve..."
                />
            </Head>

            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    );
}

export async function getStaticProps(context) {

    const events = await eventRepository.getAllEvents();

    return {
        props: {
            events: events
        },
        revalidate: 60
    };

}