import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';
import useSWR from 'swr';

import EventList from '../../components/Events/EventList';
import ResultsTitle from '../../components/Events/ResultsTitle';
import Button from '../../components/UI/Button';
import ErrorAlert from '../../components/UI/ErrorAlert';

// normally [...id].js is for filter purose
export default function FilterEventsPage(props) {

    const [loadedEvents, setLoadedEvents] = useState();

    const router = useRouter();
    const filterData = router.query.slug;

    const { data, error } = useSWR('https://nextjs-course-52841-default-rtdb.asia-southeast1.firebasedatabase.app/events.json');

    useEffect(() => {
        const events = [];

        for (const key in data) {
            events.push({
                id: key,
                ...data[key],
            });
        }

        setLoadedEvents(events);

    }, [data]);

    let pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta
                name="description"
                content={`A list of filtered events.`}
            />
        </Head>
    );

    if (!data) {
        // center class is global css
        return (
            <Fragment>
                {pageHeadData}
                <p className="center">Loading...</p>
            </Fragment>
        );
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = Number.parseInt(filteredYear);
    const numMonth = Number.parseInt(filteredMonth);

    pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta
                name="description"
                content={`All events for ${numMonth}/${numYear}`}
            />
        </Head>
    );

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className="centered">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    let filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });


    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeadData}
                <p>No events found for the chosen filter!</p>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    // month deduct 1 bcuz month start with 1
    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>

            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}

// export async function getServerSideProps(context) {
//     // get path params
//     const { params } = context;

//     // from file name
//     const filterData = params.slug;

//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];

//     const numYear = Number.parseInt(filteredYear);
//     const numMonth = Number.parseInt(filteredMonth);

//     if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//         return {
//             props: {
//                 hasError: true,
//             },
//             // notFound: true,
//             // redirect: {
//             //     destination: '/error',
//             // }
//         }
//     }


//     const filteredEvents = await eventRepository.getFilteredEvents({
//         year: numYear,
//         month: numMonth,
//     });

//     return {
//         props: {
//             filteredEvents: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         },
//     };
// }