import Layout from "../components/layout";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage({ featuredEvents }) {
  return (
    <Layout title='Events Powered by NextJS'>
      <EventList items={featuredEvents} />
    </Layout>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return { props: { featuredEvents }, revalidate: 1800 };
}

export default HomePage;
