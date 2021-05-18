import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useSWR from "swr";

import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://events-5d54c-default-rtdb.firebaseio.com/events.json",
  );

  const [events, setEvents] = useState();
  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setEvents(events);
    }
  }, [data]);

  if (!events) return <p className='center'>Loading..</p>;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 0 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Layout title='No Events'>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Layout>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    if (numMonth == 0) return eventDate.getFullYear() === numYear;
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Layout title='No events'>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Layout>
    );
  }
  const date = new Date(numYear, numMonth - 1);
  let humanReadableDate;

  if (numMonth != 0)
    humanReadableDate = new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  else {
    humanReadableDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
    });
    humanReadableDate = +humanReadableDate + 1;
  }

  const title = "Events in " + humanReadableDate;

  return (
    <Layout title={title}>
      <ResultsTitle humanReadableDate={humanReadableDate} />
      <EventList items={filteredEvents} />
    </Layout>
  );
}

export default FilteredEventsPage;
