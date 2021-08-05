import React from 'react'
import Head from 'next/head';

import eventRepository from '../repository/event-repository';
import EvenList from '../components/Events/EventList';
import NewsletterRegistration from '../components/input/newsletter-registration';

export default function HomePage(props) {

    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta 
                    name="description" 
                    content="Find a lot of great events that allow you to evolve..."
                />
            </Head>
            <NewsletterRegistration/>
            <EvenList items={props.events} />
        </div>
    );
}

export async function getStaticProps(context) {

    const featuredEvents = await eventRepository.getFeaturedEvents();

    return {
        props: {
            events: featuredEvents,
        },
        revalidate: 1800
    }
}