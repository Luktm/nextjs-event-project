import React, { Fragment } from 'react'
import Head from 'next/head';

// import { useRouter } from 'next/router';
import eventRepository from '../../repository/event-repository';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Comments from '../../components/input/comments';


// [eventId].js better has Detail name include
export default function EventDetailPage(props) {
    // const router = useRouter();

    // // retrive path segment /event/[eventId];
    // router.query.eventId is for client side
    // const eventId = router.query.eventId;

    // const event = getEventById(eventId);

    const event = props.selectedEvent;

    // handle wrong url path
    if (!event) {
        return (
            <div className="center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta
                    name="description"
                    content={event.description}
                />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
                <Comments eventId={event.id} />
            </EventContent>
        </Fragment>
    );
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId;

    const event = await eventRepository.getEventById(eventId);

    return {
        props: {
            selectedEvent: event,
        },
        revalidate: 30,
    };

}

export async function getStaticPaths() {

    const events = await eventRepository.getFeaturedEvents();

    const paths = events.map((event) => ({ params: { eventId: event.id } }));

    return {
        paths: paths,
        // if we try to load the page with unknown, it return 404 
        fallback: 'blocking',
    };
}