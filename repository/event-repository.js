class EventRepository {

    async getAllEvents() {
        const response = await fetch('https://nextjs-course-52841-default-rtdb.asia-southeast1.firebasedatabase.app/events.json');
        const data = await response.json();

        const events = [];

        for (const key in data) {
            events.push({
                id: key,
                ...data[key],
            });
        }

        return events;
    }

    async getFeaturedEvents() {
        const allEvents = await this.getAllEvents();
        return allEvents.filter(event => event.isFeatured);
    }

    async getEventById(id) {
        const allEvents = await this.getAllEvents();
        return allEvents.find((event) => event.id === id);
    }

    async getFilteredEvents(dateFilter) {
        const { year, month } = dateFilter;

        const allEvents = await this.getAllEvents();

        let filteredEvents = allEvents.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
        });

        return filteredEvents;
    }

}

export default new EventRepository();