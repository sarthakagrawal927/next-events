import { Fragment } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../helpers/api-util";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Comments from "../../components/input/comments";

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <Layout title='loading..'>
        {" "}
        <div className='center'>
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={event.title}>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments />
    </Layout>
  );
}

export async function getStaticPaths(context) {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
    revalidate: 60,
  };
}

export default EventDetailPage;
