import { Fragment } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage({ events }) {
  const router = useRouter();
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Layout title='Events powered by NextJS'>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Layout>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return { props: { events }, revalidate: 60 };
}

export default AllEventsPage;
